const mongoose = require('mongoose')

const documentSchema = mongoose.Schema({
    title : {
        type: String
    },
    cards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card'
        }
    ],
    parentSpace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    }


})

documentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Document', documentSchema)