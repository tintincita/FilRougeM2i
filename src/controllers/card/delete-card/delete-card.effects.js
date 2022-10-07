const Document = require("../../../models/document.model");
const Card = require("../../../models/card.model");
const { Entity } = require("../../../structures/entities.structure");

// The use of a terminal log is required here.
// Only one response can be send to the client,
// in our case the final response is send from the entity controller.
const terminal = require("../../../middlewares/terminal.middlewares");
const { message } = require("../../../structures/messages.structure");

module.exports.deleteCardEffects = async (modelName, request) => {
  try {
    if (modelName === Entity.Document) {
      const cardID = request.params.id;
      const card = await Card.findById(cardID);

      const documentID = card.document.toString();
      const document = await Document.findById(documentID);

      if (document) {
        await document.updateOne(
          { outlinerCards: cardID },
          { $pull: { outlinerCards: cardID } }
        );
        terminal.log(
          message.success.fieldUpdate(document.modelName, "outlinerCards")
        );

        await document.updateOne(
          { editorCards: cardID },
          { $pull: { editorCards: cardID } }
        );
        terminal.log(message.success.fieldUpdate(document.modelName, "outlinerCards"));

        // Document save can only be done once per request.
        document.save();
        //
      }
    }
  } catch (error) {
    terminal.log(error);
  }
};
