const Document = require("../../../models/document.model");
const { readEntity } = require("../../.entity/read-entity.controller");

module.exports.readDocument = (request, response) => {
  readEntity(Document, request, response);
};
