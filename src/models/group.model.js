const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  title: String,
  contains: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "contains.cardOrGroup",
      },
      cardOrGroup: String,
      },
  ],
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
  },
  indentation: [Number],
});

groupSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Group", groupSchema);
