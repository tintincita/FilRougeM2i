const Document = require("../../../../models/document.model");
const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.documentOutlinerCards = (model, entity, cardID) => {
  entity.outlinerCards = entity.outlinerCards.concat(cardID);
  terminal.log(
    message.success.fieldUpdate("outlinerCards", Document.modelName)
  );
};
