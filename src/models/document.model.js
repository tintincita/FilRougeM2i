const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  outlinerCards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
  editorCards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
  editorCardsAndGroups: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'editorCardsAndGroups.cardOrGroup',
      },
      cardOrGroup: String,
    },
  ],
  parentSpace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
  },
});

documentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Document", documentSchema);
