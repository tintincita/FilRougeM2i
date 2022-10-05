const Card = require("../../models/card.model");
const { Entity } = require("../../structures/entities.structure");
const { deleteEntityByID } = require("../.entity/delete-entity.controller");

module.exports.deleteCardByID = (request, response) => {
  deleteEntityByID(Entity.Card, Card, request, response);
};
