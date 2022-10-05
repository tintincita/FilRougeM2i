const terminal = require("../../../middlewares/terminal.middlewares")

module.exports.createCardEffect = {
  Document: {
    outlinerCards: async (entity, documentID) => {
      if (entity){
        const document = await model.findById(documentID);
        
        if (document){
          terminal.log()
        }
      }
    },
  },
};
