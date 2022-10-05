const User = require("../../../models/user.model");
const { Entity } = require("../../../structures/entities.structure");
const { deleteEntity } = require("../../.entity/delete-entity.controller");

module.exports.deleteUser = (request, response) => {
  deleteEntity(Entity.User, User, request, response);
};
