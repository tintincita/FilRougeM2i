const Workspace = require("../../../models/workspace.model");
const { Entity } = require("../../../structures/entities.structure");
const { updateEntity } = require("../../.entity/update-entity.controller");

module.exports.updateWorkspace = (request, response) => {
  updateEntity(Entity.Workspace, Workspace, request, response);
};
