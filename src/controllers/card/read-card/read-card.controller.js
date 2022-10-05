const Card = require("../../../models/card.model");
const { Entity } = require("../../../structures/entities.structure");
const { readEntity } = require("../../.entity/read-entity.controller");

module.exports.readCard = (request, response) => {
  readEntity(Entity.Card, Card, request, response);
};
