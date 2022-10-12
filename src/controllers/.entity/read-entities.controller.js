const { message } = require("../../structures/messages.structure");

module.exports.readEntities = async (model, response) => {
  try {
    const entities = await model.find({});
    if (entities) {
      response.json(entities);
    } else {
      response.status(400).json(message.error.readEntities(model.modelName, error));
    }
  } catch (error) {
    response.status(404).send(error);
  }
};
