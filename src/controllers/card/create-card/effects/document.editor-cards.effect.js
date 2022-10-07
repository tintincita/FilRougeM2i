const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.documentEditorCards = (model, entity, cardID) => {
  entity.editorCards = entity.editorCards.concat(cardID);
  terminal.log(
    message.success.fieldUpdate(model.modelName, "editorCards")
  );
};