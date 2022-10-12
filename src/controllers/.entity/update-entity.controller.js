const { Entity } = require("../../structures/entities.structure");
const { getBody } = require("../../structures/get-body.structure");
const { message } = require("../../structures/messages.structure");

module.exports.updateEntity = async (model, request, response) => {
  try {
    const entityID = request.params.id;

    if (model.modelName === Entity.Document) {
      try {
        const updatedEntity = await model
          .findByIdAndUpdate(entityID, getBody(model.modelName, request), {
            new: true,
          })
          .populate("outlinerCards")
          .populate("editorCards");

        response.status(202).json(updatedEntity);
      } catch (error) {
        response
          .status(400)
          .send(message.error.updateEntity(model.modelName, entityID, error));
      }
    } else {
      try {
        const updatedEntity = await model.findByIdAndUpdate(
          entityID,
          getBody(model.modelName, request),
          {
            new: true,
          }
        );
        response.status(202).json(updatedEntity);
      } catch (error) {
        response
          .status(400)
          .send(message.error.updateEntity(model.modelName, entityID, error));
      }
    }
  } catch (error) {
    response.status(500).send(error);
  }
};
