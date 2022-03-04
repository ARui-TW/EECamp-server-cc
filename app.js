import express from 'express';
import logger from './libs/logger';
import config from './libs/config';
import router from './routes';
import connectMongo from './libs/connect_mongo';
// import dotenv from 'dotenv';

// dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// console.warn(process.env);
const app = express();
// console.warn(process.env);

// Connect to MongoDB
connectMongo();
// console.warn(process.env);

// Body Parser
app.use(express.json());
app.use(express.raw({ type: 'image/*', limit: '15mb' }));
app.use(express.raw({ type: 'application/pdf', limit: '5mb' }));
app.use('/public', express.static('public'));

// Router
app.use(router);

app.listen(config.port, () => {
  logger.info(`Server is running at port ${config.port}`);
});
