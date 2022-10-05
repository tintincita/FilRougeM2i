const Project = require("../../../models/project.model");
const { Entity } = require("../../../structures/entities.structure");
const { deleteEntityByID } = require("../../.entity/delete-entity.controller");

module.exports.deleteProjectByID = (request, response) => {
  deleteEntityByID(Entity.Project, Project, request, response);
};
