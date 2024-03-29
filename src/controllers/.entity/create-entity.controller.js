const { message } = require("../../structures/messages.structure");

module.exports.createEntity = async (model, entity, response) => {
  try {
    if (entity) {
      await model.create(entity, (error, newEntity) => {
        if (error) {
          response
            .status(500)
            .send(message.error.createEntity(model.modelName, error));
        } else {
          response.send(newEntity);
        }
      });
    } else {
      response.status(500).send(message.error.readEntity(model.modelName, entity.id, error));
    }
  } catch (error) {
    response.status(500).send(error);
  }
};
