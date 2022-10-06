const Document = require("../../../models/document.model");
const { updateEntity } = require("../../.entity/update-entity.controller");

module.exports.updateDocument = (request, response) => {
  updateEntity(Document, request, response);
};
