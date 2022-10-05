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
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", cardSchema);
