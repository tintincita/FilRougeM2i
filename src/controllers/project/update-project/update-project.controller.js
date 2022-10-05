const Project = require("../../../models/project.model");
const { Entity } = require("../../../structures/entities.structure");
const { updateEntityByID } = require("../../.entity/update-entity.controller");

module.exports.updateProject = (request, response) => {
  updateEntityByID(Entity.Project, Project, request, response);
};
