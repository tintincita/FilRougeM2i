const { cards } = require("./cards.effect");

// The use of a terminal log is required here.
// Only one response can be send to the client,
// in our case the final response is send from the entity controller.
const terminal = require("../../../../middlewares/terminal.middlewares");

module.exports.deleteDocumentEffects = async (request) => {
  try {
    const projectID = request.params.id;
    cards(projectID);
  } catch (error) {
    terminal.log(error);
  }
};
