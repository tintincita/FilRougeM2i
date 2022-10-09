const Project = require("../../../../models/project.model");
const Workspace = require("../../../../models/workspace.model");
const {CRUD} = require("../../../../structures/crud.structure");

const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.workspaceProjects = async (workspace, projectID) => {
  try {
    workspace.projects = workspace.projects.concat(projectID);
    terminal.log(
      message.success.fieldUpdate(
        CRUD.Create,
        Project.modelName,
        "projects",
        Workspace.modelName
      )
    );
  } catch (error) {
    terminal.log(error);
  }
}