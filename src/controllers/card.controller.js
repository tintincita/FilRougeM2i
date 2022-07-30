const cardsRouter = require("express").Router();

const Card = require("../models/card.model");
const Document = require("../models/document.model");

cardsRouter.get("/", async (request, response) => {
  const cards = await Card.find({});
  response.json(cards);
});

cardsRouter.get("/:id", async (request, response) => {
  const card = await Card.findById(request.params.id);
  if (card) {
    response.json(card);
  } else {
    response.status(404).end();
  }
});

cardsRouter.post("/", async (request, response) => {
  const body = request.body;

  let documentRef = "";

  if (body.document) {
    documentRef = body.document;
  } else {
    const newDocument = new Document();
    documentRef = newDocument.id;
  }
  console.log(documentRef);

  const parentDocument = await Document.findById(documentRef);
  console.log(parentDocument);

  const card = new Card({
    title: body.title || "",
    content: body.content,
    document: documentRef,
  });

  const savedCard = await card.save();

  parentDocument.cards = parentDocument.cards.concat(savedCard.id);
  await parentDocument.save();

  response.status(201).json(savedCard);
});

module.exports = cardsRouter;
