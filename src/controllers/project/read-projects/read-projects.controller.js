const Project = require("../../../models/card.model");
const { readEntities } = require("../../.entity/read-entities.controller");

module.exports.readProjects = (request, response) => {
  readEntities(Project, response);
};
