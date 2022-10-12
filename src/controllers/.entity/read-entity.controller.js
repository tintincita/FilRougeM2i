const { Entity } = require("../../structures/entities.structure");
const { message } = require("../../structures/messages.structure");

module.exports.readEntity = async (model, request, response) => {
  try {
    const entityID = request.params.id;

    if (model.modelName === Entity.Document) {
      try {
        const entityToRead = await model
          .findById(entityID)
          .populate("outlinerCards")
          .populate("editorCards");

        response.send(entityToRead);
      } catch(error) {
        response.status(404).send(message.error.readEntity(model, entityID, error));
      }
    } else {
      try {
        const entityToRead = await model.findById(entityID);
        response.send(entityToRead);
      } catch(error) {
        response.status(404).send(message.error.readEntity(model, entityID, error));
      }
    }
  } catch (error) {
    response.status(500).send(error);
  }
};
