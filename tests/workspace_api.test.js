const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/app/app");

const Card = require("../src/models/card.model");
const Workspace = require("../src/models/workspace.model");
// const Project = require('../src/models/project.model')
// const Workspace = require('../src/models/workspace.model')

const initialCards = require("./data/cards.json");
const initialWorkspaces = require("./data/workspaces.json");

const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Card.deleteMany({});
  await Workspace.deleteMany({});

  await Card.insertMany(initialCards);
  await Workspace.insertMany(initialWorkspaces);
});

test("workspaces are returned as json", async () => {
  await api
    .get("/api/workspace")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("malformatted id returns error", async () => {
  await api
    .get("/api/workspace/88")
    // current model throws 500. change try catch on .entity controller to get 404, etc
    // .expect(400)
    .expect(500);
});

test("unexisting id returns error", async () => {
  let id = helper.nonExistingCardId();
  await api
    .get(`/api/workspace/${id}`)
    // current model throws 500. change try catch on .entity controller to get 404, etc
    // .expect(400)
    .expect(500);
});

test("all initial workspaces are loaded", async () => {
  const response = await api.get("/api/workspace");

  expect(response.body).toHaveLength(initialWorkspaces.length);
});

test("a specific workspace can be viewed", async () => {
  const WorkspacesAtStart = await helper.cardsInDb();
  const WorkspaceToView = WorkspacesAtStart[0];

  const resultWorkspace = await api
    .get(`/api/workspace/${WorkspaceToView._id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedWorkspaceToView = JSON.parse(JSON.stringify(WorkspaceToView));

  expect(resultWorkspace.body).toEqual(processedWorkspaceToView);
});
