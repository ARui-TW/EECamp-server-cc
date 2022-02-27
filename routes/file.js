import express from 'express';
import controller from '../controller';

const fileRouter = express.Router();

fileRouter.post('/upload', controller.file.upload);
fileRouter.post('/getFiles', controller.file.getFiles);
fileRouter.post('/getFile', controller.file.getFile);
fileRouter.post('/removeFile', controller.file.removeFile);

// FIXME: Not sure if it is necessarily
// fileRouter.post('/modifyFile', controller.file.modifyFile);

export default fileRouter;
