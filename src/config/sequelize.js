const { mysqlConfig } = require('./vars');

const defaultConfig = {
  username: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database_bc,
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  dialect: 'mysql'
};

module.exports = {
  local: defaultConfig,
  development: defaultConfig,
  test: defaultConfig,
  staging: defaultConfig,
  production: defaultConfig,
};
