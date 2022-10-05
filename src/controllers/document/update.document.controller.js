const Document = require("../../models/document.model");
const { Entity } = require("../../entities/list.entities");
const { updateEntityByID } = require("../entity/update.entity.controller");

module.exports.updateDocumentByID = (request, response) => {
  updateEntityByID(Entity.Document, Document, request, response);
};

