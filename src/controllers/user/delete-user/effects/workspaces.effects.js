const Workspace = require("../../../../models/workspace.model");

const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.workspaces = async (userID) => {
  const deletedWorkspaces = await Workspace.deleteMany({ document: userID });

  if (deletedWorkspaces.deletedCount > 0) {
    terminal.log(
      message.success.deleteEntities(Workspace.modelName, deletedWorkspaces.deletedCount)
    );
  }
};
