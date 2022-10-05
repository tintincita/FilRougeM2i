const Document = require("../../models/document.model");
const { Entity } = require("../../entities/list.entities");
const { deleteEntityByID } = require("../entity/delete.entity.controller");

module.exports.deleteDocumentByID = (request, response) => {
  deleteEntityByID(Entity.Document, Document, request, response);
};
