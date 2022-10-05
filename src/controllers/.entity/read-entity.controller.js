const { message } = require("../../structures/messages.structure");

module.exports.readEntity = async (entity, model, request, response) => {
  try {
    const entityID = request.params.id;
    const entityToRead = await model.findById(entityID);
    
    if (entityToRead) {
      response.send(entityToRead);
    } else {
      response.status(404).send(message.error.readEntity(entity, entityID));
    }
  } catch (error) {
    response.status(500).send(error);
  }
};
