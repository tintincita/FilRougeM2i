const { message } = require("../../structures/messages.structure");

module.exports.updateEntity = async (model, entity, entityID, response) => {
  try {
    if (entity) {
      const updatedEntity = await model.findById(entityID);
      response.send(updatedEntity);
    } else {
      response
        .status(404)
        .send(message.error.readEntity(model.modelName, entityID));
    }
  } catch (error) {
    response.status(500).send(error);
  }
};
