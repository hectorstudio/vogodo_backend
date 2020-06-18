const Joi = require('joi');

module.exports = {

  register: {
    body: {
      firstName: Joi.string().required().max(128),
      lastName: Joi.string().required().max(128),
      companyName: Joi.string().required().max(128),
      emailAddress: Joi.string().required()
    },
  },

};
