const Project = require("../../../models/project.model");
const { getBody } = require("../../../structures/get-body.structure");
const { createEntity } = require("../../.entity/create-entity.controller");
const { createProjectEffects } = require("./effects/.create-project.effects");

module.exports.createProject = (request, response) => {
  const project = new Project(getBody(Project.modelName, request));

  createEntity(Project, project, response);
  createProjectEffects(project);
};
