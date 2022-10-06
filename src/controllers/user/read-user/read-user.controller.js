const User = require("../../../models/user.model");
const { readEntity } = require("../../.entity/read-entity.controller");

module.exports.readUser = (request, response) => {
  readEntity(User, request, response);
};
