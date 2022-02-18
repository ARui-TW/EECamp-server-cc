import express from "express";
import cors from "cors";
import userRouter from "./user.js";
import webRouter from "./web.js";

const router = express.Router();

router.use(cors());

router.use("/user", userRouter);
router.use("/web", webRouter);

export default router;
