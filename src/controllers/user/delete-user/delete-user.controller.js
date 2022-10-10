const User = require("../../../models/user.model");
const { deleteEntity } = require("../../.entity/delete-entity.controller");
const { deleteUserEffects } = require("./effects/.delete-user.effects");

module.exports.deleteUser = (request, response) => {
  deleteEntity(User, request, response);
  deleteUserEffects(request);
};
