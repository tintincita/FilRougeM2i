const Workspace = require("../../../models/workspace.model");
const { Entity } = require("../../../structures/entities.structure");
const { createEntity } = require("../../.entity/create-entity.controller");

module.exports.createWorkspace = (request, response) => {
  createEntity(Entity.Workspace, Workspace, request, response);
};
