const Document = require("../../../models/document.model");
const { Entity } = require("../../../structures/entities.structure");
const { deleteEntity } = require("../../.entity/delete-entity.controller");
const { deleteDocumentEffects } = require("./delete-document.effects");

module.exports.deleteDocument = async (request, response) => {
  deleteEntity(Document, request, response);
  deleteDocumentEffects(Entity.Card, request);
};
