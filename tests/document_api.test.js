const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/config/app')

const Document = require('../src/models/document.model')

const api = supertest(app)

const initialDocs = [
    {
        title: 'First Doc',
    },
    {
        title: 'Second Doc',
    },
]

beforeEach(async () => {
    await Document.deleteMany({})
    let docObject = new Document(initialDocs[0])
    await docObject.save()
    docObject = new Document(initialDocs[1])
    await docObject.save()
})

test('docs are returned as json', async () => {
    await api
        .get('/api/document')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two docss', async () => {
    const response = await api.get('/api/document')

    expect(response.body).toHaveLength(initialDocs.length)
})

test('the first doc says first', async () => {
    const response = await api.get('/api/document')
    expect(response.body[0].title).toBe('First Doc')
})

test('a specific doc is within the returned docs', async () => {
    const response = await api.get('/api/document')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
        'Second Doc'
    )
})



afterAll(() => {
    mongoose.connection.close()
})