const Card = require("../../models/card.model");
const { Entity } = require("../../structures/entities.structure");
const { getEntityByID } = require("../.entity/read-entity.controller");

module.exports.getCardByID = (request, response) => {
  getEntityByID(Entity.Card, Card, request, response);
};
