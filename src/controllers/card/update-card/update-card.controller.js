const Card = require("../../../models/card.model");
const { Entity } = require("../../../structures/entities.structure");
const { updateEntity } = require("../../.entity/update-entity.controller");

module.exports.updateCard = (request, response) => {
  updateEntity(Entity.Card, Card, request, response);
};
