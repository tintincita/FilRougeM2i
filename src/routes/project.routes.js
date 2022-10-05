const projectRouter = require("express").Router();
const createProjectController = require("../controllers/project/create-project/create-project.controller");
const readProjectsController = require("../controllers/project/read-projects/read-projects.controller");
const readProjectController = require("../controllers/project/read-project/read-project.controller");
const updateProjectController = require("../controllers/project/update-project/update-project.controller");
const deleteProjectController = require("../controllers/project/delete-project/delete-project.controller");

projectRouter.post("/", createProjectController.createProject);
projectRouter.get("/", readProjectsController.readProjects);
projectRouter.get("/:id", readProjectController.readProject);
projectRouter.put("/:id", updateProjectController.updateProject);
projectRouter.delete("/:id", deleteProjectController.deleteProject);

module.exports = projectRouter;
