import service from '../service';
import logger from '../libs/logger';
import validator from '../libs/validator';

const idRule = {
  type: 'multi',
  rules: [{ type: 'string' }, { type: 'object' }],
};
const fileRule = {
  fileName: {
    type: 'string',
    empty: false,
  },
  fileType: {
    type: 'enum',
    values: ['FrontPage', 'Shirt', 'Consent'],
  },
  description: {
    type: 'string',
    optional: true,
  },
};

const fileController = {
  async upload(req, res) {
    const { filename: fileName, filetype: fileType, description } = req.headers;

    const params = {
      data: req.body,
      fileName,
      fileType,
      description,
    };

    try {
      validator.validate({ fileName, fileType, description }, fileRule);
      const savedImage = await service.file.uploadOne(params);
      res.send(savedImage);
    } catch (error) {
      logger.error('[File Controller] Failed to upload file:', error);
      res.status(400).json({ message: `Failed to upload file, ${error}` });
    }
  },
  async save(req, res) {
    const { filename: fileName } = req.headers;

    const params = {
      data: req.body,
      fileName,
    };

    try {
      const savedImage = await service.file.saveOne(params);
      res.send(savedImage);
    } catch (error) {
      logger.error('[File Controller] Failed to upload file:', error);
      res.status(400).json({ message: `Failed to upload file, ${error}` });
    }
  },
  async getFile(req, res) {
    const rule = {
      _id: idRule,
    };

    try {
      validator.validate(req.body, rule);
      const user = await service.file.findOne(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[File Controller] Failed to getFile:', error);
      // TODO: remove error
      res.status(400).json({ message: `Failed to getFile, ${error}` });
    }
  },
  async getFiles(req, res) {
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
      const files = await service.file.findAll(req.body);
      res.json(files);
    } catch (error) {
      logger.error('[File Controller] Failed to getFiles:', error);
      res.status(400).json({ message: `Failed to getFiles, ${error}` });
    }
  },
  async removeFile(req, res) {
    const rule = {
      _id: idRule,
    };

    try {
      validator.validate(req.body, rule);
      const path = await service.file.findOne(req.body);
      req.body = { ...req.body, path: path.path };
      console.log(req.body);
      const result = await service.file.deleteOne(req.body);
      res.json(result);
    } catch (error) {
      logger.error('[File Controller] Failed to removeFile:', error);
      res.status(400).json({ message: `Failed to removeFile, ${error}` });
    }
  },
};

export default fileController;
