import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import model from '../models';
import logger from '../libs/logger';

const webService = {
  async uploadOne(params) {
    try {
      //   const photo = await model.Photo.create(param);
      const {
        data, fileName, fileType, description,
      } = params;
      const rootDir = process.cwd();
      const path = `/public/${uuidv4()}_${fileName}`;
      fs.writeFileSync(`${rootDir}${path}`, data);
      model.Photo.create({
        name: fileName, type: fileType, description, path,
      });
      logger.info('[Photo Service] Upload one success');
      return true;
    } catch (error) {
      logger.error(
        '[Photo Service] Failed to upload image to database:',
        error,
      );
      throw new Error(`Failed to create web database, ${error}`);
    }
  },
};

export default webService;
