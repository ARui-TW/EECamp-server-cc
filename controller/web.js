import logger from '../libs/logger';
import service from '../service';
import validator from '../libs/validator';

const webController = {
  async createWebsite(req, res) {
    const rule = {
      FAQ: {
        type: 'array',
        items: {
          type: 'object',
          $$strict: true,
          props: {
            Ques: {
              type: 'string',
              empty: false,
            },
            Ans: {
              type: 'string',
              empty: false,
            },
          },
        },
      },
      campName: {
        type: 'string',
      },
      campPeople: {
        type: 'number',
        convert: true,
      },
      campTime: {
        type: 'string',
      },
      campRegister: {
        type: 'string',
      },
      convenor: {
        type: 'string',
      },
      convenorPhone: {
        type: 'string',
      },
      inCharge: {
        type: 'string',
      },
      inChargePhone: {
        type: 'string',
      },
      remittanceAccName: {
        type: 'string',
      },
      registerFee: {
        type: 'number',
        convert: true,
      },
      AnnounceTime: {
        type: 'string',
      },
      remittanceTime: {
        type: 'string',
      },
      refundFifty: {
        type: 'string',
      },
      refundTwenty: {
        type: 'string',
      },
      RecapVlog: {
        type: 'url',
      },
      albumSite: {
        type: 'url',
      },
      RegisterStatus: {
        type: 'enum',
        values: ['register', 'fillingUp', 'done'],
      },
    };
    const num = await service.web.getCount();

    try {
      if (num > 0) {
        throw new Error('Website has been created');
      }
      validator.validate(req.body, rule);
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
      if (result.total < 1) { throw new Error('Web is not created.'); } else if (result.total > 1) {
        throw new Error('Web is more than 1');
      }
      res.json(result.data);
    } catch (error) {
      logger.error('[Web Controller] Failed to getWebsite:', error);
      res.status(400).json({ message: `Failed to geWebsite, ${error}` });
    }
  },

  async modifyWebsite(req, res) {
    try {
      const rule = {
        FAQ: {
          type: 'array',
          items: {
            type: 'object',
            $$strict: true,
            props: {
              Ques: {
                type: 'string',
                empty: false,
              },
              Ans: {
                type: 'string',
                empty: false,
              },
            },
          },
          optional: true,
        },
        campName: {
          type: 'string',
          optional: true,
        },
        campPeople: {
          type: 'number',
          convert: true,
          optional: true,
        },
        campTime: {
          type: 'string',
          optional: true,
        },
        campRegister: {
          type: 'string',
          optional: true,
        },
        convenor: {
          type: 'string',
          optional: true,
        },
        convenorPhone: {
          type: 'string',
          optional: true,
        },
        inCharge: {
          type: 'string',
          optional: true,
        },
        inChargePhone: {
          type: 'string',
          optional: true,
        },
        remittanceAccName: {
          type: 'string',
          optional: true,
        },
        registerFee: {
          type: 'number',
          convert: true,
          optional: true,
        },
        AnnounceTime: {
          type: 'string',
          optional: true,
        },
        remittanceTime: {
          type: 'string',
          optional: true,
        },
        refundFifty: {
          type: 'string',
          optional: true,
        },
        refundTwenty: {
          type: 'string',
          optional: true,
        },
        RecapVlog: {
          type: 'url',
          optional: true,
        },
        albumSite: {
          type: 'url',
          optional: true,
        },
        RegisterStatus: {
          type: 'enum',
          values: ['register', 'fillingUp', 'done'],
          optional: true,
        },
      };
      validator.validate(req.body, rule);

      const result = await service.web.updateOne(req.body);
      res.json(result);
    } catch (error) {
      logger.error('[Web Controller] Failed to modifyWeb:', error);
      res.status(400).json({ message: `Failed to modifyWeb, ${error}` });
    }
  },
};

export default webController;
