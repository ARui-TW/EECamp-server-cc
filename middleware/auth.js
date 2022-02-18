import jwt from "jsonwebtoken";
import config from "../libs/config.js";
import logger from "../libs/logger.js";
import dotenv from "dotenv";

dotenv.config();

const jwtKey = process.env.JWT_KEY;

/**
 * Generate and return an authentication middleware with `stricted` parameter
 * @param {Boolean} stricted whether it is necessary to carried jwt or not
 */
const authenticationMiddleware =
    (stricted = true) =>
    async (req, res, next) => {
        const auth = req.header("authorization");
        // if (auth && auth.startsWith("Bearer ")) {
        if (auth) {
            try {
                // const token = auth.slice(7);
                const token = auth;
                // const payload = await new Promise((resolve, reject) => {
                //     jwt.verify(token, jwtKey, (error, decoded) => {
                //         if (error) reject(error);
                //         resolve(decoded);
                //     });
                // });
                const payload = jwt.verify(token, jwtKey);

                req.user = payload;
                next();
            } catch (error) {
                logger.error(
                    "[Authentication Middleware] Authentifaction failed, invalid token."
                );
                res.status(401).json({ message: "Authentication failed." });
            }
        } else if (stricted) {
            logger.error(
                "[Authentication Middleware] Authentifaction failed, no token carried."
            );
            res.status(401).json({ message: "Authentication failed." });
        } else {
            req.user = {};
            next();
        }
    };

export default authenticationMiddleware;
