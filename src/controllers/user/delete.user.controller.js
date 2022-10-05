const User = require("../../models/user.model");
const { Entity } = require("../../entities/list.entities");
const { deleteEntityByID } = require("../entity/delete.entity.controller");

module.exports.deleteUserByID = (request, response) => {
  deleteEntityByID(Entity.User, User, request, response);
};
