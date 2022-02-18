import express from "express";
import userController from "../../controller/user.js";
import authentication from "../../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post(
    "/getCurrentUser",
    authentication(),
    userController.getCurrentUser
);
userRouter.post("/login", userController.login);
userRouter.post(
    "/modifyCurrentUser",
    authentication(),
    userController.modifyCurrentUser
);
userRouter.post("/getUser", userController.getUser);
userRouter.post("/getUsers", userController.getUsers);
userRouter.post("/removeUser", userController.removeUser);
userRouter.post("/removeUsers", userController.removeUsers);

export default userRouter;
