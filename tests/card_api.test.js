const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/config/app')

const Card = require('../src/models/card.model')
const Group = require('../src/models/group.model')
const Document = require('../src/models/document.model')

const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Card.deleteMany({})

  let docObject = new Document()
  let cardObject = new Card()
  let doc = await docObject.save()
  let savedCard = new Card()

  for (let i = 0; i < helper.initialCards.length; i++) {
    cardObject = new Card(helper.initialCards[i])
    cardObject.document = doc.id
    savedCard = await cardObject.save()
    doc.outlinerCards.push(savedCard.id)
    doc.editorCardsAndGroups.push(savedCard.id)
  }
  await Document.findByIdAndUpdate(doc.id, 
    {outlinerCards:doc.outlinerCards, 
      editorCards:doc.editorCards, 
      editorCardsAndGroups:doc.editorCardsAndGroups}, 
    { new: true })

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

  test('parent document is updated', async () => { 
    const cardsAtStart = await helper.cardsInDb()
    const cardToDelete = cardsAtStart[0]

    await api
      .delete(`/api/card/${cardToDelete.id}`)
      .expect(204)

    const parentDoc = await Document.findById(cardToDelete.document)

    expect(parentDoc.outlinerCards).not.toContain(cardToDelete.id)
    expect(parentDoc.editorCards).not.toContain(cardToDelete.id)
    expect(parentDoc.editorCardsAndGroups).not.toContain(cardToDelete.id)
  })

  test('if deleted card in group. group and document are updated', async () => {
    // setting initial conditions
    const cardsAtStart = await helper.cardsInDb()
    let parentDoc = await Document.findById(cardsAtStart[0].document)
    console.log("parentDoc",parentDoc)
    
    const cardsToGroup = cardsAtStart.slice(0,3)
    const ids = cardsToGroup.map((card) => card.id)

    const newGroup = {
      contains: ids,
      document: cardsToGroup[0].document
    }

    const groupResponse = await api.post(`/api/group`).send(newGroup)
    parentDoc = await Document.findById(parentDoc.id)
    const groupId = groupResponse.body.id
    let containingGroup = await Group.findById(groupId)
    console.log("containingGroup before delete",containingGroup);
    console.log("parentDoc list, before delete", parentDoc.editorCardsAndGroups);
    
    // action
    const cardToDelete = cardsToGroup[0]
    console.log(cardToDelete);
    console.log(cardToDelete.id);
    await api.delete(`/api/card/${cardToDelete.id}`).expect(204)
    
    //expected conditions
    containingGroup = await Group.findById(groupId)
    parentDoc = await Document.findById(parentDoc.id)

    console.log("contianingGroup after delete", containingGroup.contains);
    console.log("parentDoc list, after delete", parentDoc.editorCardsAndGroups);
    // expect(containingGroup.contains)
  })

  test('if said group has only one card it becomes a card', () => {
    // if group contains only one card => group deleted
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