const Joi = require('joi');

module.exports = {
  Property: {
    body: {
      owner_id: Joi.number().required(),
      title: Joi.string().max(255),
      details: Joi.object(),
      description: Joi.string(),
      address: Joi.string(),
      alter_name: Joi.string(),
      alter_email: Joi.string(),
      alter_phone: Joi.string(),
    },
  }
};
