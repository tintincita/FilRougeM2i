const Workspace = require("../../../models/workspace.model");
const { Entity } = require("../../../structures/entities.structure");
const { deleteEntityByID } = require("../../.entity/delete-entity.controller");

module.exports.deleteWorkspace = (request, response) => {
  deleteEntityByID(Entity.Workspace, Workspace, request, response);
};
