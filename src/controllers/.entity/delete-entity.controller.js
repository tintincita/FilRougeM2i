const { message } = require("../../structures/messages.structure");

module.exports.deleteEntity = async (model, entity, entityID, response) => {
  try {
    if (entity) {
      await model.findByIdAndRemove(entityID);
      response.send(message.success.deleteEntity(model.modelName, entity));
    } else {
      response.send(message.error.deleteEntity(model.modelName, entityID));
    }
  } catch (error) {
    response.status(500).send(error);
  }
};
