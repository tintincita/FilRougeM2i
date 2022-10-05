const Project = require("../../models/project.model");
const { Entity } = require("../../entities/list.entities");
const { createEntity } = require("../entity/create.entity.controller");

module.exports.createProject = (request, response) => {
  createEntity(Entity.Project, Project, request, response);
};
