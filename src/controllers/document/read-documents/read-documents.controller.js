const Document = require("../../../models/document.model");
const { readEntities } = require("../../.entity/read-entities.controller");

module.exports.readDocuments = async (request, response) => {
  readEntities(Document, response);
};
