const Project = require("../../../models/project.model");
const { Entity } = require("../../../structures/entities.structure");
const { readEntity } = require("../../.entity/read-entity.controller");

module.exports.readProject = (request, response) => {
  readEntity(Entity.Project, Project, request, response);
};
