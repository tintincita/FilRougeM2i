const Card = require("../../../models/card.model");
const { deleteEntity } = require("../../.entity/delete-entity.controller");

module.exports.deleteCard = async (request, response) => {
  const cardID = request.params.id;
  const card = await Card.findById(cardID);

  deleteEntity(Card, card, cardID, response);
};
