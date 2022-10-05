const Workspace = require("../../models/workspace.model");
const { Entity } = require("../../entities/list.entities");
const { deleteEntityByID } = require("../entity/delete.entity.controller");

module.exports.deleteWorkspaceByID = (request, response) => {
  deleteEntityByID(Entity.Workspace, Workspace, request, response);
};
