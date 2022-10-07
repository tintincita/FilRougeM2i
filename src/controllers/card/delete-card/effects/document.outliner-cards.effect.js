const Document = require("../../../../models/document.model");
const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.documentOutlinerCards = async (cardID) => {
  await Document.updateOne(
    { outlinerCards: cardID },
    { $pull: { outlinerCards: cardID } }
  );
  terminal.log(
    message.success.fieldUpdate(Document.modelName, "outlinerCards")
  );  
}
