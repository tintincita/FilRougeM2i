const userRouter = require("express").Router();
const createUserController = require("../controllers/user/create-user/create-user.controller");
const readUsersController = require("../controllers/user/read-users/read-users.controller");
const readUserController = require("../controllers/user/read-user/read-user.controller");
const updateUserController = require("../controllers/user/update-user/update-user.controller");
const deleteUserController = require("../controllers/user/delete-user/delete-user.controller");

userRouter.post("/", createUserController.createUser);
userRouter.get("/", readUsersController.readUsers);
userRouter.get("/:id", readUserController.readUser);
userRouter.put("/:id", updateUserController.updateUser);
userRouter.delete("/:id", deleteUserController.deleteUser);

module.exports = userRouter;
