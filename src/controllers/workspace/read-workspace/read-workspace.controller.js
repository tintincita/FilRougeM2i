const Workspace = require("../../../models/workspace.model");
const { Entity } = require("../../../structures/entities.structure");
const { readEntity } = require("../../.entity/read-entity.controller");

module.exports.readWorkspace = (request, response) => {
  readEntity(Entity.Workspace, Workspace, request, response);
};
