const Document = require("../models/document.model");
const Card = require("../models/card.model");
/**
 * Get all documents with GET method from '/api/document'.
 *
 * @param {*} request
 * @param {*} response
 *
 * @return All documents in JSON
 */
module.exports.getAllDocuments = async (request, response) => {
  const documents = await Document.find().populate("outlinerCards").populate("editorCards");
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
  const document = await Document.findById(request.params.id).populate(
    "outlinerCards",
    "editorCards"
  );
  if (document) {
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
  console.log(body);

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
module.exports.updateDocumentByID = (request, response, next) => {
  const body = request.body;

  const document = {
    title: body.title,
    parentSpace: body.parentSpace,
    outlinerCards: body.outlinerCards,
    editorCards: body.editorCards,
  };

  Document.findByIdAndUpdate(request.params.id, document, { new: true })
    .then((updatedDocument) => {
      response.json(updatedDocument);
    })
    .catch((error) => next(error));
};
