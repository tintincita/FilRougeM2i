const User = require("../../../models/user.model");
const { readEntities } = require("../../.entity/read-entities.controller");

module.exports.readUsers = (request, response) => {
  readEntities(User, response);
};
