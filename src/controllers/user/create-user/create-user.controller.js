const User = require("../../../models/user.model");
const { getBody } = require("../../../structures/get-body.structure");
const { createEntity } = require("../../.entity/create-entity.controller");

module.exports.createUser = (request, response) => {
  const user = new User(getBody(User.modelName, request));

  createEntity(User, user, response);
};
