module.exports.getEntityByID = async (model, request, response) => {
  try {
    const entityID = request.params.id;
    const entity = await model.findById(entityID);
    response.send(entity);
  } catch (error) {
    response.status(500).send(error);
  }
}
