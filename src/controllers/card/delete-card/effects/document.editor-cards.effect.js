const Document = require("../../../../models/document.model");
const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.documentEditorCards = async (cardID) => {
  await Document.updateOne(
    { editorCards: cardID },
    { $pull: { editorCards: cardID } }
  );
  terminal.log(
    message.success.fieldUpdate(Document.modelName, "editorCards")
  );  
}
