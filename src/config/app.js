const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./config");
const logger = require("../utils/logger");
const middleware = require("../middlewares/middlewares");

const userRouter = require("../routes/user.routes");
const cardRouter = require("../routes/card.routes");
const documentRouter = require("../routes/document.routes");

const app = express();

logger.info("connecting to", config.MONGO_URI);

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to DB");
  })
  .catch((err) => {
    logger.error("Error connecting to DB", err.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
// app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.use("/api/card", cardRouter);
app.use("/api/document", documentRouter);
app.use("/api/user", userRouter);

module.exports = app;
