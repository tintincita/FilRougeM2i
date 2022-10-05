const Card = require("../../models/card.model");
const { getEntityByID } = require("../entity/read.entity.controller");

module.exports.getCardByID = (request, response) => {
  getEntityByID(Card, request, response);
};
