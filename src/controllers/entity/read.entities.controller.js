module.exports.getAllEntities = async (model, response) => {
  try {
    const entities = await model.find({});
    response.json(entities);
  } catch (error) {
    response.status(500).json(error);
  }
};
