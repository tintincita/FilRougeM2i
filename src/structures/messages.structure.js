module.exports.message = {
  error: {
    createEntity: (entity) => {
      return `Error: Can't create ${entity}.`;
    },
    readEntities: (entity) => {
      return `Error: ${entity}s not found.`;
    },
    readEntity: (entity, entityID) => {
      return `Error: ${entity} not found: "${entityID}".`;
    },
    deleteEntity: (entity, entityID) => {
      return `Error: ${entity} can't be deleted: "${entityID}".`;
    },
  },
};
