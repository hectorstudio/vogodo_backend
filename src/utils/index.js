const jwt = require('jwt-simple');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const { jwtSecret, jwtExpirationInterval } = require('../config/vars');

const utils = {
  token: (userId) => {
  const playload = {
    exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
    iat: moment().unix(),
    sub: userId,
  };
  return jwt.encode(playload, jwtSecret);
  },

  passwordToken: () => {
    return crypto.randomBytes(40).toString('hex');
  },

  passwordMatches: async (passwordInput, passwordStored) => {
    return bcrypt.compare(passwordInput, passwordStored);
  },

  generateTokenResponse: (user, accessToken) => {
    const tokenType = 'Bearer';
    // const refreshToken = RefreshToken.generate(user).token;
    const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
    return {
      // tokenType, accessToken, refreshToken, expiresIn,
      tokenType, accessToken, expiresIn,
    };
  }
};

module.exports = utils;
