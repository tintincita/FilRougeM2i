const Workspace = require("../../../models/workspace.model");
const { deleteEntity } = require("../../.entity/delete-entity.controller");

module.exports.deleteWorkspace = (request, response) => {
  deleteEntity(Workspace, request, response);
};
