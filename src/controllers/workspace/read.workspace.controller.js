const Workspace = require("../../models/workspace.model");
const { Entity } = require("../../structures/entities.structure");
const { getEntityByID } = require("../.entity/read-entity.controller");

module.exports.getWorkspaceByID = (request, response) => {
  getEntityByID(Entity.Workspace, Workspace, request, response);
};
