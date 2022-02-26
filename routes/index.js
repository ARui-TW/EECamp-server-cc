import express from 'express';
import cors from 'cors';
import userRouter from './user';
import webRouter from './web';

const router = express.Router();

router.use(cors());

router.use('/user', userRouter);
router.use('/web', webRouter);

export default router;
