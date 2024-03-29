const mongoose = require("mongoose");

const cardSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    outliner: {
      style: {
        display: {
          type: String,
        },       
      }
    },
    editor: {
      style: {
        display: {
          type: String,
        },       
      }
    },    
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", cardSchema);
