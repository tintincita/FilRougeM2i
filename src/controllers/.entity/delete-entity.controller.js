const message = require("../../structures/messages.structure");

module.exports.deleteEntityByID = async (entity, model, request, response) => {
  try {
    const entityID = request.params.id;
    const deletedEntity = await model.findById(entityID);

    await model.findByIdAndRemove(entityID);
    response.send(message.deleteEntityByID(entity, deletedEntity));
  } catch (error) {
    response.status(500).send(error);
  }
};
