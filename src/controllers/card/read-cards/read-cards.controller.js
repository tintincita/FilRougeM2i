const Card = require("../../../models/card.model");
const { readEntities } = require("../../.entity/read-entities.controller");

module.exports.readCards = async (request, response) => {
  const cards = await Card.find({});

  readEntities(Card, cards,response);
};
