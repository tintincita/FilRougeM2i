const { message } = require("../../structures/messages.structure");

module.exports.readEntity = async (model, request, response) => {
  try {
    const entityID = request.params.id;
    const entityToRead = await model.findById(entityID);

    if (entityToRead) {
      response.send(entityToRead);
    } else {
      response.status(404).send(message.error.readEntity(model, entityID));
    }
  } catch (error) {
    response.status(500).send(error);
  }
};
