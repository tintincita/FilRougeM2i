const Document = require("../../../models/document.model");

// It seems that a document version (document.__v) can only be updated once per request
// hence all the mechanics around the document save.
// Check commented section starting by "// Save document - Begin" and finishing by "// Save document - End".

module.exports.createCardEffect = {
  Document: {
    effects: 2,
    effectsCounter: 0,

    outlinerCards: async (entity, entityID, documentID) => {
      if (entity) {
        documentID = documentID.toString();
        const document = await Document.findById(documentID);

        if (document) {
          document.outlinerCards = document.outlinerCards.concat(entityID);

          // Save document - Begin
          const effects = this.createCardEffect.Document.effects;
          this.createCardEffect.Document.effectsCounter++;
          const __v = document.__v;

          if (this.createCardEffect.Document.effectsCounter < effects) {
            document.__v = __v;
            await document.save();
          }

          if (this.createCardEffect.Document.effectsCounter === effects) {
            document.__v = __v + 1;
            await document.save();
            this.createCardEffect.Document.effectsCounter = 0;
          }
          // Save document - End
        }
      }
    },

    editorCards: async (entity, entityID, documentID) => {
      if (entity) {
        documentID = documentID.toString();
        const document = await Document.findById(documentID);

        if (document) {
          document.editorCards = document.editorCards.concat(entityID);

          // Save document - Begin
          const effects = this.createCardEffect.Document.effects;
          this.createCardEffect.Document.effectsCounter++;
          const __v = document.__v;

          if (this.createCardEffect.Document.effectsCounter < effects) {
            document.__v = __v;
            await document.save();
          }

          if (this.createCardEffect.Document.effectsCounter === effects) {
            document.__v = __v + 1;
            await document.save();
            this.createCardEffect.Document.effectsCounter = 0;
          }
          // Save document - End
        }
      }
    },
    //
    // Next effects...
    //
  },
};
