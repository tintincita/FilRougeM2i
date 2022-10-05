module.exports.message = {
  success: {
    deleteEntity: (modelName, entity) => {
      return `Success: ${modelName} deleted: ${entity}`;
    },
  },
  error: {
    createEntity: (modelName) => {
      return `Error: Can't create ${modelName}.`;
    },
    readEntities: (modelName) => {
      return `Error: ${modelName}s not found.`;
    },
    readEntity: (modelName, entityID) => {
      return `Error: ${modelName} not found: "${entityID}".`;
    },
    deleteEntity: (modelName, entityID) => {
      return `Error: ${modelName} can't be deleted: "${entityID}".`;
    },
  },
};
