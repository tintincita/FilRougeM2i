const Workspace = require("../../models/workspace.model");
const { Entity } = require("../../entities/list.entities");
const { createEntity } = require("../entity/create.entity.controller");


module.exports.createWorkspace = (request, response) => {
  createEntity(Entity.Workspace, Workspace, request, response);
};
