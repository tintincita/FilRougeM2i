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
