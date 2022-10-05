const Workspace = require("../../models/workspace.model");
const { getEntityByID } = require("../entity/read.entity.controller");

module.exports.getWorkspaceByID = (request, response) => {
  getEntityByID(Workspace, request, response);
};
