import express from 'express';
import controller from '../controller';

const photoRouter = express.Router();

photoRouter.post('/upload', controller.photo.upload);

export default photoRouter;
