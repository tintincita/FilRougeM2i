const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/config/app')

const Group = require('../src/models/group.model')
const Card = require('../src/models/card.model')
const Document = require('../src/models/document.model')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  // await Group.deleteMany({})

  // let groupObject = new Group()

  // for (let i = 0 ; i < helper.initialCards.length ; i++) {
  //   cardObject = new Card(helper.initialCards[i])
  //   await cardObject.save()
  // }


})

test('groups are returned as json', async () => {
  await api
    .get('/api/group')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// test('all initial cards are loaded', async () => {
//   const response = await api.get('/api/card')

//   expect(response.body).toHaveLength(helper.initialCards.length)
// })

// test('a specific card can be viewed', async () => {
//   const cardsAtStart = await helper.cardsInDb()

//   const cardToView = cardsAtStart[0]

//   const resultCard = await api
//     .get(`/api/card/${cardToView.id}`)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   const processedCardToView = JSON.parse(JSON.stringify(cardToView))

//   expect(resultCard.body).toEqual(processedCardToView)
// })

// test('a card can be deleted', async () => {
//   const cardsAtStart = await helper.cardsInDb()
//   const cardToDelete = cardsAtStart[0]

//   await api
//     .delete(`/api/card/${cardToDelete.id}`)
//     .expect(204)

//   const cardsAtEnd = await helper.cardsInDb()

//   expect(cardsAtEnd).toHaveLength(
//     helper.initialCards.length - 1
//   )

//   const contents = cardsAtEnd.map(r => r.content)

//   expect(contents).not.toContain(cardToDelete.content)
// })

// test('a card can be updated', async () => {
//   const cardsAtStart = await helper.cardsInDb()

//   const cardToChange = cardsAtStart[0]

//   const changesToCard = {
//       content: 'title of card is changed through POST',
//   }

//   await api
//       .put(`/api/card/${cardToChange.id}`)
//       .send(changesToCard)
//       .expect(200)
//       .expect('Content-Type', /application\/json/)

//   const response = await api.get('/api/card')

//   const contents = response.body.map(r => r.content)

//   expect(contents).toContain(
//       'title of card is changed through POST'
//   )
// })

afterAll( async() => {
  await Group.deleteMany({});
  await Card.deleteMany({});
  await Document.deleteMany({});
  mongoose.connection.close()
})