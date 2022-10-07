const { documentOutlinerCards } = require("./document.outliner-cards.effect");
const {
  documentEditorCards,
} = require("../effects/document.editor-cards.effect");

// The use of a terminal log is required here.
// Only one response can be send to the client,
// in our case the final response is send from the entity controller.
const terminal = require("../../../../middlewares/terminal.middlewares");

module.exports.deleteCardEffects = async (request) => {
  try {
    const cardID = request.params.id;

    documentOutlinerCards(cardID);
    documentEditorCards(cardID);
  } catch (error) {
    terminal.log(error);
  }
};
