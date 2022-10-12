const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/app/app");

const Card = require("../src/models/card.model");
const User = require("../src/models/user.model");
// const Project = require('../src/models/project.model')
// const Workspace = require('../src/models/workspace.model')

const initialCards = require("./data/cards.json");
const initialUsers = require("./data/users.json");

const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Card.deleteMany({});
  await User.deleteMany({});

  await Card.insertMany(initialCards);
  await User.insertMany(initialUsers);
});

test("users are returned as json", async () => {
  await api
    .get("/api/user")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("malformatted id returns error", async () => {
  await api
    .get("/api/user/88")
    // current model throws 500. change try catch on .entity controller to get 404, etc
    // .expect(400)
    .expect(500);
});

test("unexisting id returns error", async () => {
  let id = helper.nonExistingCardId();
  await api
    .get(`/api/user/${id}`)
    // current model throws 500. change try catch on .entity controller to get 404, etc
    // .expect(400)
    .expect(500);
});

test("all initial users are loaded", async () => {
  const response = await api.get("/api/user");

  expect(response.body).toHaveLength(initialUsers.length);
});

test("a specific user can be viewed", async () => {
  const UsersAtStart = await helper.cardsInDb();
  const UserToView = UsersAtStart[0];

  const resultUser = await api
    .get(`/api/user/${UserToView._id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedUserToView = JSON.parse(JSON.stringify(UserToView));

  expect(resultUser.body).toEqual(processedUserToView);
});
