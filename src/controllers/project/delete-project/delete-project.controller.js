const Project = require("../../../models/project.model");
const { Entity } = require("../../../structures/entities.structure");
const { deleteEntity } = require("../../.entity/delete-entity.controller");

module.exports.deleteProject = (request, response) => {
  deleteEntity(Entity.Project, Project, request, response);
};
