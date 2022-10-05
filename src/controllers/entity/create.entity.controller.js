const { getBody } = require("../../bodies/entities.body");

module.exports.createEntity = (entity, model, request, response) => {
  const newEntity = new model(getBody(entity, request));

  model.create(newEntity, (error, newEntity) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(newEntity);
    }
  });
};
