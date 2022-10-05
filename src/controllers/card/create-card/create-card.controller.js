const Card = require("../../../models/card.model");
const { getBody } = require("../../../structures/get-body.structure");
const { createEntity } = require("../../.entity/create-entity.controller");
const { createCardEffect } = require("./create-card.effects");

module.exports.createCard = (request, response) => {
  const card = new Card(getBody(Card.modelName, request));

  // The number of runned effects must be set manually in create-card.effects.js.
  // This surely can be improved.
  if (createCardEffect.Document.effects === 1) {
    createCardEffect.Document.outlinerCards(card, card.id, card.document);
    // createCardEffect.Document.editorCards(card, card.id, card.document);
  }

  createEntity(Card, card, response);

};
