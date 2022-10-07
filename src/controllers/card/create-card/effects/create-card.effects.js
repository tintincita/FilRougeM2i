const Document = require("../../../../models/document.model");
const { Entity } = require("../../../../structures/entities.structure");
const { documentOutlinerCards } = require("./document.outliner-cards.effect");
const { documentEditorCards } = require("./document.editor-cards.effect");

// The use of a terminal log is required here.
// Only one response can be send to the client,
// in our case the final response is send from the entity controller.
const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.createCardEffects = async (entity) => {
  try {
    if (entity) {
      const documentID = entity.document.toString();
      const document = await Document.findById(documentID);

      if (document) {
        documentOutlinerCards(document, entity._id);
        documentEditorCards(document, entity._id);

        // Document save can only be done once per request
        document.save();
        //
      } else {
        terminal.log(message.error.readEntity(modelName, documentID));
      }
    }
  } catch (error) {
    terminal.log(error);
  }
};
