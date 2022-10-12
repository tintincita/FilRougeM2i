const { message } = require("../../structures/messages.structure");

module.exports.deleteEntity = async (model, request, response) => {
  try {
    const entityID = request.params.id;
    await model.findByIdAndRemove(entityID);
    response.status(204).send(message.success.deleteEntity(model.modelName, entityID));
  } catch (error) {
    response.status(404).send(error);
  }
};
