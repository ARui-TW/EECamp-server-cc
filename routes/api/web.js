import express from "express";
import webController from "../../controller/web.js";

const webRouter = express.Router();

webRouter.post("/getWebsite", webController.getWebsite);
webRouter.post("/modifyWebsite", webController.modifyWebsite);
webRouter.post("/createWebsite", webController.createWebsite);

export default webRouter;
