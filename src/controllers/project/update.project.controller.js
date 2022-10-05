const Project = require("../../models/project.model");
const { Entity } = require("../../entities/list.entities");
const { updateEntityByID } = require("../entity/update.entity.controller");

module.exports.updateProjectByID = (request, response) => {
  updateEntityByID(Entity.Project, Project, request, response);
}
