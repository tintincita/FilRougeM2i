const Card = require("../../../models/card.model");
const { readEntities } = require("../../.entity/read-entities.controller");

module.exports.readCards = (request, response) => {
  readEntities(Card, response);
};
