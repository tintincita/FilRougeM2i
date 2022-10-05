const workspaceRouter = require("express").Router();
const createWorkspaceController = require("../controllers/workspace/create-workspace/create-workspace.controller");
const readWorkspacesController = require("../controllers/workspace/read-workspaces/read-workspaces.controller");
const readWorkspaceController = require("../controllers/workspace/read-workspace/read-workspace.controller");
const updateWorkspaceController = require("../controllers/workspace/update-workspace/update-workspace.controller");
const deleteWorkspaceController = require("../controllers/workspace/delete-workspace/delete-workspace.controller");

workspaceRouter.post("/", createWorkspaceController.createWorkspace);
workspaceRouter.get("/", readWorkspacesController.readWorkspaces);
workspaceRouter.get("/:id", readWorkspaceController.readWorkspace);
workspaceRouter.put("/:id", updateWorkspaceController.updateWorkspace);
workspaceRouter.delete("/:id", deleteWorkspaceController.deleteWorkspace);

module.exports = workspaceRouter;
