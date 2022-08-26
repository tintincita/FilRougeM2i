const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/config/app')

const Group = require('../src/models/group.model')
const Card = require('../src/models/card.model')
const Document = require('../src/models/document.model')
const helper = require('./test_helper')
const o = require('../src/utils/object_helper')

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
  describe('a valid group can be created', () => {
    test('a group can be created', async () => {
      const groupsAtStart = await helper.groupsInDb()
      const docsAtStart = await helper.docsInDb()
      const parentDoc = docsAtStart[0]
      const cardList = o.objectListToArray(parentDoc.editorCards)
      const cardsToGroup = cardList.slice(3)

      const newGroup = {
        contains: cardsToGroup,
        document: parentDoc.id
      }

      const savedGroup = await api
        .post(`/api/group/`)
        .send(newGroup)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/group')

      expect(response.body).toHaveLength(groupsAtStart.length + 1)
      const docsAtEnd = await helper.docsInDb()
      
      console.log(savedGroup);
      expect(o.objectListToArray(docsAtEnd[0].editorCards)).toContain(cardsToGroup[0])
      expect(o.objectListToArray(docsAtEnd[0].editorCardsAndGroups)).not.toContain(cardsToGroup[0])
      expect(o.objectListToArray(docsAtEnd[0].editorCardsAndGroups)).toContain(savedGroup.id)
    })
  })

  test('an empty group cannot be created', async () => {
    const groupsAtStart = await helper.groupsInDb()
    const docsAtStart = await helper.docsInDb()
    const parentDoc = docsAtStart[0]

    const newGroup = {
      document: parentDoc.id
    }

    await api
      .post(`/api/group/`)
      .send(newGroup)
      .expect(400)

    const response = await api.get('/api/group')
    expect(response.body).toHaveLength(groupsAtStart.length)

  })
  test('an orphan group cannot be created', async () => {
    const groupsAtStart = await helper.groupsInDb()
    const docsAtStart = await helper.docsInDb()
    const parentDoc = docsAtStart[0]
    const cardList = o.objectListToArray(parentDoc.editorCards)
    const cardsToGroup = cardList.slice(3)

    const newGroup = {
      contains: cardsToGroup
    }

    await api
      .post(`/api/group/`)
      .send(newGroup)
      .expect(400)

    const response = await api.get('/api/group')
    expect(response.body).toHaveLength(groupsAtStart.length)
  })
})

describe('VIEW group', () => {
  test('a specific group can be viewed', async () => {
    const groupsAtStart = await helper.groupsInDb()
    const groupToView = groupsAtStart[0]

    await api
      .get(`/api/group/${groupToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

  })
  test('a nonExisting ID returns error', async () => { })
  test('a malformatted ID returns error', async () => { })
})

describe('DELETE group', () => {
  test('a group can be deleted', async () => {
    const groupsAtStart = await helper.groupsInDb()
    const groupToDelete = groupsAtStart[0]

    await api
      .delete(`/api/group/${groupToDelete.id}`)
      .expect(204)

    const groupsAtEnd = await helper.groupsInDb()
    expect(groupsAtEnd).toHaveLength(groupsAtStart.length - 1)
  })

  test('contained cards do not get deleted', async () => { })
  test('parent doc still contains all cards', async () => { })
})

describe('UPDATE group', () => {
  test('a group title can be updated', async () => { })
  test('a card can be added to group', async () => { })
  test('a card can be moved within group', async () => { })
  test('a card can be taken out of group', async () => { })
  test('a group with one card becomes just a card', async () => { })
})


afterAll(async () => {
  // await Group.deleteMany({});
  // await Card.deleteMany({});
  // await Document.deleteMany({});
  mongoose.connection.close()
})