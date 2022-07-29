const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const cardsRouter = require('./controllers/outlinerCards')
const documentsRouter = require('./controllers/documents')

logger.info('connecting to', config.MONGO_URI)

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('connected to db')
  })
  .catch((err) => {
    logger.error('Error connecting to db', err.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/cards', cardsRouter)
app.use('/api/documents', documentsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
