module.exports.message = {
  success: {
    deleteEntity: (modelName, entity) => {
      return `Success: ${modelName} deleted: "${entity}".`;
    },
    deleteEntities: (modelName, numberOfEntities) => {
      return `Success: ${numberOfEntities} ${modelName}s deleted.`;
    },
    fieldUpdate: (context, entityModelName, fieldName, updatedModelName) => {
      return `Success: ${context} ${entityModelName} : Field ${fieldName} in ${updatedModelName} updated.`;
    },
  },
  error: {
    createEntity: (modelName, error) => {
      return `Error: Can't create ${modelName}. ${error}`;
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
