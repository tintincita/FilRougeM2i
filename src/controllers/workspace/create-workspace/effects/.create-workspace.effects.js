const Workspace = require("../../../../models/workspace.model");
const User = require("../../../../models/user.model");
const { userWorkspaces } = require("./user.workspaces.effect");

// The use of a terminal log is required here.
// Only one response can be send to the client,
// in our case the final response is send from the entity controller.
const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.createWorkspaceEffects = async (entity) => {
  try {
    if (entity) {
      const userID = entity.user.toString();
      const user = await User.findById(userID);

      if (user) {
        const workspaceID = entity._id.toString();

        userWorkspaces(user, workspaceID);

        // Document save can only be done once per request
        user.save();
        //
      } else {
        terminal.log(message.error.readEntity(Workspace.modelName, workspaceID));
      }
    }
  } catch (error) {
    terminal.log(error);
  }
};