const Card = require("../../../../models/card.model");
const Document = require("../../../../models/document.model");
const {CRUD} = require("../../../../structures/crud.structure");

const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.documentOutlinerCards = async (cardID) => {
  await Document.updateOne(
    { outlinerCards: cardID },
    { $pull: { outlinerCards: cardID } }
  );
  terminal.log(
    message.success.fieldUpdate(CRUD.Delete, Card.modelName, Document.modelName, "outlinerCards")
  );  
}
