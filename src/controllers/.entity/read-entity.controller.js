const { message } = require("../../structures/messages.structure");

module.exports.readEntity = async (model, entity, entityID, response) => {
  try {
    if (entity) {
      response.send(entity);
    } else {
      response.status(404).send(message.error.readEntity(model.modelName, entityID));
    }
  } catch (error) {
    response.status(500).send(error);
  }
};
