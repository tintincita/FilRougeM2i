const Card = require("../../../models/card.model");
const { Entity } = require("../../../structures/entities.structure");
const { deleteEntity } = require("../../.entity/delete-entity.controller");
const { deleteCardEffects } = require("./delete-card.effects");

module.exports.deleteCard = async (request, response) => {
  deleteEntity(Card, request, response);
  deleteCardEffects(Entity.Document, request);
};
