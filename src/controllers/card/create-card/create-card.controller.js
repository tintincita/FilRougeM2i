const Card = require("../../../models/card.model");
const { getBody } = require("../../../structures/get-body.structure");
const { createEntity } = require("../../.entity/create-entity.controller");
const { createCardEffect } = require("./create-card.effects");

module.exports.createCard = (request, response) => {
  const card = new Card(getBody(Card.modelName, request));

  createEntity(Card, card, response);
  createCardEffect.Document.outlinerCards(card, card.document);
};
