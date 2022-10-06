const { Entity } = require("./entities.structure");

module.exports.getBody = (entity, request) => {
  if (entity === Entity.User)
    return {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      userName: request.body.userName,
      email: request.body.email,
      password: request.body.password,
    };

  if (entity === Entity.Workspace)
    return {
      owner: request.body.owner,
      title: request.body.title,
      projects: request.body.projects,
    };

  if (entity === Entity.Project)
    return {
      workspace: request.body.workspace,
      title: request.body.title,
      documents: request.body.documents,
    };

  if (entity === Entity.Document)
    return {
      workspace: request.body.workspace,
      title: request.body.title,
      outlinerCards: request.body.outlinerCards,
      editorCards: request.body.editorCards,
    };

  if (entity === Entity.Card)
    return {
      title: request.body.title,
      content: request.body.content,
      document: request.body.document,
    };
};
