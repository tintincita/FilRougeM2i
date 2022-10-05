const Project = require("../../../models/project.model");
const { Entity } = require("../../../structures/entities.structure");
const { updateEntity } = require("../../.entity/update-entity.controller");

module.exports.updateProject = (request, response) => {
  updateEntity(Entity.Project, Project, request, response);
};
