const User = require("../../models/user.model");
const { getEntityByID } = require("../entity/read.entity.controller");

module.exports.getUserByID = (request, response) => {
  getEntityByID(User, request, response);
};
