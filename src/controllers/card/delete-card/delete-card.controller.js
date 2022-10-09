const Card = require("../../../models/card.model");
const { deleteEntity } = require("../../.entity/delete-entity.controller");
const { deleteCardEffects } = require("./effects/.delete-card.effects");

module.exports.deleteCard = async (request, response) => {
  deleteEntity(Card, request, response);
  deleteCardEffects(request);
};
