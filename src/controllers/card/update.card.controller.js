const Card = require("../../models/card.model");
const { Entity } = require("../../entities/list.entities");
const { updateEntityByID } = require("../entity/update.entity.controller");

module.exports.updateCardByID = (request, response) => {
  updateEntityByID(Entity.Card, Card, request, response);
}
