const Project = require("../../models/project.model");
const { getEntityByID } = require("../entity/read.entity.controller");

module.exports.getProjectByID = (request, response) => {
  getEntityByID(Project, request, response);
};
