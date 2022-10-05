const Card = require("../../models/card.model");
const { Entity } = require("../../structures/entities.structure");
const { updateEntityByID } = require("../.entity/update-entity.controller");

module.exports.updateCardByID = (request, response) => {
  updateEntityByID(Entity.Card, Card, request, response);
};
