import express from "express";
import userController from "../../controller/user.js";

const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/getCurrentUser", userController.getCurrentUser);
userRouter.post("/login", userController.login);
userRouter.post("/getUser", userController.getUser);
userRouter.post("/getUsers", userController.getUsers);
userRouter.post("/removeUser", userController.removeUser);
userRouter.post("/removeUsers", userController.removeUsers);

export default userRouter;
