const Document = require("../../../models/document.model");
const { getBody } = require("../../../structures/get-body.structure");
const { createEntity } = require("../../.entity/create-entity.controller");
const { createDocumentEffects } = require("./effects/.create-document.effects");

module.exports.createDocument = (request, response) => {
  const document = new Document(getBody(Document.modelName, request));

  createEntity(Document, document, response);
  createDocumentEffects(document);
};
