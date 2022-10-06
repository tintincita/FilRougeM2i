const Project = require("../../../models/project.model");
const { readEntity } = require("../../.entity/read-entity.controller");

module.exports.readProject = (request, response) => {
  readEntity(Project, request, response);
};
