const Card = require("../../../models/card.model");
const { readEntity } = require("../../.entity/read-entity.controller");

module.exports.readCard = async (request, response) => {
  const cardID = request.params.id;
  const card = await Card.findById(cardID);

  readEntity(Card, card, cardID, response);
};
