import logger from "../libs/logger.js";
import service from "../service/web.js";
import validator from "../libs/validator.js";
import WebSchema from "../models/Web.js";

const idRule = {
    type: "multi",
    rules: [{ type: "string" }, { type: "object" }],
};
const webController = {
    async createWebsite(req, res) {
        const num = await WebSchema.count();

        if (num > 0) {
            logger.error("[Web Controller] Already created:");
            res.status(400).json({
                message: `Website has been created`,
            });
        } else {
            try {
                const body = await service.create(req.body);
                res.json(body);
            } catch (error) {
                logger.error(
                    "[Web Controller] Failed to create website:",
                    error
                );
                res.status(400).json({
                    message: `Failed to create website, ${error}`,
                });
            }
        }
    },
    async getWebsite(req, res) {
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
            const web = await service.findAll(req.body);
            res.json(web.data[0]);
        } catch (error) {
            logger.error("[Web Controller] Failed to getWebsite:", error);
            res.status(400).json({ message: `Failed to geWebsite, ${error}` });
        }
    },

    async modifyWebsite(req, res) {
        // const rule = {
        //     _id: idRule,
        //     username: {
        //         type: "forbidden",
        //     },
        //     password: {
        //         type: "string",
        //         allowEmpty: false,
        //         min: 4,
        //     },
        //     company: {
        //         type: "forbidden",
        //     },
        // };

        try {
            // validator.validate(req.body, rule);

            // modify
            const web = await service.updateOne(req.body);

            // find the modified one
            const webINFO = await service.findOne(req.body);
            res.json(webINFO);
        } catch (error) {
            logger.error("[Web Controller] Failed to modifyWeb:", error);
            res.status(400).json({ message: `Failed to modifyWeb, ${error}` });
        }
    },
};

export default webController;
