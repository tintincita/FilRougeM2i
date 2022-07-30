const mongoose = require("mongoose");

const cardSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
    parentCard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
    previousCard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
    nextCard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  },
  {
    timestamps: true,
  }
);

cardSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Card", cardSchema);
