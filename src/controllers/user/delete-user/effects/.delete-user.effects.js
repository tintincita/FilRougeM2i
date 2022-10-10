// const { userWorkspaces } = require("./user.workspaces.effect");

// The use of a terminal log is required here.
// Only one response can be send to the client,
// in our case the final response is send from the entity controller.
const terminal = require("../../../../middlewares/terminal.middlewares");

module.exports.deleteUserEffects = async (request) => {
  try {
    const workspaceID = request.params.id;
    // userWorkspaces(workspaceID);
  } catch (error) {
    terminal.log(error);
  }
};
