const Project = require("../../../models/project.model");
const { updateEntity } = require("../../.entity/update-entity.controller");

module.exports.updateProject = (request, response) => {
  updateEntity(Project, request, response);
};
