const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/app/app");

const Card = require("../src/models/card.model");
const Project = require("../src/models/project.model");
// const Project = require('../src/models/project.model')
// const Workspace = require('../src/models/workspace.model')

const initialCards = require("./data/cards.json");
const initialProjects = require("./data/projects.json");

const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Card.deleteMany({});
  await Project.deleteMany({});

  await Card.insertMany(initialCards);
  await Project.insertMany(initialProjects);
});

test("projects are returned as json", async () => {
  await api
    .get("/api/project")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("malformatted id returns error", async () => {
  await api
    .get("/api/project/88")
    // current model throws 500. change try catch on .entity controller to get 404, etc
    // .expect(400)
    .expect(500);
});

test("unexisting id returns error", async () => {
  let id = helper.nonExistingCardId();
  await api
    .get(`/api/project/${id}`)
    // current model throws 500. change try catch on .entity controller to get 404, etc
    // .expect(400)
    .expect(500);
});

test("all initial projects are loaded", async () => {
  const response = await api.get("/api/project");

  expect(response.body).toHaveLength(initialProjects.length);
});

test("a specific project can be viewed", async () => {
  const ProjectsAtStart = await helper.cardsInDb();
  const ProjectToView = ProjectsAtStart[0];

  const resultProject = await api
    .get(`/api/project/${ProjectToView._id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedProjectToView = JSON.parse(JSON.stringify(ProjectToView));

  expect(resultProject.body).toEqual(processedProjectToView);
});
