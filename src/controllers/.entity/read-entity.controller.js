const { message } = require("../../structures/messages.structure");

module.exports.getEntityByID = async (entity, model, request, response) => {
  try {
    const entityID = request.params.id;
    const entityToRead = await model.findById(entityID);
    
    if (entityToRead) {
      response.send(entityToRead);
    } else {
      response.status(404).send(message.error.notFound(entity, entityID));
    }
  } catch (error) {
    response.status(500).send(error);
  }
};
