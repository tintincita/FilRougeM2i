const Card = require("../../../models/card.model");
const { getAllEntities } = require("../../.entity/read-entities.controller");

module.exports.readCards = (request, response) => {
  getAllEntities(Card, response);
};
