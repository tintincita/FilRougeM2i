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
    readEntities: (modelName, error) => {
      return `Error: ${modelName}s not found. ${error}`;
    },
    readEntity: (modelName, entityID, error) => {
      return `Error: ${modelName} not found: "${entityID}". ${error}`;
    },
    updateEntity: (modelName, entityID, error) => {
      return `Error: ${modelName} can't be updated: "${entityID}". ${error}`;
    },    
    deleteEntity: (modelName, entityID, error) => {
      return `Error: ${modelName} can't be deleted: "${entityID}". ${error}`;
    },
    deleteEntities: (modelName, error) => {
      return `Error: ${modelName}s can't be deleted. ${error}`;
    },
  },
};
