const projectRouter = require("express").Router();
const createProjectController = require("../controllers/project/create-project/create-project.controller");
const readProjectsController = require("../controllers/project/read-projects/read-projects.controller");
const readProjectController = require("../controllers/project/read-project/read-project.controller");
const deleteProjectController = require("../controllers/project/delete-project/delete-project.controller");
const updateProjectController = require("../controllers/project/update-project/update-project.controller");

projectRouter.post("/", createProjectController.createProject);
projectRouter.get("/", readProjectsController.getAllProjects);
projectRouter.get("/:id", readProjectController.getProjectByID);
projectRouter.delete("/:id", deleteProjectController.deleteProjectByID);
projectRouter.put("/:id", updateProjectController.updateProjectByID);

module.exports = projectRouter;
