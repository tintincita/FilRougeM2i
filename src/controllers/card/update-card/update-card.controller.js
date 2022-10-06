const Card = require("../../../models/card.model");
const { updateEntity } = require("../../.entity/update-entity.controller");

module.exports.updateCard = (request, response) => {
  updateEntity(Card, request, response);
};