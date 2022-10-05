const Document = require("../../../models/document.model");
const terminal = require("../../../middlewares/terminal.middlewares");

module.exports.createCardEffect = {
  Document: {
    outlinerCards: async (entity, entityID, documentID, response) => {
      if (entity) {
        documentID = documentID.toString();

        const document = await Document.findById(documentID);

        if (document) {
          document.outlinerCards = document.outlinerCards.concat(entityID);
          try {
            await document.save();
          } catch (error) {
            response.status(500).send(error);
          }
        }
      }
    },
  },
};
