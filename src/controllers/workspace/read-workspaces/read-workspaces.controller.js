const Workspace = require("../../../models/workspace.model");
const { getAllEntities } = require("../../.entity/read-entities.controller");

module.exports.readWorkspaces = (request, response) => {
  getAllEntities(Workspace, response);
};
