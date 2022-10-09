const Project = require("../../../../models/project.model");
const Workspace = require("../../../../models/workspace.model");
const { workspaceProjects } = require("./workspace.projects.effect");

// The use of a terminal log is required here.
// Only one response can be send to the client,
// in our case the final response is send from the entity controller.
const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.createProjectEffects = async (entity) => {
  try {
    if (entity) {
      const workspaceID = entity.workspace.toString();
      const workspace = await Workspace.findById(workspaceID);

      const projectID = entity._id.toString();

      if (workspace) {
        workspaceProjects(workspace, projectID);

        // Document save can only be done once per request
        workspace.save();
        //
      } else {
        terminal.log(message.error.readEntity(Project.modelName, projectID));
      }
    }
  } catch (error) {
    terminal.log(error);
  }
};
