const Project = require("../../../../models/project.model");
const Workspace = require("../../../../models/workspace.model");
const {CRUD} = require("../../../../structures/crud.structure");

const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.workspaceProjects = async (projectID) => {
  await Workspace.updateOne(
    { projects: projectID },
    { $pull: { projects: projectID } }
  );
  terminal.log(
    message.success.fieldUpdate(CRUD.Delete, Project.modelName, "projects", Workspace.modelName)
  );  
};
