const Document = require("../../../models/document.model");
const { Entity } = require("../../../structures/entities.structure");
const { deleteEntityByID } = require("../../.entity/delete-entity.controller");

module.exports.deleteDocument = (request, response) => {
  deleteEntityByID(Entity.Document, Document, request, response);
};
