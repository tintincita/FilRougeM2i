const { Entity } = require("../entities/list.entities");

module.exports.getBody = (entity, request) => {
  if (entity === Entity.User)
    return {
      firstName: request.body.firstName || "",
      lastName: request.body.lastName || "",
      userName: request.body.userName,
      email: request.body.email || "",
      password: request.body.password || "",
    };

  if (entity === Entity.Workspace)
    return {
      owner: request.body.owner,
      title: request.body.title || "Workspace",
      projects: request.body.projects || [],
    };

  if (entity === Entity.Project)
    return {
      workspace: request.body.workspace,
      title: request.body.title || "Project",
      documents: request.body.documents || [],
    }

  if (entity === Entity.Document)
    return {
      workspace: request.body.workspace,
      title: request.body.title || "Workspace",
      outlinerCards: request.body.outlinerCards || [],
      editorCards: request.body.editorCards || [],
    };

  if (entity === Entity.Card)
    return {
      title: request.body.title || "Title",
      content: request.body.content || "Content",
      document: request.body.document,
    };
};
