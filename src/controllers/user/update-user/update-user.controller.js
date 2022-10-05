const User = require("../../../models/user.model");
const { Entity } = require("../../../structures/entities.structure");
const { updateEntity } = require("../../.entity/update-entity.controller");

module.exports.updateUser = (request, response) => {
  updateEntity(Entity.User, User, request, response);
};
