import jwt from 'jsonwebtoken';
import fs from 'fs';
import model from '../models';
import logger from '../libs/logger';

const privateKeyLocation = process.env.PRIVATE_KEY_LOCATION;
const rootDir = process.cwd();
const privateKey = fs.readFileSync(`${rootDir}${privateKeyLocation}`);

const userService = {
  async create(params) {
    try {
      const result = await model.Users.create(params);
      logger.info('[User Service] Create user successfully');
      return result;
    } catch (error) {
      logger.error('[User Service] Failed to create user to database:', error);
      throw new Error(`Failed to create user database, ${error}`);
    }
  },
  async findOne(filter) {
    try {
      const projection = { password: false };
      const result = await model.Users.findOne(filter, projection).lean();
      logger.info('[User Service] Find user successfully');
      return result;
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error(`Failed to find users in database, ${error}`);
    }
  },
  async findAll(params) {
    const {
      projection, filter, limit, skip, sort = { order: -1 },
    } = params;

    try {
      const total = await model.Users.countDocuments(filter).lean();
      const data = await model.Users.find(filter, projection, {
        limit,
        skip,
        sort,
      }).lean();

      logger.info('[User Service] Find users successfully');
      return { total, data };
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error(`Failed to find users in database, ${error}`);
    }
  },
  async updateOne(params) {
    try {
      const result = await model.Users.updateOne(
        // eslint-disable-next-line no-underscore-dangle
        { _id: params._id },
        params.body,
      ).lean();
      logger.info('[User Service] Update user successfully');
      return { success: result.acknowledged };
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error(`Failed to update user in database, ${error}`);
    }
  },
  async deleteOne(filter) {
    try {
      const result = await model.Users.deleteOne(filter).lean();
      logger.info('[User Service] Delete user successfully');
      return { success: result.deletedCount > 0 };
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error(`Failed to delete user in database, ${error}`);
    }
  },
  async deleteAll(params) {
    const {
      filter, limit, skip, sort = { order: -1 },
    } = params;

    try {
      const result = await model.Users.deleteMany(filter, {
        limit,
        skip,
        sort,
      }).lean();
      logger.info('[User Service] Delete all users successfully');
      return result;
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error(`Failed to delete all users in database, ${error}`);
    }
  },
  async userExist(params, expectedId = null) {
    const { personalID, email } = params;

    const result = await model.Users.countDocuments({
      _id: {
        $ne: expectedId,
      },
      $or: [{ personalID }, { email }],
    });

    return result > 0;
  },
  async login(params) {
    const { email, personalID } = params;
    try {
      const user = await model.Users.findOne({ email }).lean();
      if (user.personalID === personalID) {
        const token = jwt.sign(
          // eslint-disable-next-line no-underscore-dangle
          { _id: user._id, isAdmin: user.isAdmin },
          privateKey,
          { algorithm: 'RS256' },
        );
        return { token };
      } return { success: false };
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error('Invalid user login data');
    }
  },
};

export default userService;
