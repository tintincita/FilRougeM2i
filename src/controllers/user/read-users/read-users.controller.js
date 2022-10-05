const User = require("../../../models/user.model");
const { getAllEntities } = require("../../.entity/read-entities.controller");

module.exports.readUsers = (request, response) => {
  getAllEntities(User, response);
};
