import logger from "../libs/logger.js";
import service from "../service/user.js";
import validator from "../libs/validator.js";

const idRule = {
    type: "multi",
    rules: [{ type: "string" }, { type: "object" }],
};
const userController = {
    async register(req, res) {
        // const rule = {
        //     username: {
        //         type: "string",
        //         allowEmpty: false,
        //         min: 1,
        //     },
        //     password: {
        //         type: "string",
        //         allowEmpty: false,
        //         min: 4,
        //     },
        //     company: {
        //         type: "string",
        //         allowEmpty: false,
        //     },
        // };

        try {
            // validator.validate(req.body, rule);
            const body = await service.create(req.body);
            res.json(body);
        } catch (error) {
            logger.error("[User Controller] Failed to register:", error);
            res.status(400).json({ message: `Failed to register, ${error}` });
        }
    },
    async getUser(req, res) {
        const rule = {
            _id: idRule,
        };

        try {
            validator.validate(req.body, rule);
            const user = await service.findOne(req.body);
            res.json(user);
        } catch (error) {
            logger.error("[User Controller] Failed to getUser:", error);
            // TODO: remove error
            res.status(400).json({ message: `Failed to getUser, ${error}` });
        }
    },
    async getUsers(req, res) {
        const rule = {
            filter: {
                type: "object",
                optional: true,
            },
            limit: {
                type: "number",
                optional: true,
            },
            skip: {
                type: "number",
                optional: true,
            },
            sort: {
                type: "object",
                optional: true,
            },
        };

        try {
            validator.validate(req.body, rule);
            const user = await service.findAll(req.body);
            res.json(user);
        } catch (error) {
            logger.error("[User Controller] Failed to getUsers:", error);
            res.status(400).json({ message: `Failed to getUsers, ${error}` });
        }
    },
    // async modifyUser(req, res) {
    //     const rule = {
    //         _id: idRule,
    //         username: {
    //             type: "forbidden",
    //         },
    //         password: {
    //             type: "string",
    //             allowEmpty: false,
    //             min: 4,
    //         },
    //         company: {
    //             type: "forbidden",
    //         },
    //     };

    //     try {
    //         validator.validate(req.body, rule);
    //         const user = await service.updateOne(req.body);
    //         res.json(user.n > 0 ? { success: true } : {});
    //     } catch (error) {
    //         logger.error("[User Controller] Failed to modifyUser:", error);
    //         res.status(400).json({ message: `Failed to modifyUser, ${error}` });
    //     }
    // },
    async removeUser(req, res) {
        const rule = {
            _id: idRule,
        };

        try {
            validator.validate(req.body, rule);
            const user = await service.deleteOne(req.body);
            res.json({ success: true });
        } catch (error) {
            logger.error("[User Controller] Failed to removeUser:", error);
            res.status(400).json({ message: `Failed to removeUser, ${error}` });
        }
    },
    async removeUsers(req, res) {
        const rule = {
            filter: {
                type: "object",
                optional: true,
            },
            limit: {
                type: "number",
                optional: true,
            },
            skip: {
                type: "number",
                optional: true,
            },
            sort: {
                type: "object",
                optional: true,
            },
        };

        try {
            validator.validate(req.body, rule);
            const user = await service.deleteAll(req.body);
            res.json({ success: true });
        } catch (error) {
            logger.error("[User Controller] Failed to removeUsers:", error);
            res.status(400).json({
                message: `Failed to removeUsers, ${error}`,
            });
        }
    },
    async login(req, res) {
        const rule = {
            chineseName: {
                type: "string",
            },
            email: {
                type: "string",
            },
        };

        try {
            validator.validate(req.body, rule);
            const user = await service.login(req.body);
            res.json(user);
        } catch (error) {
            logger.error("[User Controller] Failed to login:", error);
            res.status(400).json({ message: `Failed to login, ${error}` });
        }
    },
    async getCurrentUser(req, res) {
        if (req.user) {
            const user = await service.findOne({ _id: req.user._id });
            res.json(user);
        } else {
            res.status(400).json({ message: "Hello, not logged in yet." });
        }
    },
};

export default userController;
