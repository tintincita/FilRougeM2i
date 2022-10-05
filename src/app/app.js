const express = require("express");
const cors = require("cors");

const userRouter = require("../routes/user.routes");
const workspaceRouter = require("../routes/workspace.routes");
const projectRouter = require("../routes/project.routes");
const documentRouter = require("../routes/document.routes");
const cardRouter = require("../routes/card.routes");

const { connect } = require("../database/connect.database");

const app = express();

connect("MongoDB");

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/workspace", workspaceRouter);
app.use("/api/project", projectRouter);
app.use("/api/document", documentRouter);
app.use("/api/card", cardRouter);

module.exports = app;
