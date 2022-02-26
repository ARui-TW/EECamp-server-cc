import express from 'express';
import userController from '../controller/user';
import authentication from '../middleware/auth';

const userRouter = express.Router();

// userRouter.post('/register', userController.register);
// userRouter.post('/getCurrentUser', authentication(), userController.getCurrentUser);
// userRouter.post('/login', userController.login);
// userRouter.post('/modifyCurrentUser', authentication(), userController.modifyCurrentUser);
// userRouter.post('/getUser', userController.getUser);
// userRouter.post('/getUsers', userController.getUsers);
// userRouter.post('/getUsersStatus', userController.getUsersStatus);
// userRouter.post('/removeUser', userController.removeUser);
// userRouter.post('/removeUsers', userController.removeUsers);

export default userRouter;
