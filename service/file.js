import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import model from '../models';
import logger from '../libs/logger';

const fileService = {
  async uploadOne(params) {
    try {
      const {
        data, fileName, fileType, description,
      } = params;
      const rootDir = process.cwd();
      const path = `/public/${uuidv4()}_${fileName}`;
      fs.writeFileSync(`${rootDir}${path}`, data);
      const result = model.File.create({
        name: fileName, type: fileType, description, path,
      });
      logger.info('[File Service] Upload one success');
      return result;
    } catch (error) {
      logger.error(
        '[File Service] Failed to upload image to database:',
        error,
      );
      throw new Error(`Failed to create web database, ${error}`);
    }
  },
  async findOne(filter) {
    try {
      const result = await model.File.findOne(filter).lean();
      logger.info('[File Service] Find file successfully');
      return result;
    } catch (error) {
      logger.error('[File Service] Failed to find file in database', error);
      throw new Error(`Failed to find file in database, ${error}`);
    }
  },
  async findAll(params) {
    const {
      filter, limit, skip, sort = { order: -1 },
    } = params;

    try {
      const total = await model.File.countDocuments(filter).lean();
      const data = await model.File.find(filter, null, { limit, skip, sort }).lean();
      logger.info('[File Service] Find files successfully');
      return { total, data };
    } catch (error) {
      logger.error('[File Service] Failed to find files in database', error);
      throw new Error(`Failed to find files in database, ${error}`);
    }
  },
  // async updateOne(params) {
  //   const { _id } = params;

  //   try {
  //     const result = await model.File.updateOne({ _id }, params).lean();
  //     logger.info('[File Service] Update file successfully');
  //     return result.modifiedCount > 0 ? { success: true } : { success: false };
  //   } catch (error) {
  //     logger.error('[File Service] Failed to update file in database', error);
  //     throw new Error(`Failed to update file in database, ${error}`);
  //   }
  // },
  async deleteOne(filter) {
    try {
      const result = await model.File.deleteOne(filter).lean();
      logger.info('[File Service] Delete file successfully');
      return result.deletedCount > 0 ? { success: true } : { success: false };
    } catch (error) {
      logger.error('[File Service] Failed to delete file in database', error);
      throw new Error(`Failed to delete file in database, ${error}`);
    }
  },
};

export default fileService;
