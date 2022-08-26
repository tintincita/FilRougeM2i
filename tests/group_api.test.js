const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/config/app')

const Group = require('../src/models/group.model')
const Card = require('../src/models/card.model')
const Document = require('../src/models/document.model')
const helper = require('./test_helper')

const api = supertest(app)


beforeAll(async () => {

  await Document.deleteMany({})
  await Group.deleteMany({})
  await Card.deleteMany({})

  let docObject = new Document()
  for (let i = 0; i < helper.initialDocs.length; i++) {
    docObject = new Document(helper.initialDocs[i])
    await docObject.save()
  }

  let docsAtStart = await helper.docsInDb()
  let docToFill = docsAtStart[0]

  let cardArray = []

  for (let i = 0; i < helper.initialCards.length; i++) {
    cardObject = new Card(helper.initialCards[i])
    cardObject.document = docToFill.id
    cardArray.push(cardObject.id)
    await cardObject.save()
  }

  docToFill.editorCards = cardArray
  docToFill.outlinerCards = cardArray
  docToFill.editorCardsAndGroups = cardArray

  await api
    .put(`/api/document/${docToFill.id}`)
    .send(docToFill)
})

test('groups are returned as json', async () => {
  await api
    .get('/api/group')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('CREATE group', () => {
  test('a group can be created', async () => {})
  test('an empty group cannot be created', async () => {})
  test('an orphan group cannot be created', async () => {})
})

describe('VIEW group', () => {
  test('a specific group can be viewed', async() => {})
  test('a nonExisting ID returns error', async() => {})
  test('a malformatted ID returns error', async() => {})
})

describe('DELETE group', () => {
  test('contained cards do not get deleted', async () => {})
  test('parent doc still contains all cards', async () => {}) 
})

describe('UPDATE group', () => {
  test('a group title can be updated', async () => {})
  test('a card can be added to group', async () => {})
  test('a card can be moved within group', async () => {})
  test('a card can be taken out of group', async () => {})
  test('a group with one card becomes just a card', async () => {})
})


afterAll(async () => {
  await Group.deleteMany({});
  await Card.deleteMany({});
  await Document.deleteMany({});
  mongoose.connection.close()
})