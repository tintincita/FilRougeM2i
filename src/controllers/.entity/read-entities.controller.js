const { message } = require("../../structures/messages.structure");

module.exports.readEntities = async (model, response) => {
  try {
    const entities = await model.find({});
    if (entities) {
      response.json(entities);
    } else {
      response.status(500).json(message.error.readEntities(model.modelName));
    }
  } catch (error) {
    response.status(500).send(error);
  }
};
