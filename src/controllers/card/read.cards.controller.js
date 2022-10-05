const Card = require("../../models/card.model");
const { getAllEntities } = require("../.entity/read-entities.controller");

module.exports.getAllCards = (request, response) => {
  getAllEntities(Card, response);
};
