const Card = require("../../../models/card.model");
const { Entity } = require("../../../structures/entities.structure");
const { deleteEntity } = require("../../.entity/delete-entity.controller");

module.exports.deleteCard = (request, response) => {
  deleteEntity(Entity.Card, Card, request, response);
};
