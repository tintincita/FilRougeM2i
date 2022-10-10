const { workspaces } = require("./workspaces.effect");

// The use of a terminal log is required here.
// Only one response can be send to the client,
// in our case the final response is send from the entity controller.
const terminal = require("../../../../middlewares/terminal.middlewares");

module.exports.deleteUserEffects = async (request) => {
  try {
    const userID = request.params.id;
    workspaces(userID);
  } catch (error) {
    terminal.log(error);
  }
};
