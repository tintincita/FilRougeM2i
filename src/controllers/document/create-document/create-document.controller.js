const Document = require("../../../models/document.model");
const { getBody } = require("../../../structures/get-body.structure");
const { createEntity } = require("../../.entity/create-entity.controller");

module.exports.createDocument = (request, response) => {
  const document = new Document(getBody(Document.modelName, request));

  createEntity(Document, document, response);
};
