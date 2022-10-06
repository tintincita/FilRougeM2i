const Project = require("../../../models/project.model");
const { readEntities } = require("../../.entity/read-entities.controller");

module.exports.readProjects = async (request, response) => {
  readEntities(Project, response);
};
