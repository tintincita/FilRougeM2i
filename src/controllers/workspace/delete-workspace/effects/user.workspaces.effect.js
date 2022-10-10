const Workspace = require("../../../../models/workspace.model");
const User = require("../../../../models/user.model");
const { CRUD } = require("../../../../structures/crud.structure");

const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.userWorkspaces = async (workspaceID) => {
  try {
    await User.updateOne(
      { workspaces: workspaceID },
      { $pull: { workspaces: workspaceID } }
    );
    terminal.log(
      message.success.fieldUpdate(
        CRUD.Delete,
        Workspace.modelName,
        "workspaces",
        User.modelName
      )
    );
  } catch (error) {
    terminal.log(error);
  }
};
