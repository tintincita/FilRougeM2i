const User = require("../../models/user.model");
const { Entity } = require("../../structures/entities.structure");
const { updateEntityByID } = require("../.entity/update-entity.controller");

module.exports.updateUserByID = (request, response) => {
  updateEntityByID(Entity.User, User, request, response);
};
