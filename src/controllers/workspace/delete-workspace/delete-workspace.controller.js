const Workspace = require("../../../models/workspace.model");
const { deleteEntity } = require("../../.entity/delete-entity.controller");
const {
  deleteWorkspaceEffects,
} = require("./effects/.delete-workspace-effects");

module.exports.deleteWorkspace = (request, response) => {
  deleteEntity(Workspace, request, response);
  deleteWorkspaceEffects(request);
};
