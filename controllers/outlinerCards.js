const cardsRouter = require('express').Router()

const Card = require('../models/outlinerCards')

cardsRouter.get('/', async (request, response) => {
    const cards = await Card.find({})
    response.json(cards)
})

cardsRouter.get('/:id', async (request, response) => {
    const card = await Card.findById(request.params.id)
    if (card) {
        response.json(card)
    } else {
        response.status(404).end()
    }
})

cardsRouter.post('/', async (request,response) => {
    const body = request.body

    const card = new Card({
        title: body.title || '',
        content: body.content
    })

    const savedCard = await card.save()
    response.status(201).json(savedCard)
})

module.exports = cardsRouter