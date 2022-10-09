const Document = require("../../../../models/document.model");
const Project = require("../../../../models/project.model");
const {CRUD} = require("../../../../structures/crud.structure");

const terminal = require("../../../../middlewares/terminal.middlewares");
const { message } = require("../../../../structures/messages.structure");

module.exports.projectDocuments = async (project, documentID) => {
  try {
    project.documents = project.documents.concat(documentID);
    terminal.log(
      message.success.fieldUpdate(
        CRUD.Create,
        Document.modelName,
        "documents",
        Project.modelName
      )
    );
  } catch (error) {
    terminal.log(error);
  }
}