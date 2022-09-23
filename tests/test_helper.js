const Card = require('../src/models/card.model')
const Group = require('../src/models/group.model')
const Document = require('../src/models/document.model')

const nonExistingCardId = async () => {
  const card = new Card({ content: 'willremovethissoon', date: new Date() })
  await card.save()
  await card.remove()
  return card._id.toString()
}

const nonExistingDocId = async () => {
    const doc = new Document({ content: 'willremovethissoon', date: new Date() })
    await doc.save()
    await doc.remove()
    return doc._id.toString()
  }

const cardsInDb = async () => {
  const cards = await Card.find({})
  return cards.map(card => card.toJSON())
}

const docsInDb = async () => {
  const docs = await Document.find({})
  return docs.map(doc => doc.toJSON())
}

const groupsInDb = async () => {
  const docs = await Group.find({})
  return docs.map(doc => doc.toJSON())
}

module.exports = {
  nonExistingCardId, nonExistingDocId, cardsInDb, docsInDb, groupsInDb
}