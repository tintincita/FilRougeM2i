const Workspace = require("../../../models/workspace.model");
const { Entity } = require("../../../structures/entities.structure");
const { updateEntityByID } = require("../../.entity/update-entity.controller");

module.exports.updateWorkspace = (request, response) => {
  updateEntityByID(Entity.Workspace, Workspace, request, response);
};
