const workspaceRouter = require("express").Router();
const createWorkspaceController = require("../controllers/workspace/create-workspace/create-workspace.controller");
const readWorkspacesController = require("../controllers/workspace/read-workspaces/read-workspaces.controller");
const readWorkspaceController = require("../controllers/workspace/read-workspace/read-workspace.controller");
const deleteWorkspaceController = require("../controllers/workspace/delete-workspace/delete-workspace.controller");
const updateWorkspaceController = require("../controllers/workspace/update-workspace/update-workspace.controller");

workspaceRouter.post("/", createWorkspaceController.createWorkspace);
workspaceRouter.get("/", readWorkspacesController.getAllWorkspaces);
workspaceRouter.get("/:id", readWorkspaceController.getWorkspaceByID);
workspaceRouter.delete("/:id", deleteWorkspaceController.deleteWorkspaceByID);
workspaceRouter.put("/:id", updateWorkspaceController.updateWorkspaceByID);

module.exports = workspaceRouter;
