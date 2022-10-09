const Workspace = require("../../../../models/workspace.model");
const User = require("../../../../models/user.model");
const {CRUD} = require("../../../../structures/crud.structure");

const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.userWorkspaces = async (user, workspaceID) => {
  try {
    user.workspaces = user.workspaces.concat(workspaceID);
    terminal.log(
      message.success.fieldUpdate(
        CRUD.Create,
        Workspace.modelName,
        "workspaces",
        User.modelName
      )
    );
  } catch (error) {
    terminal.log(error);
  }
}