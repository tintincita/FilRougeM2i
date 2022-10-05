const { message } = require("../../structures/messages.structure");

module.exports.getAllEntities = async (model, response) => {
  try {
    const entitiesToRead = await model.find({});

    if (entitiesToRead) {
      response.json(entitiesToRead);
    } else {
      response.status(500).json(message.error.readEntities(entity));
    }
  } catch (error) {
    response.status(500).json(error);
  }
};
