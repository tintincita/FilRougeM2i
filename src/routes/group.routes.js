const groupRouter = require("express").Router();
const groupController = require("../controllers/group.controller");

groupRouter.get("/", groupController.getAllGroups);
groupRouter.get("/:id", groupController.getGroupByID);
groupRouter.post("/", groupController.createGroup);
groupRouter.put("/:id", groupController.updateGroupByID);
groupRouter.delete("/:id", groupController.deleteGroupByID);

module.exports = groupRouter;
