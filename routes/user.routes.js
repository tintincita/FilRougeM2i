const userRouter= require('express').Router();
const userController= require('../controllers/user.controller');

userRouter.post("/create",userController.createUser);

userRouter.get('/',userController.getAllUsers);
userRouter.get('/:id',userController.getUserByID);
userRouter.put('/:id', userController.updateUserByID);
userRouter.delete('/:id', userController.deleteUserByID);


module.exports = userRouter;