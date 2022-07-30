module.exports.info = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

module.exports.error = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params);
  }
};
