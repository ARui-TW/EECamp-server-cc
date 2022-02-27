import express from 'express';
import controller from '../controller';

const photoRouter = express.Router();

photoRouter.post('/upload', controller.photo.upload);
photoRouter.post('/getPhotos', controller.photo.getPhotos);
photoRouter.post('/getPhoto', controller.photo.getPhoto);
photoRouter.post('/removePhoto', controller.photo.removePhoto);

// FIXME: Not sure if it is necessarily
// photoRouter.post('/modifyPhoto', controller.photo.modifyPhoto);

export default photoRouter;
