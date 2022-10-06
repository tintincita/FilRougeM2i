const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
  // workspace: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Workspace",
  //   required: true,
  // },
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

});

module.exports = mongoose.model("Document", documentSchema);
