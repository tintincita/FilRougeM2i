const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/config/app')

const Document = require('../src/models/document.model')
const Card = require('../src/models/card.model')

const helper = require('./test_helper')

const api = supertest(app)



beforeEach(async () => {
    await Document.deleteMany({})

    let docObject = new Document()
    for (let i = 0; i < helper.initialDocs.length; i++) {
        docObject = new Document(helper.initialDocs[i])
        await docObject.save()
    }
})

test('docs are returned as json', async () => {
    await api
        .get('/api/document')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all docs are loaded', async () => {
    const response = await api.get('/api/document')

    expect(response.body).toHaveLength(helper.initialDocs.length)
})

test('a specific doc can be viewed', async () => {
    const docsAtStart = await helper.docsInDb()

    const docToView = docsAtStart[0]

    const resultDoc = await api
        .get(`/api/document/${docToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const processedDocToView = JSON.parse(JSON.stringify(docToView))

    expect(resultDoc.body).toEqual(processedDocToView)
})

test('a doc can be deleted', async () => {
    const docsAtStart = await helper.docsInDb()
    const docToDelete = docsAtStart[0]

    await api
        .delete(`/api/document/${docToDelete.id}`)
        .expect(204)

    const docsAtEnd = await helper.docsInDb()

    expect(docsAtEnd).toHaveLength(
        helper.initialDocs.length - 1
    )

    const titles = docsAtEnd.map(r => r.title)

    expect(titles).not.toContain(docToDelete.title)
})

test('a valid doc can be added', async () => {

    const newDoc = {
        title: 'new doc added through POST',
    }

    await api
        .post('/api/document')
        .send(newDoc)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/document')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialDocs.length + 1)
    expect(titles).toContain(
        'new doc added through POST'
    )
})


test('a doc title can be updated', async () => {
    const docsAtStart = await helper.docsInDb()

    const docToChange = docsAtStart[0]

    const changesToDoc = {
        title: "title is changed through POST",
    }

    await api
        .put(`/api/document/${docToChange.id}`)
        .send(changesToDoc)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/document')
    const titles = response.body.map(r => r.title)

    expect(titles).toContain(
        'title is changed through POST'
    )
})

describe('cards can be moved within doc', () => {

    beforeEach(async () => {
        await Card.deleteMany({})

        const docsAtStart = await helper.docsInDb()
        const docToChange = docsAtStart[0]
        const cardArray = []

        let cardObject = new Card()
        for (let i = 0; i < helper.initialCards.length; i++) {
            cardObject = new Card(helper.initialCards[i])
            cardObject.document = docToChange.id
            cardArray.push(cardObject.id)
            await cardObject.save()
        }
        docToChange.editorCards = cardArray
        docToChange.outlinerCards = cardArray

        await api
            .put(`/api/document/${docToChange.id}`)
            .send(docToChange)
    })

    test('change order in outlinerCards', async () => {
        const docsAtStart = await helper.docsInDb()
        const docToChange = docsAtStart[0]
        const originalArray = docToChange.outlinerCards;
        const newArray = [originalArray[1], originalArray[2], originalArray[0]]
        docToChange.outlinerCards = newArray

        await api
            .put(`/api/document/${docToChange.id}`)
            .send(docToChange)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const docsAtEnd = await helper.docsInDb()

        expect(docsAtStart.length).toBe(docsAtEnd.length)
        expect(docsAtEnd[0].outlinerCards).toStrictEqual(newArray)
    })

    test('change order in editorCards', async () => {
        const docsAtStart = await helper.docsInDb()
        const docToChange = docsAtStart[0]
        const originalArray = docToChange.editorCards;
        const newArray = [originalArray[1], originalArray[2], originalArray[0]]
        docToChange.editorCards = newArray

        await api
            .put(`/api/document/${docToChange.id}`)
            .send(docToChange)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const docsAtEnd = await helper.docsInDb()

        expect(docsAtStart.length).toBe(docsAtEnd.length)
        expect(docsAtEnd[0].editorCards).toStrictEqual(newArray)
    })

    // test('nest/group', async () => {
    //     const docsAtStart = await helper.docsInDb()
    //     const docToChange = docsAtStart[0]
    //     const originalArray = docToChange.cards;
    //     const newArray = [originalArray[1], originalArray[2], originalArray[0]]
    //     docToChange.cards = newArray

    //     await api
    //         .put(`/api/document/${docToChange.id}`)
    //         .send(docToChange)
    //         .expect(200)
    //         .expect('Content-Type', /application\/json/)

    //     const docsAtEnd = await helper.docsInDb()

    //     expect(docsAtStart.length).toBe(docsAtEnd.length)
    //     expect(docsAtEnd[0].cards).toStrictEqual(newArray)
    // })
})


afterAll( async() => {
    await Card.deleteMany({});
    await Document.deleteMany({});
    mongoose.connection.close()
})