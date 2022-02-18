import WebSchema from "../models/Web.js";
import logger from "../libs/logger.js";

const userService = {
    async create(params) {
        try {
            const result = await WebSchema.create(params);
            logger.info("[Web Service] Create web successfully");
            return result;
        } catch (error) {
            logger.error(
                "[Web Service] Failed to create web to database:",
                error
            );
            throw new Error(`Failed to create web database, ${error}`);
        }
    },
    async findAll(params) {
        const { filter, limit, skip, sort = { order: -1 } } = params;

        try {
            const projection = { password: false };
            const total = await WebSchema.countDocuments(filter).lean();
            const data = await WebSchema.find(filter, projection, {
                limit,
                skip,
                sort,
            }).lean();

            logger.info("[Web Service] Find webs successfully");
            return { total, data };
        } catch (error) {
            logger.error("[Web Service]", error);
            throw new Error(`Failed to find webs in database, ${error}`);
        }
    },
    async updateOne(params) {
        // const { _id } = params;
        // if (params.password) {
        //     const salt = await bcrypt.genSalt(saltRound);
        //     const hashPassword = await Bcrypt.hash(params.password, salt);
        //     // eslint-disable-next-line no-param-reassign
        //     params.password = hashPassword;
        // }

        try {
            console.log(params);
            const result = await WebSchema.updateMany({}, params).lean();
            logger.info("[Web Service] Update web successfully");
            return result;
        } catch (error) {
            logger.error("[Web Service]", error);
            throw new Error(`Failed to update web in database, ${error}`);
        }
    },
    async findOne(filter) {
        try {
            const projection = { password: false };
            const result = await WebSchema.findOne(filter, projection).lean();
            logger.info("[Web Service] Find user successfully");
            return result;
        } catch (error) {
            logger.error("[Web Service]", error);
            throw new Error(`Failed to find web in database, ${error}`);
        }
    },
};

export default userService;
