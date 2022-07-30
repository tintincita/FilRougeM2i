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

// module.exports.createCard = async (request, response) => {
//   const body = request.body;

//   let documentRef = "";

//   if (body.document) {
//     documentRef = body.document;
//   } else {
//     const newDocument = new Document();
//     documentRef = newDocument.id;
//   }
//   console.log(documentRef);

//   const parentDocument = await Document.findById(documentRef);
//   console.log(parentDocument);

//   const card = new Card({
//     title: body.title || "",
//     content: body.content,
//     document: documentRef,
//   });

//   const savedCard = await card.save();

//   parentDocument.cards = parentDocument.cards.concat(savedCard.id);
//   await parentDocument.save();

//   response.status(201).json(savedCard);
// };
