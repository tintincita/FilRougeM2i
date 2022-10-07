const Project = require("../../../models/project.model");
const { deleteEntity } = require("../../.entity/delete-entity.controller");

module.exports.deleteProject = (request, response) => {
  deleteEntity(Project, request, response);
};
