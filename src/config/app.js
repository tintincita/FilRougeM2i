const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");

const logger = require("../utils/logger");
const config = require("./config");
const middleware = require("../utils/middleware");

const userRouter = require("../routes/user.routes");
const cardRouter = require("../routes/card.routes");
const documentRouter = require("../routes/document.routes");

logger.info("connecting to", config.MONGO_URI);

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("connected to db");
  })
  .catch((err) => {
    logger.error("Error connecting to db", err.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/card", cardRouter);
app.use("/api/document", documentRouter);
app.use("/api/user", userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
