const Document = require("../../../models/document.model");
const { Entity } = require("../../../structures/entities.structure");
const { deleteEntity } = require("../../.entity/delete-entity.controller");
const { deleteDocumentEffects } = require("./delete-document.effects");

module.exports.deleteDocument = async (request, response) => {
  const documentID = request.params.id;

  deleteEntity(Document, documentID, response);
  deleteDocumentEffects(Entity.Card, documentID);
};
