const Document = require("../../../../models/document.model");
const Project = require("../../../../models/project.model");
const { projectDocuments } = require("../effects/project.documents.effect");

// The use of a terminal log is required here.
// Only one response can be send to the client,
// in our case the final response is send from the entity controller.
const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.createDocumentEffects = async (entity) => {
  try {
    if (entity) {
      const projectID = entity.project.toString();
      const project = await Project.findById(projectID);
      
      const documentID = entity._id.toString();

      if (project) {

        projectDocuments(project, documentID);

        // Document save can only be done once per request
        project.save();
        //
      } else {
        terminal.log(message.error.readEntity(Document.modelName, documentID));
      }
    }
  } catch (error) {
    terminal.log(error);
  }
};
