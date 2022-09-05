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
  const { title, content, document, group } = request.body;

  const parentDocument = await Document.findById(document);

  if (parentDocument) {
    console.log(request.body);
    const card = new Card({
      title: title || "titre",
      content: content || "contenu",
      document: document,
      group: group,
    });

    const savedCard = await card.save();

    parentDocument.outlinerCards = parentDocument.outlinerCards.concat(
      savedCard.id
    );
    parentDocument.editorCards = parentDocument.editorCards.concat(
      savedCard.id
    );
    parentDocument.editorCardsAndGroups = parentDocument.editorCardsAndGroups.concat(
      savedCard.id
    );

    if (group) {
      // check if card is in group / include card in group 
    }

    await parentDocument.save();

    response.status(201).json(savedCard);
  } else {
    response.status(400);
    throw "Missing document, cannot create orphan card";
  }
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
  let cardToDelete = Card.findById(target)

  await Document.updateOne(
    { outlinerCards: target, editorCards: target },
    { $pull: { outlinerCards: target, editorCards: target } }
  );

  if (cardToDelete.group) {
    await Group.updateOne(
      { contains: target },
      { $pull: { contains: target } });
  } else {
    await Document.updateOne(
      { editorCardsAndGroups: target },
      { $pull: { editorCardsAndGroups: target } })
  }

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
module.exports.updateCardByID = async (request, response, next) => {
  const body = request.body;

  const card = {
    title: body.title,
    content: body.content,
    document: body.document,
    group: body.group,
  };

  const oldCard = Card.findById(request.params.id)

  if (oldCard.document != card.document) {
    console.log("card changed doc")
    // need to update doc (old and new)
  }

  if (oldCard.group != card.group) {
    console.log("card changed group");
    // need to update group (old and new)
  }

  const savedCard = await Card.findByIdAndUpdate(request.params.id, card, { new: true })
  
  if(savedCard){
    response.json(savedCard);
  } else {
    response.status(400)
  }
};
