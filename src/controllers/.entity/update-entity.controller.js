const { Entity } = require("../../structures/entities.structure");
const { getBody } = require("../../structures/get-body.structure");
const { message } = require("../../structures/messages.structure");

module.exports.updateEntity = async (model, request, response) => {
  try {
    const entityID = request.params.id;

    if (model.modelName === Entity.Document) {
      const updatedEntity = await model
        .findByIdAndUpdate(entityID, getBody(model.modelName, request), {
          new: true,
        })
        .populate("outlinerCards")
        .populate("editorCards");

      if (updatedEntity) {
        response.json(updatedEntity);
      } else {
        response
          .status(400)
          .send(message.error.updateEntity(model.modelName, entityID));
      }
    } else {
      const updatedEntity = await model.findByIdAndUpdate(
        entityID,
        getBody(model.modelName, request),
        {
          new: true,
        }
      );

      if (updatedEntity) {
        response.json(updatedEntity);
      } else {
        response
          .status(400)
          .send(message.error.updateEntity(model.modelName, entityID));
      }
    }
  } catch (error) {
    response.status(500).send(error);
  }
};
