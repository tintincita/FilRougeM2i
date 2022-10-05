const mongoose = require("mongoose");
const config = require("../config/config");

module.exports.connect = (database) => {
  if (database === "MongoDB") {
    console.log("connecting to", config.MONGO_URI);
    mongoose
      .connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((err) => {
        console.log("Error connecting to DB", err.message);
      });
  }
};
