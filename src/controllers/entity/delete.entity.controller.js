const message = require("../../messages/delete_entity_by_id.message");

module.exports.deleteEntityByID = async (entity, model, request, response) => {
  try {
    const entityID = request.params.id;
    const deletedEntity = await model.findById(entityID);

    await model.findByIdAndRemove(entityID);
    response.send(message.deleteEntityByID(entity, deletedEntity));
  } catch (error) {
    response.status(500).send(error);
  }
};
