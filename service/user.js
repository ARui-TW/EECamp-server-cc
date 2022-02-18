import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import model from "../models";
import logger from "../libs/logger";

const jwtKey = process.env.JWT_KEY;
const saltRound = 10;

const userService = {
    async create(params) {
        try {
            const salt = await bcrypt.genSalt(saltRound);
            const hashPassword = await bcrypt.hash(params.password, salt);
            // eslint-disable-next-line no-param-reassign
            params.password = hashPassword;
            const result = await model.user.create(params);
            logger.info("[User Service] Create user successfully");
            return result;
        } catch (error) {
            logger.error(
                "[User Service] Failed to create user to database:",
                error
            );
            throw new Error(`Failed to create user database, ${error}`);
        }
    },
    async findOne(filter) {
        try {
            const projection = { password: false };
            const result = await model.user.findOne(filter, projection).lean();
            logger.info("[User Service] Find user successfully");
            return result;
        } catch (error) {
            logger.error("[User Service]", error);
            throw new Error(`Failed to find users in database, ${error}`);
        }
    },
    async findAll(params) {
        const { filter, limit, skip, sort = { order: -1 } } = params;

        try {
            const projection = { password: false };
            const total = await model.user.countDocuments(filter).lean();
            const data = await model.user
                .find(filter, projection, { limit, skip, sort })
                .lean();
            logger.info("[User Service] Find users successfully");
            return { total, data };
        } catch (error) {
            logger.error("[User Service]", error);
            throw new Error(`Failed to find users in database, ${error}`);
        }
    },
    async updateOne(params) {
        // TODO: add hashPassword
        const { _id } = params;
        if (params.password) {
            const salt = await bcrypt.genSalt(saltRound);
            const hashPassword = await Bcrypt.hash(params.password, salt);
            // eslint-disable-next-line no-param-reassign
            params.password = hashPassword;
        }

        try {
            const result = await model.user.updateOne({ _id }, params).lean();
            logger.info("[User Service] Update user successfully");
            return result.n > 0 ? { success: true } : {};
        } catch (error) {
            logger.error("[User Service]", error);
            throw new Error(`Failed to update user in database, ${error}`);
        }
    },
    async deleteOne(filter) {
        try {
            const result = await model.user.deleteOne(filter).lean();
            logger.info("[User Service] Delete user successfully");
            return result.n > 0 ? { success: true } : {};
        } catch (error) {
            logger.error("[User Service]", error);
            throw new Error(`Failed to delete user in database, ${error}`);
        }
    },
    async login(params) {
        const { username, password } = params;
        try {
            const user = await model.user.findOne({ username }).lean();
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                logger.info("[User Service] Correct username");
                const token = jwt.sign(
                    { _id: user._id, username: user.username },
                    jwtKey
                );
                return { token };
            }
            return { success: false };
        } catch (error) {
            logger.error("[User Service]", error);
            throw new Error("Invalid user login data");
        }
    },
};

export default userService;
