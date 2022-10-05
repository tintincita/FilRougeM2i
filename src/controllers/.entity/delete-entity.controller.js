const { message } = require("../../structures/messages.structure");

module.exports.deleteEntity = async (entity, model, request, response) => {
  try {
    const entityID = request.params.id;
    const entityToDelete = await model.findById(entityID);

    if (entityToDelete) {
      await model.findByIdAndRemove(entityID);
      response.send(entityToDelete);
    } else {
      response.send(message.error.deleteEntity(entity, entityID));
    }
  } catch (error) {
    response.status(500).send(error);
  }
};
