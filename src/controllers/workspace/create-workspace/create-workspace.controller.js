const Workspace = require("../../../models/workspace.model");
const { getBody } = require("../../../structures/get-body.structure");
const { createEntity } = require("../../.entity/create-entity.controller");

module.exports.createWorkspace = (request, response) => {
  const workspace = new Workspace(getBody(Workspace.modelName, request));

  createEntity(Workspace, workspace, response);
};
