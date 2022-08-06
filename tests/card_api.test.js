const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/config/app')

const Card = require('../src/models/card.model')

const api = supertest(app)

const initialCards = [
  {
    content: 'First card',
    cardIndex: 1,
  },
  {
    content: 'Second card',
    cardIndex: 2,
  },
]

beforeEach(async () => {
  await Card.deleteMany({})
  let cardObject = new Card(initialCards[0])
  await cardObject.save()
  cardObject = new Card(initialCards[1])
  await cardObject.save()
})

test('cards are returned as json', async () => {
  await api
    .get('/api/card')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two cards', async () => {
  const response = await api.get('/api/card')

  expect(response.body).toHaveLength(initialCards.length)
})

test('the first card says first', async () => {
  const response = await api.get('/api/card')

  expect(response.body[0].content).toBe('First card')
})

test('a specific card is within the returned cards', async () => {
  const response = await api.get('/api/card')

  const contents = response.body.map(r => r.content)
  expect(contents).toContain(
    'Second card'
  )
})



afterAll(() => {
  mongoose.connection.close()
})