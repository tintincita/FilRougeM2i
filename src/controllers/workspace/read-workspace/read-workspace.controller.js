const Workspace = require("../../../models/workspace.model");
const { readEntity } = require("../../.entity/read-entity.controller");

module.exports.readWorkspace = (request, response) => {
  readEntity(Workspace, request, response);
};
