import service from '../service';
import logger from '../libs/logger';
import validator from '../libs/validator';

const photoController = {
  async upload(req, res) {
    const rule = {
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
    const { filename: fileName, filetype: fileType } = req.headers;
    let { description } = req.headers;

    if (fileType === 'Shirt' && (description === '' || description === undefined)) {
      description = 'Shirt Size Image';
    }

    const params = {
      data: req.body,
      fileName,
      fileType,
      description,
    };

    try {
      validator.validate({ fileName, fileType, description }, rule);
      const savedImage = await service.photo.uploadOne(params);
      res.send(savedImage);
    } catch (error) {
      logger.error('[Photo Controller] Failed to upload photo:', error);
      res.status(400).json({ message: `Failed to upload photo, ${error}` });
    }
  },
};

export default photoController;
