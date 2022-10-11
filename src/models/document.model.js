const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  title: {
    type: String,
  },
  description: {
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

});

module.exports = mongoose.model("Document", documentSchema);
