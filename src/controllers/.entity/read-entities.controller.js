const { message } = require("../../structures/messages.structure");

module.exports.readEntities = async (model, entities, response) => {
  try {
    if (entities) {
      response.json(entities);
    } else {
      response.status(500).json(message.error.readEntities(model.modelName));
    }
  } catch (error) {
    response.status(500).json(error);
  }
};
