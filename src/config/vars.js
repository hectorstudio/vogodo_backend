const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV || 'test'}`),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,

  mysqlConfig: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database_bc: process.env.MYSQL_DATABASE_BC,
    database_survey: process.env.MYSQL_DATABASE_SURVEY,
    database_mapping: process.env.MYSQL_DATABASE_MAPPING
  },

  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',

};
