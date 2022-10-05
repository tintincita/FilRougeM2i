const userRouter = require("express").Router();
const readUsersController = require("../controllers/user/read.users.controller");
const readUserController = require("../controllers/user/read.user.controller");
const createUserController = require("../controllers/user/create.user.controller");
const updateUserController = require("../controllers/user/update.user.controller");
const deleteUserController = require("../controllers/user/delete.user.controller");

userRouter.post("/", createUserController.createUser);
userRouter.get("/", readUsersController.getAllUsers);
userRouter.get("/:id", readUserController.getUserByID);
userRouter.put("/:id", updateUserController.updateUserByID);
userRouter.delete("/:id", deleteUserController.deleteUserByID);

module.exports = userRouter;
