const User = require("../../../models/user.model");
const { deleteEntity } = require("../../.entity/delete-entity.controller");

module.exports.deleteUser = (request, response) => {
  deleteEntity(User, request, response);
};
