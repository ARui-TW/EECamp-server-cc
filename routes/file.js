import express from 'express';
import controller from '../controller';
import authentication from '../middleware/auth';

const fileRouter = express.Router();

fileRouter.post('/upload', authentication(true), controller.file.upload);
fileRouter.post('/save', controller.file.save);
fileRouter.post('/getFiles', controller.file.getFiles);
fileRouter.post('/getFile', controller.file.getFile);
fileRouter.post('/removeFile', authentication(true), controller.file.removeFile);

// FIXME: Not sure if it is necessarily
// fileRouter.post('/modifyFile', controller.file.modifyFile);

export default fileRouter;
