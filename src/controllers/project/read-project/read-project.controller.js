const Project = require("../../../models/project.model");
const { Entity } = require("../../../structures/entities.structure");
const { getEntityByID } = require("../../.entity/read-entity.controller");

module.exports.readProject = (request, response) => {
  getEntityByID(Entity.Project, Project, request, response);
};
