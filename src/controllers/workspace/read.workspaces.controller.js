const Workspace = require("../../models/workspace.model");
const { getAllEntities } = require("../entity/read.entities.controller");

 module.exports.getAllWorkspaces = (request, response) => {
  getAllEntities(Workspace, response);
};