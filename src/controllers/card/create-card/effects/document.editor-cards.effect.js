const Document = require("../../../../models/document.model");
const Card = require("../../../../models/card.model");
const { CRUD } = require("../../../../structures/crud.structure");
const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.documentEditorCards = (entity, cardID) => {
  try {
    entity.editorCards = entity.editorCards.concat(cardID);
    terminal.log(
      message.success.fieldUpdate(
        CRUD.Create,
        Card.modelName,
        "editorCards",
        Document.modelName
      )
    );
  } catch (error) {
    terminal.log(error);
  }
};
