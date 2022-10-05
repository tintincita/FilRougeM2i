const terminal = require("../../../middlewares/terminal.middlewares");

module.exports.createCardEffect = {
  Document: {
    outlinerCards: () => {
      terminal.log("outlinerCards");
    },
  },
};
