const { Entity } = require("../../../structures/entities.structure");
const Document = require("../../../models/document.model");

// The use of a terminal log is required here.
// Only one response can be send to the client,
// in our case the final response is send from the entity controller.
const terminal = require("../../../middlewares/terminal.middlewares");

module.exports.createCardEffects = async (
  modelName,
  entity,
  documentID,
  cardID
) => {
  if (modelName === Entity.Document && entity) {
    try {
      documentID = documentID.toString();
      const document = await Document.findById(documentID);

      if (document) {
        document.outlinerCards = document.outlinerCards.concat(cardID);

        document.editorCards = document.editorCards.concat(cardID);

        // Document save can only be done once per request
        document.save();
      } else {
        terminal.log(message.error.readEntity(modelName, documentID));
      }
    } catch (error) {
      terminal.log(error);
    }
  }
};

// It seems that a document version (document.__v) can only be updated once per request
// hence all the mechanics around the document save.
// Check commented section starting by "// Save document - Begin" and finishing by "// Save document - End".

// module.exports.createCardEffect = {
//   Document: {
//     effects: 1,
//     effectsCounter: 0,

//     outlinerCards: async (entity, entityID, documentID) => {
//       if (entity) {
//         documentID = documentID.toString();
//         const document = await Document.findById(documentID);

//         if (document) {
//           document.outlinerCards = document.outlinerCards.concat(entityID);

//           // Save document - Begin
//           const effects = this.createCardEffect.Document.effects;
//           this.createCardEffect.Document.effectsCounter++;
//           const __v = document.__v;

//           if (this.createCardEffect.Document.effectsCounter < effects) {
//             document.__v = __v;
//             await document.save();
//           }

//           if (this.createCardEffect.Document.effectsCounter === effects) {
//             document.__v = __v + 1;
//             await document.save();
//             this.createCardEffect.Document.effectsCounter = 0;
//           }
//           // Save document - End
//         }
//       }
//     },

//     editorCards: async (entity, entityID, documentID) => {
//       if (entity) {
//         documentID = documentID.toString();
//         const document = await Document.findById(documentID);

//         if (document) {
//           document.editorCards = document.editorCards.concat(entityID);

//           // Save document - Begin
//           const effects = this.createCardEffect.Document.effects;
//           this.createCardEffect.Document.effectsCounter++;
//           const __v = document.__v;

//           if (this.createCardEffect.Document.effectsCounter < effects) {
//             document.__v = __v;
//             await document.save();
//           }

//           if (this.createCardEffect.Document.effectsCounter === effects) {
//             document.__v = __v + 1;
//             await document.save();
//             this.createCardEffect.Document.effectsCounter = 0;
//           }
//           // Save document - End
//         }
//       }
//     },
//     //
//     // Next effects...
//     //
//   },
// };
