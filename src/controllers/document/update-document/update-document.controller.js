const Document = require("../../../models/document.model");
const { Entity } = require("../../../structures/entities.structure");
const { updateEntity } = require("../../.entity/update-entity.controller");

module.exports.updateDocument = (request, response) => {
  updateEntity(Entity.Document, Document, request, response);
};
