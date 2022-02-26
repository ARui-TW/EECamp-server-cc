import logger from '../libs/logger';
import service from '../service';
import validator from '../libs/validator';

const idRule = {
  type: 'multi',
  rules: [{ type: 'string' }, { type: 'object' }],
};
const webController = {
  async createWebsite(req, res) {
    const num = await service.web.getCount();

    try {
      if (num > 0) {
        throw new Error('Website has been created');
      }
      const result = await service.web.create(req.body);
      res.json(result);
    } catch (error) {
      logger.error('[Web Controller] Failed to create website:', error);
      res.status(400).json({ message: `Failed to create website, ${error}` });
    }
  },
  async getWebsite(req, res) {
    const rule = {
      filter: {
        type: 'object',
        optional: true,
      },
      limit: {
        type: 'number',
        optional: true,
      },
      skip: {
        type: 'number',
        optional: true,
      },
      sort: {
        type: 'object',
        optional: true,
      },
    };

    try {
      validator.validate(req.body, rule);
      const result = await service.web.findOne(req.body);
      if (result.total !== 1) { throw new Error('Web total is not 1'); }
      res.json(result.data);
    } catch (error) {
      logger.error('[Web Controller] Failed to getWebsite:', error);
      res.status(400).json({ message: `Failed to geWebsite, ${error}` });
    }
  },

  async modifyWebsite(req, res) {
    try {
      // validator.validate(req.body, rule);

      const result = await service.web.updateOne(req.body);
      res.json(result);
    } catch (error) {
      logger.error('[Web Controller] Failed to modifyWeb:', error);
      res.status(400).json({ message: `Failed to modifyWeb, ${error}` });
    }
  },
};

export default webController;
