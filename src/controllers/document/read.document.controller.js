const Document = require("../../models/document.model");
const { getEntityByID } = require("../entity/read.entity.controller");

module.exports.getDocumentByID = (request, response) => {
  getEntityByID(Document, request, response);
};
