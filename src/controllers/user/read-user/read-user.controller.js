const User = require("../../../models/user.model");
const { Entity } = require("../../../structures/entities.structure");
const { readEntity } = require("../../.entity/read-entity.controller");

module.exports.readUser = (request, response) => {
  readEntity(Entity.User, User, request, response);
};
