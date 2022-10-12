const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/app/app");

const Card = require("../src/models/card.model");
const Document = require("../src/models/document.model");
// const Project = require('../src/models/project.model')
// const Workspace = require('../src/models/workspace.model')

const initialCards = require("./data/cards.json");
const initialDocuments = require("./data/documents.json");

const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Card.deleteMany({});
  await Document.deleteMany({});

  await Card.insertMany(initialCards);
  await Document.insertMany(initialDocuments);
});

test("documents are returned as json", async () => {
  await api
    .get("/api/document")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("malformatted id returns error", async () => {
  await api
    .get("/api/document/88")
    .expect(404);
});

test("unexisting id returns error", async () => {
  let id = helper.nonExistingCardId();
  await api
    .get(`/api/document/${id}`)
    .expect(404);
});

test("all initial documents are loaded", async () => {
  const response = await api.get("/api/document");

  expect(response.body).toHaveLength(initialDocuments.length);
});

test("a specific document can be viewed", async () => {
  const DocumentsAtStart = await helper.cardsInDb();
  const DocumentToView = DocumentsAtStart[0];

  const resultDocument = await api
    .get(`/api/document/${DocumentToView._id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedDocumentToView = JSON.parse(JSON.stringify(DocumentToView));

  expect(resultDocument.body).toEqual(processedDocumentToView);
});
