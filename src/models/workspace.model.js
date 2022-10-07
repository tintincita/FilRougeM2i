const mongoose = require("mongoose");

const workspaceSchema = mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workspace", workspaceSchema);
