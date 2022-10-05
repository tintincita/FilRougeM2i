const { getBody } = require("../../structures/get-body.structure");
const { message } = require("../../structures/messages.structure");

module.exports.createEntity = (entity, model, request, response) => {
  try {
    const entityToCreate = new model(getBody(entity, request));

    if (entityToCreate) {
      model.create(entityToCreate, (error, entityToCreate) => {
        if (error) {
          response.status(500).send(message.error.createEntity(entity));
        } else {
          response.send(entityToCreate);
        }
      });
    } else {
      response.status(500).send(error);
    }
  } catch (error) {
    response.status(500).send(error);
  }
};
