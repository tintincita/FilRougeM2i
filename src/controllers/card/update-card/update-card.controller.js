const Card = require("../../../models/card.model");
const { updateEntity } = require("../../.entity/update-entity.controller");
const { getBody } = require("../../../structures/get-body.structure");

module.exports.updateCard = async (request, response) => {
  const cardID = request.params.id;
  const card = await Card.findByIdAndUpdate(
    cardID,
    getBody(Card.modelName, request)
  );

  updateEntity(Card, card, cardID, response);
};
