module.exports.message = {
  success: {
    deleteEntity: (modelName, entity) => {
      return `Success: ${modelName} deleted: "${entity}".`;
    },
    deleteEntities: (modelName, numberOfEntities) => {
      return `Success: ${numberOfEntities} ${modelName}s deleted.`;
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
    updateEntity: (modelName, entityID) => {
      return `Error: ${modelName} can't be updated: "${entityID}".`;
    },    
    deleteEntity: (modelName, entityID) => {
      return `Error: ${modelName} can't be deleted: "${entityID}".`;
    },
    deleteEntities: (modelName) => {
      return `Error: ${modelName}s can't be deleted.`;
    },
  },
};
