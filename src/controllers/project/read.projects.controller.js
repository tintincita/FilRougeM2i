const Project = require("../../models/card.model");
const { getAllEntities } = require("../entity/read.entities.controller");

module.exports.getAllProjects = (request, response) => {
  getAllEntities(Project, response);
};
