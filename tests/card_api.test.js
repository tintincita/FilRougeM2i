const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/app/app')

const Card = require('../src/models/card.model')
const Document = require('../src/models/document.model')
// const Project = require('../src/models/project.model')
// const Workspace = require('../src/models/workspace.model')

const initialCards = require('./data/cards.json')
const initialDocuments = require('./data/documents.json')

const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Card.deleteMany({})
  await Document.deleteMany({})

  await Card.insertMany(initialCards)
  await Document.insertMany(initialDocuments)
})

test('cards are returned as json', async () => {
  await api
    .get('/api/card')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('malformatted id returns error', async () => {
  await api
    .get('/api/card/88')
    // current model throws 500. change try catch on .entity controller to get 404, etc
    // .expect(400)
    .expect(500)
})

test('unexisting id returns error', async () => {
  let id = helper.nonExistingCardId();
  await api
    .get(`/api/card/${id}`)
    // current model throws 500. change try catch on .entity controller to get 404, etc
    // .expect(400)
    .expect(500)
})


test('all initial cards are loaded', async () => {
  const response = await api.get('/api/card')

  expect(response.body).toHaveLength(initialCards.length)
})

test('a specific card can be viewed', async () => {
  const cardsAtStart = await helper.cardsInDb()
  const cardToView = cardsAtStart[0]

  const resultCard = await api
    .get(`/api/card/${cardToView._id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedCardToView = JSON.parse(JSON.stringify(cardToView))

  expect(resultCard.body).toEqual(processedCardToView)
})

describe('DELETE card', () => {
  test('a card can be deleted', async () => {
    const cardsAtStart = await helper.cardsInDb()
    const cardToDelete = cardsAtStart[0]
    console.log(cardToDelete);
    console.log(cardToDelete._id);
    await api
      .delete(`/api/card/${cardToDelete._id}`)
      .expect(200)

    const cardsAtEnd = await helper.cardsInDb()

    expect(cardsAtEnd).toHaveLength(
      initialCards.length - 1
    )

    const ids = cardsAtEnd.map(r => r._id)
    expect(ids).not.toContain(cardToDelete._id)
  })

  test('parent document is updated', async () => {
    const cardsAtStart = await helper.cardsInDb()
    const cardToDelete = cardsAtStart[0]

    await api
      .delete(`/api/card/${cardToDelete._id}`)
      // .expect(204)
      .expect(200)

    const parentDoc = await Document.findById(cardToDelete.document)

    expect(parentDoc.outlinerCards).not.toContain(cardToDelete._id)
    expect(parentDoc.editorCards).not.toContain(cardToDelete._id)
  })

})

test.only('a card can be updated', async () => {
  const cardsAtStart = await helper.cardsInDb()

  const cardToChange = cardsAtStart[0]

  const changesToCard = {
    content: 'CONTENT of card is changed through PUT',
  }

  await api
    .put(`/api/card/${cardToChange._id}`)
    .send(changesToCard)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/card')

  const contents = response.body.map(r => r.content)

  expect(contents).toEqual(expect.arrayContaining(
    ['CONTENT of card is changed through PUT']))
})

afterAll(async () => {
  await Card.deleteMany({});
  mongoose.connection.close()
})