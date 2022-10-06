const Card = require("../../../models/card.model");
const { readEntity } = require("../../.entity/read-entity.controller");

module.exports.readCard = async (request, response) => {
  readEntity(Card, request, response);
};
