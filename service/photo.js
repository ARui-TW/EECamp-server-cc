import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import model from '../models';
import logger from '../libs/logger';

const photoService = {
  async uploadOne(params) {
    try {
      const {
        data, fileName, fileType, description,
      } = params;
      const rootDir = process.cwd();
      const path = `/public/${uuidv4()}_${fileName}`;
      fs.writeFileSync(`${rootDir}${path}`, data);
      const result = model.Photo.create({
        name: fileName, type: fileType, description, path,
      });
      logger.info('[Photo Service] Upload one success');
      return result;
    } catch (error) {
      logger.error(
        '[Photo Service] Failed to upload image to database:',
        error,
      );
      throw new Error(`Failed to create web database, ${error}`);
    }
  },
  async findOne(filter) {
    try {
      const result = await model.Photo.findOne(filter).lean();
      logger.info('[Photo Service] Find photo successfully');
      return result;
    } catch (error) {
      logger.error('[Photo Service] Failed to find photo in database', error);
      throw new Error(`Failed to find photo in database, ${error}`);
    }
  },
  async findAll(params) {
    const {
      filter, limit, skip, sort = { order: -1 },
    } = params;

    try {
      const total = await model.Photo.countDocuments(filter).lean();
      const data = await model.Photo.find(filter, null, { limit, skip, sort }).lean();
      logger.info('[Photo Service] Find photos successfully');
      return { total, data };
    } catch (error) {
      logger.error('[Photo Service] Failed to find photos in database', error);
      throw new Error(`Failed to find photos in database, ${error}`);
    }
  },
  // async updateOne(params) {
  //   const { _id } = params;

  //   try {
  //     const result = await model.Photo.updateOne({ _id }, params).lean();
  //     logger.info('[Photo Service] Update photo successfully');
  //     return result.modifiedCount > 0 ? { success: true } : { success: false };
  //   } catch (error) {
  //     logger.error('[Photo Service] Failed to update photo in database', error);
  //     throw new Error(`Failed to update photo in database, ${error}`);
  //   }
  // },
  async deleteOne(filter) {
    try {
      const result = await model.Photo.deleteOne(filter).lean();
      logger.info('[Photo Service] Delete photo successfully');
      return result.deletedCount > 0 ? { success: true } : { success: false };
    } catch (error) {
      logger.error('[Photo Service] Failed to delete photo in database', error);
      throw new Error(`Failed to delete photo in database, ${error}`);
    }
  },
};

export default photoService;
