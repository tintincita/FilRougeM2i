const Workspace = require("../../../models/workspace.model");
const { updateEntity } = require("../../.entity/update-entity.controller");

module.exports.updateWorkspace = (request, response) => {
  updateEntity(Workspace, request, response);
};
