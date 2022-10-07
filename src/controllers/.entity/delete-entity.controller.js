const { message } = require("../../structures/messages.structure");

module.exports.deleteEntity = async (model, entityID, response) => {
  try {
    await model.findByIdAndRemove(entityID);
    response.send(message.success.deleteEntity(model.modelName, entityID));
  } catch (error) {
    response.status(500).send(error);
  }
};
