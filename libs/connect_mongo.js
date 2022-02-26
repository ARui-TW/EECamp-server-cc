import mongoose from 'mongoose';
import logger from './logger';

const connectMongo = async () => {
  const {
    MONGO_SCHEME,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_DATABASE,
  } = process.env;

  const uri = `${MONGO_SCHEME}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?authSource=admin`;

  mongoose.connection.on('connected', () => {
    logger.info('MongoDB connection established.');
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('MongoDB connection disconnected.');
  });

  mongoose.connection.on('close', () => {
    logger.info('MongoDB connection closed.');
  });

  mongoose.connection.on('error', (error) => {
    logger.error(`MongoDB connection error, ${error}`);
    process.exit(1);
  });

  await mongoose.connect(uri, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectMongo;
