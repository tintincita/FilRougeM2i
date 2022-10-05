const Document = require("../../models/document.model");
const { Entity } = require("../../structures/entities.structure");
const { createEntity } = require("../.entity/create-entity.controller");

module.exports.createDocument = (request, response) => {
  createEntity(Entity.Document, Document, request, response);
};
