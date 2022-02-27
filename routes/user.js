import express from 'express';
import userController from '../controller/user';
import authentication from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/getCurrentUser', authentication(), userController.getCurrentUser);
userRouter.post('/login', userController.login);
userRouter.post('/modifyCurrentUser', authentication(), userController.modifyCurrentUser);
userRouter.post('/modifyUser', authentication(true), userController.modifyUser);
userRouter.post('/getUser', authentication(true), userController.getUser);
userRouter.post('/getUsers', authentication(true), userController.getUsers);
userRouter.post('/getUsersStatus', userController.getUsersStatus);
userRouter.post('/removeUser', authentication(true), userController.removeUser);
userRouter.post('/removeUsers', authentication(true), userController.removeUsers);

export default userRouter;
