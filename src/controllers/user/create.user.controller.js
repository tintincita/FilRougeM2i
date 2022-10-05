const User = require("../../models/user.model");
const { Entity } = require("../../structures/entities.structure");
const { createEntity } = require("../.entity/create-entity.controller");

module.exports.createUser = (request, response) => {
  createEntity(Entity.User, User, request, response);
};
