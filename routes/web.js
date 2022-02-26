import express from 'express';
import controller from '../controller';

const webRouter = express.Router();

webRouter.post('/getWebsite', controller.web.getWebsite);
webRouter.post('/modifyWebsite', controller.web.modifyWebsite);
webRouter.post('/createWebsite', controller.web.createWebsite);

export default webRouter;
