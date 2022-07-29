const userRouter= require('express').Router();
const userController= require('../controllers/user.controller');

userRouter.post("/create",userController.create);

userRouter.get('/',userController.getAllUsers);
userRouter.get('/:id',userController.userInfo);


module.exports = userRouter;