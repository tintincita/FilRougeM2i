const Workspace = require("../../../models/workspace.model");
const { Entity } = require("../../../structures/entities.structure");
const { deleteEntity } = require("../../.entity/delete-entity.controller");

module.exports.deleteWorkspace = (request, response) => {
  deleteEntity(Entity.Workspace, Workspace, request, response);
};
