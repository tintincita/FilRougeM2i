const Document = require("../../../../models/document.model");
const Card = require("../../../../models/card.model");
const { CRUD } = require("../../../../structures/crud.structure");
const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.documentOutlinerCards = (entity, cardID) => {
  entity.outlinerCards = entity.outlinerCards.concat(cardID);
  terminal.log(
    message.success.fieldUpdate(CRUD.Create, Card.modelName,"outlinerCards", Document.modelName)
  );
};
