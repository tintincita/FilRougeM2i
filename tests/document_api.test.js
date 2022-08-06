const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/config/app')

const Document = require('../src/models/document.model')
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

afterAll(() => {
    mongoose.connection.close()
})