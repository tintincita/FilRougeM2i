const Card = require("../models/card.model");
const Document = require("../models/document.model");

/**
 * Get all cards with GET method from '/api/card'.
 *
 * @param {*} request
 * @param {*} response
 *
 * @return All cards in JSON
 */
module.exports.getAllCards = async (request, response) => {
  const cards = await Card.find({});
  response.json(cards);
};

/**
 * Get a card by ID with GET method from '/api/card/:id'
 *
 * @param {*} request
 * @param {*} response
 *
 * @return Card in JSON
 */
module.exports.getCardByID = async (request, response) => {
  const card = await Card.findById(request.params.id);
  if (card) {
    response.json(card);
  } else {
    response.status(404).end();
  }
};

/**
 * Create a card with POST method from '/api/card '.
 * - Require at least a document.id in request.body.document
 * - request.body.title and request.body.content can be set at creation
 *
 * @param {*} request
 * @param {*} response
 *
 * @return Created card in JSON
 */
module.exports.createCard = async (request, response) => {
  const {title, content, document} = request.body;

  const parentDocument = await Document.findById(document);
console.log(request.body);
  const card = new Card({
    title: title || "",
    content: content,
    document: document,
    cardIndex: request.body.cardIndex || 1,
  });

  const savedCard = await card.save();

  parentDocument.cards = parentDocument.cards.concat(savedCard.id);
  await parentDocument.save();

  response.status(201).json(savedCard);
};
/**
 * Delete card by ID with DELETE method from '/api/card/:id'
 *
 * @param {*} request
 * @param {*} response
 *
 * @return Status 204
 */
 module.exports.deleteCardByID = async (request, response) => {
  const target = request.params.id;
  await Card.findByIdAndRemove(target);
  response.status(204).send(`Card deleted : ${target}`);
};

/**
 * Update card with PUT method from '/api/card/:id'
 *
 * @param {*} request
 * @param {*} response
 *
 * @return Status 200
 */
 module.exports.updateCardByID = (request, response, next) => {
  const body = request.body

  const card = {
    title: body.title,
    content: body.content,
    document: body.document,
    parentCard: body.parentCard,
    cardIndex: body.cardIndex,
    cards: body.cards
  }
  console.log(request.params.id);
  Card.findByIdAndUpdate(request.params.id, card, { new: true })
    .then(updatedCard => {
      response.json(updatedCard)
    })
    .catch(error => next(error))


};
