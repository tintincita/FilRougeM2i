const Document = require("../../../models/document.model");
const { deleteEntity } = require("../../.entity/delete-entity.controller");
const { deleteDocumentEffects } = require("./effects/.delete-document.effects");

module.exports.deleteDocument = async (request, response) => {
  deleteEntity(Document, request, response);
  deleteDocumentEffects(request);
};
