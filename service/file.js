import AWS from 'aws-sdk';
import { v4 as uuidV4 } from 'uuid';
import model from '../models';
import logger from '../libs/logger';

let s3;
const fileTypes = ['web', 'student-image'];

const formatBucketName = (fileType) => {
  const { AWS_BUCKET_PREFIX } = process.env;
  return `${AWS_BUCKET_PREFIX}-${fileType.replace(/_/g, '-')}`;
};

const uploadPromise = (Bucket, Key, Body) => new Promise((resolve, reject) => {
  let contentType = 'application/octet-stream';
  if (Key.endsWith('.gif')) {
    contentType = 'image/gif';
  } else if (Key.endsWith('.png')) {
    contentType = 'image/png';
  } else if (Key.endsWith('.jpg') || Key.endsWith('.jpeg')) {
    contentType = 'image/jpeg';
  } else if (Key.endsWith('.pdf')) {
    contentType = 'application/pdf';
  } else if (Key.endWith('.webp')) {
    contentType = 'image/webp';
  } else if (Key.endsWith('.svg')) {
    contentType = 'image/svg+xml';
  }

  s3.upload({
    Bucket,
    Key,
    Body,
    ACL: 'public-read',
    ContentType: contentType,
  }, (err, data) => {
    if (err) { reject(err); } else { resolve(data); }
  });
});

const fileService = {
  async uploadOne(params) {
    try {
      const {
        data: file, fileName, fileType, description,
      } = params;
      const { AWS_BUCKET_PREFIX } = process.env;

      const keyName = `${uuidV4()}_${fileName}`;
      const bucketName = `${AWS_BUCKET_PREFIX}-web`;

      try {
        const data = await uploadPromise(bucketName, keyName, file);
        const result = model.File.create({
          name: decodeURIComponent(fileName),
          type: fileType,
          description,
          path: data.Location,
        });
        logger.info('[File Service] Upload one success');
        return result;
      } catch (err) {
        logger.error(err);
        throw new Error(`Fail to upload ${fileName} to ${bucketName} in S3, ${err}`);
      }
    } catch (error) {
      logger.error('[File Service] Failed to upload image to database:', error);
      throw new Error(`Failed to create web database, ${error}`);
    }
  },

  async saveOne(params) {
    try {
      const { data: file, fileName } = params;
      const { AWS_BUCKET_PREFIX } = process.env;
      const keyName = `${uuidV4()}_${fileName}`;
      const bucketName = `${AWS_BUCKET_PREFIX}-student-image`;
      const data = await uploadPromise(bucketName, keyName, file);

      logger.info('[File Service] Save one success');
      return { filePath: data.Location };
    } catch (error) {
      logger.error('[File Service] Failed to save file to database:', error);
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
      // FIXME: delete file from S3
      // unlinkSync(path.join(process.cwd(), filter.path), (e) => {
      // if (e) throw e;
      // });
      logger.info('[File Service] Delete file successfully');
      return result.deletedCount > 0 ? { success: true } : { success: false };
    } catch (error) {
      logger.error('[File Service] Failed to delete file in database', error);
      throw new Error(`Failed to delete file in database, ${error}`);
    }
  },
  async S3Config() {
    const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
    s3 = new AWS.S3({
      region: AWS_REGION,
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    });

    const listBucketsPromise = () => new Promise((resolve, reject) => {
      s3.listBuckets((err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
    const createBucketPromise = (Bucket, options) => new Promise((resolve, reject) => {
      s3.createBucket({ Bucket, ...options }, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    try {
      const listBuckets = await listBucketsPromise();
      const bucketNames = listBuckets.Buckets.map((bucket) => bucket.Name);

      const createBucketProcess = [];
      fileTypes.forEach((fileType) => {
        const bucketName = formatBucketName(fileType);
        if (!bucketNames.includes(bucketName)) {
          createBucketProcess.push(createBucketPromise(bucketName));
        }
      });

      await Promise.all(createBucketProcess);
    } catch (error) {
      logger.error(`Failed to create bucket(s), reason: ${error}`);
    }
  },
};

export default fileService;
