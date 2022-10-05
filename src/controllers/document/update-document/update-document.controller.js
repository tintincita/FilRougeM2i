const Document = require("../../../models/document.model");
const { Entity } = require("../../../structures/entities.structure");
const { updateEntityByID } = require("../../.entity/update-entity.controller");

module.exports.updateDocument = (request, response) => {
  updateEntityByID(Entity.Document, Document, request, response);
};
