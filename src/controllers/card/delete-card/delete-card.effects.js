const Document = require("../../../models/document.model");
const { Entity } = require("../../../structures/entities.structure");

// The use of a terminal log is required here.
// Only one response can be send to the client,
// in our case the final response is send from the entity controller.
const terminal = require("../../../middlewares/terminal.middlewares");
const { message } = require("../../../structures/messages.structure");

module.exports.deleteCardEffects = async (
  modelName,
  entity,
  documentID,
  cardID
) => {
  try {
    if (modelName === Entity.Document && entity) {
      documentID = documentID.toString();
      const document = await Document.findById(documentID);

      if (document) {
        await Document.updateOne(
          { outlinerCards: cardID },
          { $pull: { outlinerCards: cardID } }
        );

        await Document.updateOne(
          { editorCards: cardID },
          { $pull: { editorCards: cardID } }
        );

        // Document save can only be done once per request
        document.save();
      } else {
        terminal.log(message.error.readEntity(modelName, documentID));
      }
    }
  } catch (error) {
    terminal.log(error);
  }
};
