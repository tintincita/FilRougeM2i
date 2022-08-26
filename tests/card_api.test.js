const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/config/app')

const Card = require('../src/models/card.model')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Card.deleteMany({})
  let cardObject = new Card()

  for (let i = 0; i < helper.initialCards.length; i++) {
    cardObject = new Card(helper.initialCards[i])
    await cardObject.save()
  }

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
    .expect(400)
})

test('unexisting id returns error', async () => {
  let id = helper.nonExistingCardId();
  await api
    .get(`/api/card/${id}`)
    .expect(400)
})


test('all initial cards are loaded', async () => {
  const response = await api.get('/api/card')

  expect(response.body).toHaveLength(helper.initialCards.length)
})

test('a specific card can be viewed', async () => {
  const cardsAtStart = await helper.cardsInDb()

  const cardToView = cardsAtStart[0]

  const resultCard = await api
    .get(`/api/card/${cardToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedCardToView = JSON.parse(JSON.stringify(cardToView))

  expect(resultCard.body).toEqual(processedCardToView)
})

describe('DELETE card', () => {
  test('a card can be deleted', async () => {
    const cardsAtStart = await helper.cardsInDb()
    const cardToDelete = cardsAtStart[0]

    await api
      .delete(`/api/card/${cardToDelete.id}`)
      .expect(204)

    const cardsAtEnd = await helper.cardsInDb()

    expect(cardsAtEnd).toHaveLength(
      helper.initialCards.length - 1
    )

    const contents = cardsAtEnd.map(r => r.content)
    expect(contents).not.toContain(cardToDelete.content)
  })

  test('parent document is updated', () => { })

  test('if deleted card in group. group is updated', () => {
    // once card is deleted, if part of group, group.contain.not:includes
  })
})

test('a card can be updated', async () => {
  const cardsAtStart = await helper.cardsInDb()

  const cardToChange = cardsAtStart[0]

  const changesToCard = {
    content: 'title of card is changed through POST',
  }

  await api
    .put(`/api/card/${cardToChange.id}`)
    .send(changesToCard)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/card')

  const contents = response.body.map(r => r.content)

  expect(contents).toContain(
    'title of card is changed through POST'
  )
})

afterAll(async () => {
  await Card.deleteMany({});
  mongoose.connection.close()
})