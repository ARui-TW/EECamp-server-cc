import express from "express";

const userRouter = express.Router();

userRouter.get("/:id", (req, res) => {
    res.json({ msg: req.params.id });
});

export default userRouter;
