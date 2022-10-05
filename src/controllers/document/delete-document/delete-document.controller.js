const Document = require("../../../models/document.model");
const { Entity } = require("../../../structures/entities.structure");
const { deleteEntity } = require("../../.entity/delete-entity.controller");

module.exports.deleteDocument = (request, response) => {
  deleteEntity(Entity.Document, Document, request, response);
};
