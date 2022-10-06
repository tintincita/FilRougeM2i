const Card = require("../../../models/card.model");
const { Entity } = require("../../../structures/entities.structure");
const { deleteEntity } = require("../../.entity/delete-entity.controller");
const { deleteCardEffects } = require("./delete-card.effects");

module.exports.deleteCard = async (request, response) => {
  const cardID = request.params.id;
  const card = await Card.findById(cardID);

  deleteEntity(Card, card, cardID, response);
  deleteCardEffects(Entity.Document, card, card.document, card.id);
};
