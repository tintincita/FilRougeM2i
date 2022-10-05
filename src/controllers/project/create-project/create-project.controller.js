const Project = require("../../../models/project.model");
const { getBody } = require("../../../structures/get-body.structure");
const { createEntity } = require("../../.entity/create-entity.controller");

module.exports.createProject = (request, response) => {
  const project = new Project(getBody(Project.modelName, request));

  createEntity(Project, project, response);
};
