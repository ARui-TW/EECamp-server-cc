import express from 'express';
import logger from './libs/logger';
import config from './libs/config';
import router from './routes/index';
import connectMongo from './libs/connect_mongo';

const app = express();

// Connect to MongoDB
connectMongo();

// Body Parser
app.use(express.json());
app.use(express.raw({ type: 'image/*', limit: '15mb' }));
app.use('/public', express.static('public'));

// Router
app.use(router);

app.listen(config.port, () => {
  logger.info(`Server is running at port ${config.port}`);
});
