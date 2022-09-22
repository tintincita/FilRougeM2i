const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
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
      type: mongoose.Schema.Types.ObjectId,
      refPath: "cardsAndGroups",
    },
  ],
  cardsAndGroups: {
    type: String,
    required: true,
    enum: ["Card", "Group"],
  },
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
