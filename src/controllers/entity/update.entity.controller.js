const { getBody } = require("../../bodies/entities.body");

module.exports.updateEntityByID = async (entity, model, request, response) => {
  try {
    const entityID = request.params.id;

    await model.findByIdAndUpdate(entityID, getBody(entity, request));
    const updatedEntity = await model.findById(entityID);
    response.send(updatedEntity);
  } catch (error) {
    response.status(500).send(error);
  }
};
