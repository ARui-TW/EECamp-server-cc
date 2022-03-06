import model from '../models';
import logger from '../libs/logger';

const webService = {
  async create(params) {
    try {
      const result = await model.Web.create(params);
      logger.info('[Web Service] Create web successfully');
      return result;
    } catch (error) {
      logger.error('[Web Service] Failed to create web to database:', error);
      throw new Error(`Failed to create web database, ${error}`);
    }
  },
  async getCount() {
    const count = await model.Web.count();
    return count;
  },
  async findOne() {
    try {
      const total = await model.Web.countDocuments().lean();
      const data = await model.Web.findOne().lean();

      logger.info('[Web Service] Find webs successfully');
      return { total, data };
    } catch (error) {
      logger.error('[Web Service]', error);
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
    logger.info('[Web Service] Update webs successfully');
    try {
      const result = await model.Web.updateOne({}, params).lean();
      return result.modifiedCount > 0 ? { success: true } : { success: false };
    } catch (error) {
      logger.error('[Web Service]', error);
      throw new Error(`Failed to update web in database, ${error}`);
    }
  },
//   async findOne(filter) {
//     try {
//       const projection = { password: false };
//       const result = await model.web.findOne(filter, projection).lean();
//       logger.info('[Web Service] Find user successfully');
//       return result;
//     } catch (error) {
//       logger.error('[Web Service]', error);
//       throw new Error(`Failed to find web in database, ${error}`);
//     }
//   },
};

export default webService;
