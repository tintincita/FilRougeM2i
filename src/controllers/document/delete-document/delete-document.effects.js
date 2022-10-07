const { Entity } = require("../../../structures/entities.structure");
const Card = require("../../../models/card.model");
const { message } = require("../../../structures/messages.structure");

// The use of a terminal log is required here.
// Only one response can be send to the client,
// in our case the final response is send from the entity controller.
const terminal = require("../../../middlewares/terminal.middlewares");

module.exports.deleteDocumentEffects = async (modelName, request) => {
  try {
    if (modelName === Entity.Card) {
      const documentID = request.params.id;
      const deletedCards = await Card.deleteMany({ document: documentID });
      if (deletedCards.deletedCount > 0) {
        terminal.log(
          message.success.deleteEntities(modelName, deletedCards.deletedCount)
        );
      }
    } else {
      terminal.log(message.error.deleteEntities(modelName));
    }
  } catch (error) {
    terminal.log(error);
  }
};
