import {
  isNationalIdentificationNumberValid, isResidentCertificateNumberValid,
  isNewResidentCertificateNumberValid,
} from 'taiwan-id-validator';
import logger from '../libs/logger';
import service from '../service';
import validator from '../libs/validator';

const idRule = {
  type: 'multi',
  rules: [{ type: 'string' }, { type: 'object' }],
};
const userController = {
  async register(req, res) {
    const rule = {
      isAdmin: {
        type: 'forbidden',
      },
      chineseName: {
        type: 'string',
      },
      photoPath: {
        type: 'string',
      },
      personalID: {
        type: 'string',
        custom: (val, err) => {
          if (!isNationalIdentificationNumberValid(val)
            && !isResidentCertificateNumberValid(val)
            && !isNewResidentCertificateNumberValid(val)) {
            err.push({ type: 'PersonalID', actual: val });
          }
          return val;
        },
      },
      nickName: {
        type: 'string',
      },
      birthday: {
        type: 'date',
        convert: true,
      },
      email: {
        type: 'email',
      },
      gender: {
        type: 'string',
        enum: ['男', '女'],
      },
      bloodType: {
        type: 'enum',
        values: ['A', 'B', 'AB', 'O', '未驗血'],
      },
      school: {
        type: 'string',
      },
      grade: {
        type: 'enum',
        values: ['一年級', '二年級', '三年級'],
      },
      homeNumber: {
        type: 'string',
      },
      phoneNumber: {
        type: 'string',
        pattern: '09\\d{8}',
      },
      emergencyName: {
        type: 'string',
      },
      emergencyPhoneNumber: {
        type: 'string',
        pattern: '09\\d{8}',
      },
      zipCode: {
        type: 'string',
        length: 5,
      },
      address: {
        type: 'string',
      },
      shirtSize: {
        type: 'enum',
        values: ['XS', 'S', 'M', 'L', 'XL', '2L', '3L', '4L', '5L'],
      },
      vegan: {
        type: 'boolean',
      },
      specialDiet: {
        type: 'string',
      },
      specialDisease: {
        type: 'string',
      },
      selfIntro: {
        type: 'string',
      },
      motivation: {
        type: 'string',
      },
      previousCamp: {
        type: 'string',
      },
      howYouKnow: {
        type: 'string',
      },
      sthToSay: {
        type: 'string',
      },
      status: {
        type: 'forbidden',
      },
      alternateNum: {
        type: 'forbidden',
      },
    };
    try {
      validator.validate(req.body, rule);
      if (await service.user.userExist(req.body)) { throw new Error('Cannot create user, duplicate user.'); }
      const body = await service.user.create(req.body);
      res.json(body);
    } catch (error) {
      logger.error('[User Controller] Failed to register:', error);
      res.status(400).json({ message: `Failed to register, ${error}` });
    }
  },
  async getUser(req, res) {
    const rule = {
      _id: idRule,
    };

    try {
      validator.validate(req.body, rule);
      const user = await service.user.findOne(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to getUser:', error);
      // TODO: remove error
      res.status(400).json({ message: `Failed to getUser, ${error}` });
    }
  },
  async getUsers(req, res) {
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
      const user = await service.user.findAll(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to getUsers:', error);
      res.status(400).json({ message: `Failed to getUsers, ${error}` });
    }
  },
  async modifyUser(req, res) {
    const rule = {
      isAdmin: {
        type: 'boolean',
        optional: true,
      },
      chineseName: {
        type: 'string',
        optional: true,
      },
      photoPath: {
        type: 'string',
        optional: true,
      },
      personalID: {
        type: 'string',
        custom: (val, err) => {
          if (val === undefined) return val;
          if (!isNationalIdentificationNumberValid(val)
            && !isResidentCertificateNumberValid(val)
            && !isNewResidentCertificateNumberValid(val)) {
            err.push({ type: 'PersonalID', actual: val });
          }
          return val;
        },
        optional: true,
      },
      nickName: {
        type: 'string',
        optional: true,
      },
      birthday: {
        type: 'date',
        convert: true,
        optional: true,
      },
      email: {
        type: 'email',
        optional: true,
      },
      gender: {
        type: 'string',
        enum: ['男', '女'],
        optional: true,
      },
      bloodType: {
        type: 'enum',
        values: ['A', 'B', 'AB', 'O', '未驗血'],
        optional: true,
      },
      school: {
        type: 'string',
        optional: true,
      },
      grade: {
        type: 'enum',
        values: ['一年級', '二年級', '三年級'],
        optional: true,
      },
      homeNumber: {
        type: 'string',
        optional: true,
      },
      phoneNumber: {
        type: 'string',
        pattern: '09\\d{8}',
        optional: true,
      },
      emergencyName: {
        type: 'string',
        optional: true,
      },
      emergencyPhoneNumber: {
        type: 'string',
        pattern: '09\\d{8}',
        optional: true,
      },
      zipCode: {
        type: 'string',
        length: 5,
        optional: true,
      },
      address: {
        type: 'string',
        optional: true,
      },
      shirtSize: {
        type: 'enum',
        values: ['XS', 'S', 'M', 'L', 'XL', '2L', '3L', '4L', '5L'],
        optional: true,
      },
      vegan: {
        type: 'boolean',
        optional: true,
      },
      specialDiet: {
        type: 'string',
        optional: true,
      },
      specialDisease: {
        type: 'string',
        optional: true,
      },
      selfIntro: {
        type: 'string',
        optional: true,
      },
      motivation: {
        type: 'string',
        optional: true,
      },
      previousCamp: {
        type: 'string',
        optional: true,
      },
      howYouKnow: {
        type: 'string',
        optional: true,
      },
      sthToSay: {
        type: 'string',
        optional: true,
      },
      status: {
        type: 'enum',
        values: ['NotChosen', 'Alternate', 'Paid', 'Unpaid', 'GaveUp'],
        optional: true,
      },
      alternateNum: {
        type: 'number',
        optional: true,
        convert: true,
      },
    };

    try {
      // eslint-disable-next-line no-underscore-dangle
      const userID = req.body._id;
      validator.validate(req.body, rule);

      const result = await service.user.updateOne({ _id: userID, body: req.body });

      res.json(result);
    } catch (error) {
      logger.error('[User Controller] Failed to modifyUser:', error);
      res.status(400).json({ message: `Failed to modifyUser, ${error}` });
    }
  },
  async modifyCurrentUser(req, res) {
    const rule = {
      isAdmin: {
        type: 'forbidden',
      },
      chineseName: {
        type: 'string',
        optional: true,
      },
      photoPath: {
        type: 'string',
        optional: true,
      },
      personalID: {
        type: 'string',
        custom: (val, err) => {
          if (val === undefined) return val;
          if (!isNationalIdentificationNumberValid(val)
            && !isResidentCertificateNumberValid(val)
            && !isNewResidentCertificateNumberValid(val)) {
            err.push({ type: 'PersonalID', actual: val });
          }
          return val;
        },
        optional: true,
      },
      nickName: {
        type: 'string',
        optional: true,
      },
      birthday: {
        type: 'date',
        convert: true,
        optional: true,
      },
      email: {
        type: 'email',
        optional: true,
      },
      gender: {
        type: 'string',
        enum: ['男', '女'],
        optional: true,
      },
      bloodType: {
        type: 'enum',
        values: ['A', 'B', 'AB', 'O', '未驗血'],
        optional: true,
      },
      school: {
        type: 'string',
        optional: true,
      },
      grade: {
        type: 'enum',
        values: ['一年級', '二年級', '三年級'],
        optional: true,
      },
      homeNumber: {
        type: 'string',
        optional: true,
      },
      phoneNumber: {
        type: 'string',
        pattern: '09\\d{8}',
        optional: true,
      },
      emergencyName: {
        type: 'string',
        optional: true,
      },
      emergencyPhoneNumber: {
        type: 'string',
        pattern: '09\\d{8}',
        optional: true,
      },
      zipCode: {
        type: 'string',
        length: 5,
        optional: true,
      },
      address: {
        type: 'string',
        optional: true,
      },
      shirtSize: {
        type: 'enum',
        values: ['XS', 'S', 'M', 'L', 'XL', '2L', '3L', '4L', '5L'],
        optional: true,
      },
      vegan: {
        type: 'boolean',
        optional: true,
      },
      specialDiet: {
        type: 'string',
        optional: true,
      },
      specialDisease: {
        type: 'string',
        optional: true,
      },
      selfIntro: {
        type: 'string',
        optional: true,
      },
      motivation: {
        type: 'string',
        optional: true,
      },
      previousCamp: {
        type: 'string',
        optional: true,
      },
      howYouKnow: {
        type: 'string',
        optional: true,
      },
      sthToSay: {
        type: 'string',
        optional: true,
      },
      status: {
        type: 'enum',
        values: ['GaveUp'],
        optional: true,
      },
      alternateNum: {
        type: 'forbidden',
      },
    };
    try {
      // eslint-disable-next-line no-underscore-dangle
      const userID = req.user._id;
      validator.validate(req.body, rule);

      if (await service.user.userExist(req.body, userID)) { throw new Error('Cannot modify user, duplicate user data.'); }
      const result = await service.user.updateOne({ _id: userID, body: req.body });

      res.json(result);
    } catch (error) {
      logger.error('[User Controller] Failed to modifyUser:', error);
      res.status(400).json({ message: `Failed to modifyUser, ${error}` });
    }
  },
  async removeUser(req, res) {
    const rule = {
      _id: idRule,
    };

    try {
      validator.validate(req.body, rule);
      const user = await service.user.findOne(req.body);
      const { photoPath } = user;
      req.body = { ...req.body, photoPath };
      const result = await service.user.deleteOne(req.body);
      res.json(result);
    } catch (error) {
      logger.error('[User Controller] Failed to removeUser:', error);
      res.status(400).json({ message: `Failed to removeUser, ${error}` });
    }
  },
  async removeUsers(req, res) {
    const rule = {
      filter: {
        type: 'object',
        optional: true,
      },
    };

    try {
      validator.validate(req.body, rule);
      req.body.filter = { ...req.body.filter, isAdmin: false };
      const users = await service.user.findAll({
        projection: 'photoPath',
        ...req.body,
      });
      req.body.data = users.data;
      const result = await service.user.deleteAll(req.body);
      res.json(result);
    } catch (error) {
      logger.error('[User Controller] Failed to removeUsers:', error);
      res.status(400).json({
        message: `Failed to removeUsers, ${error}`,
      });
    }
  },
  async login(req, res) {
    const rule = {
      email: {
        type: 'string',
      },
      personalID: {
        type: 'string',
      },
    };

    try {
      validator.validate(req.body, rule);
      const user = await service.user.login(req.body);
      // res.header("authorization", user.token).json({ success: user._id });
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to login:', error);
      res.status(400).json({ message: `Failed to login, ${error}` });
    }
  },
  async getCurrentUser(req, res) {
    if (req.user) {
      // eslint-disable-next-line no-underscore-dangle
      const user = await service.user.findOne({ _id: req.user._id });
      res.json(user);
    } else {
      res.status(400).json({ message: 'Hello, not logged in yet.' });
    }
  },
  async getUsersStatus(req, res) {
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
      req.body.filter = { ...req.body.filter, isAdmin: false };
      const user = await service.user.findAll({
        projection: 'chineseName status alternateNum',
        ...req.body,
      });

      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to getUsers:', error);
      res.status(400).json({ message: `Failed to getUsers, ${error}` });
    }
  },
};

export default userController;
