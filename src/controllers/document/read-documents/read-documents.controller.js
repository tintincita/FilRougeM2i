const Document = require("../../../models/document.model");
const { getAllEntities } = require("../../.entity/read-entities.controller");

module.exports.getAllDocuments = (request, response) => {
  getAllEntities(Document, response);
};
