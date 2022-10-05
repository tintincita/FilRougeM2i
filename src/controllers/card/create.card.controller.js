const Card = require("../../models/card.model");
const { Entity } = require("../../entities/list.entities");
const { createEntity } = require("../entity/create.entity.controller");

module.exports.createCard = (request, response) => {
  createEntity(Entity.Card, Card, request, response);
};
