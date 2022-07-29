const documentsRouter = require('express').Router()

const documents = require('../models/documents')
const Document = require('../models/documents')

documentsRouter.get('/', async (request, response) => {
    const documents = await Document.find({})
    response.json(documents)
})

documentsRouter.get('/:id', async (request, response) => {
    const document = await Document.findById(request.params.id)
    if (document) {
        response.json(document)
    } else {
        response.status(404).end()
    }
})

documentsRouter.post('/', async (request,response) => {
    const body = request.body

    const document = new Document({
        title: body.title || ''
    })

    const savedDocument = await document.save()
    response.status(201).json(savedDocument)
})

documentsRouter.delete('/:id', async (request, response) => {
    await Document.findByIdAndRemove(request.pqrqms.id)
    response.status(204).end()
})


module.exports = documentsRouter