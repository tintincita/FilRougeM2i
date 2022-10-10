const Card = require("../../../../models/card.model");
const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.cards = async (documentID) => {
  try {
    const deletedCards = await Card.deleteMany({ document: documentID });

    if (deletedCards.deletedCount > 0) {
      terminal.log(
        message.success.deleteEntities(
          Card.modelName,
          deletedCards.deletedCount
        )
      );
    }
  } catch (error) {
    terminal.log(error);
  }
};
