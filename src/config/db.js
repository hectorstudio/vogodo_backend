const mysql = require('mysql2');
const Sequelize = require('sequelize');
const { mysqlConfig } = require('./vars');

let sequelizeInstance;
const poolBc = null;
const poolSurvey = null;

const getPool = (pool, dbName) => {
  if (pool) {
    return pool;
  }

  pool = mysql.createPool({
    connectionLimit: 250,
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: dbName,
    port: mysqlConfig.port,
  });
  return pool;
};

const getPoolBc = () => {
  return getPool(poolBc, mysqlConfig.database_bc);
};

const getPoolSurvey = () => {
  return getPool(poolSurvey, mysqlConfig.database_survey);
};

const initSequelize = () => {
  if (sequelizeInstance) {
    return sequelizeInstance;
  }

  sequelizeInstance = new Sequelize(mysqlConfig.database_bc, mysqlConfig.user, mysqlConfig.password, {
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development',
  });

  return sequelizeInstance;
};

module.exports = { getPoolBc, getPoolSurvey, initSequelize };
