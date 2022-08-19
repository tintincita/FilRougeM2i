const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
  {
    contains: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card" | "Group",
    }],
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
    
  }
);

groupSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Group", groupSchema);