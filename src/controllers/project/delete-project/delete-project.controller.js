const Project = require("../../../models/project.model");
const { deleteEntity } = require("../../.entity/delete-entity.controller");
const { deleteProjectEffects } = require("./effects/.delete-project.effects");

module.exports.deleteProject = (request, response) => {
  deleteEntity(Project, request, response);
  deleteProjectEffects(request);
};
