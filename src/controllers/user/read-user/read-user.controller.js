const User = require("../../../models/user.model");
const { Entity } = require("../../../structures/entities.structure");
const { getEntityByID } = require("../../.entity/read-entity.controller");

module.exports.getUserByID = (request, response) => {
  getEntityByID(Entity.User, User, request, response);
};
