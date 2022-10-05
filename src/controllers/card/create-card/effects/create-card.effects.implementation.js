const outlinerCards = async (entity, entityID, documentID) => {
  if (entity) {
    documentID = documentID.toString();
    const document = await Document.findById(documentID);
    if (document) {
      document.outlinerCards = document.outlinerCards.concat(entityID);

      // Save document
      const effects = this.createCardEffect.Document.effects;
      this.createCardEffect.Document.effectsCounter++;
      if (this.createCardEffect.Document.effectsCounter < effects) {
        const __v = document.__v;
        document.__v = __v;
        await document.save();
      }
      if (this.createCardEffect.Document.effectsCounter === effects){
        const __v = document.__v + 1;
        document.__v = __v;
        await document.save();
        this.createCardEffect.Document.effectsCounter = 0;            
      }
    }
  }
}

const editorCards