const Document = require("../models/document.model");
const Group = require("../models/group.model");
const Card = require("../models/card.model");

const o = require("../utils/object_helper");
/**
 * Get all documents with GET method from '/api/document'.
 *
 * @param {*} request
 * @param {*} response
 *
 * @return All documents in JSON
 */
module.exports.getAllDocuments = async (request, response) => {
  const documents = await Document.find()
    .populate("outlinerCards")
    .populate("editorCards")
    .populate({path: "editorCardsAndGroups.item"});
  response.json(documents);
};

/**
 * Get a document by ID with GET method from '/api/document/:id'
 *
 * @param {*} request
 * @param {*} response
 *
 * @return Document in JSON
 */

module.exports.getDocumentByID = async (request, response) => {
  const document = await Document.findById(request.params.id)
    .populate("outlinerCards")
    .populate("editorCards")
    .populate({path: 'editorCardsAndGroups.item'});

  if (document) {
    // routine to check editorCardsAndGroups is aligned with editorCards

    let ids = o.objectListToArray(document.editorCardsAndGroups);
    // console.log(ids);

    let groupResponse = true;
    let cardResponse = true;
    let cardList = [];

    for (id_to_check of ids) {
      // console.log(id_to_check);

      groupResponse = await o.isGroup(id_to_check);
      // console.log("group", groupResponse);
      if (groupResponse) {
        groupResponse.contains.forEach((id) => cardList.push(String(id)));
      }

      cardResponse = await o.isCard(id_to_check);
      if (cardResponse) {
        cardList.push(id_to_check);
      }
    }

    // console.log(cardList);

    response.json(document);
  } else {
    response.status(404).end();
  }
};

/**
 * Create document with POST method from '/api/document'.
 * - Can create document from empty request.body
 * - document.title can be set from request.body.title
 *
 * @param {*} request
 * @param {*} response
 *
 * @return Created document in JSON
 */
module.exports.createDocument = async (request, response) => {
  const body = request.body;
  // console.log(body);

  const document = new Document({
    title: body.title || "",
    outlinerCards: [],
    editorCards: [],
  });

  const savedDocument = await document.save();

  response.status(201).json(savedDocument);
};

/**
 * Delete document by ID with DELETE method from '/api/document/:id'
 *
 * @param {*} request
 * @param {*} response
 *
 * @return Status 204
 */
module.exports.deleteDocumentByID = async (request, response) => {
  const target = request.params.id;
  await Document.findByIdAndRemove(target);

  let containedCards = Document.outlinerCards;

  if (containedCards) {
    containedCards.forEach((card) => Card.deleteCardById(card.id));
  }

  response.status(204).send(`Document deleted : ${target}`);
};

/**
 * Update document with PUT method from '/api/document/:id'
 *
 * @param {*} request
 * @param {*} response
 *
 * @return Status 200
 */
module.exports.updateDocumentByID = async (request, response, next) => {
  const body = request.body;

  const document = {
    title: body.title,
    parentSpace: body.parentSpace,
    outlinerCards: body.outlinerCards,
    editorCards: body.editorCards,
    editorCardsAndGroups: body.editorCardsAndGroups,
  };
  const savedDocument = await Document.findByIdAndUpdate(
    request.params.id,
    document,
    { new: true }
  )
    .populate("outlinerCards")
    .populate("editorCards");

  if (savedDocument) {
    response.json(savedDocument);
  } else {
    response.status(400);
  }
};
