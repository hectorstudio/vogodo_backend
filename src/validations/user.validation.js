const Joi = require('joi');

module.exports = {
  login: {
    body: {
      emailAddress: Joi.string().required(),
      password: Joi.string().required().max(128),
    },
  }
};
