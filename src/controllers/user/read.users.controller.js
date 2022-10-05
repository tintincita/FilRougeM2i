const User = require("../../models/user.model");
const { getAllEntities } = require("../entity/read.entities.controller");

module.exports.getAllUsers = (request, response) => {
  getAllEntities(User, response);
};
