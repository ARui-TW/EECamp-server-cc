import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserSchema from "../models/Users.js";
import logger from "../libs/logger.js";

const jwtKey = process.env.JWT_KEY;
const saltRound = 10;

const userService = {
    async create(params) {
        try {
            // const salt = await bcrypt.genSalt(saltRound);
            // const hashPassword = await bcrypt.hash(params.password, salt);
            // // eslint-disable-next-line no-param-reassign
            // params.password = hashPassword;

            // Check if the user is already registered
            const idExist = await UserSchema.findOne({
                idNumber: params.idNumber,
            });

            if (idExist) {
                // logger.error(
                //     "[User Service] Failed to create user to database: already exist"
                // );
                return { message: "user already registered" };
            }

            const result = await UserSchema.create(params);
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
            const result = await UserSchema.findOne(filter, projection).lean();
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
            const total = await UserSchema.countDocuments(filter).lean();
            const data = await User.user
                .find(filter, projection, { limit, skip, sort })
                .lean();
            logger.info("[User Service] Find users successfully");
            return { total, data };
        } catch (error) {
            logger.error("[User Service]", error);
            throw new Error(`Failed to find users in database, ${error}`);
        }
    },
    // async updateOne(params) {
    //     // TODO: add hashPassword
    //     const { _id } = params;
    //     if (params.password) {
    //         const salt = await bcrypt.genSalt(saltRound);
    //         const hashPassword = await Bcrypt.hash(params.password, salt);
    //         // eslint-disable-next-line no-param-reassign
    //         params.password = hashPassword;
    //     }

    //     try {
    //         const result = await UserSchema.updateOne({ _id }, params).lean();
    //         logger.info("[User Service] Update user successfully");
    //         return result.n > 0 ? { success: true } : {};
    //     } catch (error) {
    //         logger.error("[User Service]", error);
    //         throw new Error(`Failed to update user in database, ${error}`);
    //     }
    // },
    async deleteOne(filter) {
        try {
            const result = await UserSchema.deleteOne(filter).lean();
            logger.info("[User Service] Delete user successfully");
            return result.n > 0 ? { success: true } : {};
        } catch (error) {
            logger.error("[User Service]", error);
            throw new Error(`Failed to delete user in database, ${error}`);
        }
    },
    async login(params) {
        const { chineseName, email } = params;
        try {
            const user = await UserSchema.findOne({ chineseName }).lean();
            const result = await bcrypt.compare(email, user.email);
            if (result) {
                logger.info("[User Service] Correct username");
                // return `Congrats, you login!!!`;
                const token = jwt.sign(
                    { _id: user._id, chineseName: user.chineseName },
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
