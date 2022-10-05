const Document = require("../../../models/document.model");
const { Entity } = require("../../../structures/entities.structure");
const { getEntityByID } = require("../../.entity/read-entity.controller");

module.exports.readDocument = (request, response) => {
  getEntityByID(Entity.Document, Document, request, response);
};
