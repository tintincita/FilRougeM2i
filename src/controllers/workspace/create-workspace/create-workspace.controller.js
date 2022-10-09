const Workspace = require("../../../models/workspace.model");
const { getBody } = require("../../../structures/get-body.structure");
const { createEntity } = require("../../.entity/create-entity.controller");
const { createWorkspaceEffects } = require("./effects/.create-workspace.effects");

module.exports.createWorkspace = (request, response) => {
  const workspace = new Workspace(getBody(Workspace.modelName, request));

  createEntity(Workspace, workspace, response);
  createWorkspaceEffects(workspace);
};
