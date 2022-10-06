const User = require("../../../models/user.model");
const { updateEntity } = require("../../.entity/update-entity.controller");

module.exports.updateUser = (request, response) => {
  updateEntity(User, request, response);
};
