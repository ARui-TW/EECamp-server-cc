import express from "express";
import cors from "cors";
import userRouter from "./user.js";

const router = express.Router();

router.use(cors());

router.use("/user", userRouter);

export default router;
