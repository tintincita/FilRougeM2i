const User = require("../../../models/user.model");
const { Entity } = require("../../../structures/entities.structure");
const { deleteEntityByID } = require("../../.entity/delete-entity.controller");

module.exports.deleteUser = (request, response) => {
  deleteEntityByID(Entity.User, User, request, response);
};
