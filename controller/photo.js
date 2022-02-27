import service from '../service';
import logger from '../libs/logger';
import validator from '../libs/validator';

const idRule = {
  type: 'multi',
  rules: [{ type: 'string' }, { type: 'object' }],
};
const photoRule = {
  fileName: {
    type: 'string',
    empty: false,
  },
  fileType: {
    type: 'enum',
    values: ['FrontPage', 'Shirt'],
  },
  description: {
    type: 'string',
    empty: false,
  },
};

const photoController = {
  async upload(req, res) {
    const { filename: fileName, filetype: fileType } = req.headers;
    let { description } = req.headers;

    if (
      fileType === 'Shirt'
      && (description === '' || description === undefined)
    ) {
      description = 'Shirt Size Image';
    }

    const params = {
      data: req.body,
      fileName,
      fileType,
      description,
    };

    try {
      validator.validate({ fileName, fileType, description }, photoRule);
      const savedImage = await service.photo.uploadOne(params);
      res.send(savedImage);
    } catch (error) {
      logger.error('[Photo Controller] Failed to upload photo:', error);
      res.status(400).json({ message: `Failed to upload photo, ${error}` });
    }
  },
  async getPhoto(req, res) {
    const rule = {
      _id: idRule,
    };

    try {
      validator.validate(req.body, rule);
      const user = await service.photo.findOne(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[Photo Controller] Failed to getPhoto:', error);
      // TODO: remove error
      res.status(400).json({ message: `Failed to getPhoto, ${error}` });
    }
  },
  async getPhotos(req, res) {
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
      const photos = await service.photo.findAll(req.body);
      res.json(photos);
    } catch (error) {
      logger.error('[Photo Controller] Failed to getPhotos:', error);
      res.status(400).json({ message: `Failed to getPhotos, ${error}` });
    }
  },
  async removePhoto(req, res) {
    const rule = {
      _id: idRule,
    };

    try {
      validator.validate(req.body, rule);
      const result = await service.photo.deleteOne(req.body);
      res.json(result);
    } catch (error) {
      logger.error('[Photo Controller] Failed to removePhoto:', error);
      res.status(400).json({ message: `Failed to removePhoto, ${error}` });
    }
  },
};

export default photoController;
