const Project = require("../../models/project.model");
const { Entity } = require("../../structures/entities.structure");
const { createEntity } = require("../.entity/create-entity.controller");

module.exports.createProject = (request, response) => {
  createEntity(Entity.Project, Project, request, response);
};
