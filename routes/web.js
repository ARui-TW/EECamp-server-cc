import express from 'express';
import controller from '../controller';
import authentication from '../middleware/auth';

const webRouter = express.Router();

webRouter.post('/getWebsite', controller.web.getWebsite);
webRouter.post('/modifyWebsite', authentication(true), controller.web.modifyWebsite);
webRouter.post('/createWebsite', authentication(true), controller.web.createWebsite);

export default webRouter;
