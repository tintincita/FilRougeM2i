const Workspace = require("../../../models/workspace.model");
const { readEntities } = require("../../.entity/read-entities.controller");

module.exports.readWorkspaces = (request, response) => {
  readEntities(Workspace, response);
};
