const Project = require("../../../models/card.model");
const { getAllEntities } = require("../../.entity/read-entities.controller");

module.exports.readProjects = (request, response) => {
  getAllEntities(Project, response);
};
