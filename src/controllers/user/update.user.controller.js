const User = require("../../models/user.model");
const { Entity } = require("../../entities/list.entities");
const { updateEntityByID } = require("../entity/update.entity.controller");

module.exports.updateUserByID = (request, response) => {
  updateEntityByID(Entity.User, User, request, response);
};
