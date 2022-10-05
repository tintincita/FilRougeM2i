const Document = require("../../../models/document.model");
const { Entity } = require("../../../structures/entities.structure");
const { readEntity } = require("../../.entity/read-entity.controller");

module.exports.readDocument = (request, response) => {
  readEntity(Entity.Document, Document, request, response);
};
