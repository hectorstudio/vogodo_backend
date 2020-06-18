const mysql = require('mysql2');
const { getPoolBc } = require('../config/db');

const poolBc = getPoolBc();

const geoSql = {
  getStates: () => {
    const sql = 'SELECT DISTINCT(state_name) as label, state_id as value FROM uscities';

    return new Promise((resolve, reject) => {
      poolBc.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(sql, (err, result) => {
          connection.release();
          if (err) return reject(err);
          return resolve(result);
        });
      });
    });
  },

  getCitiesByStateId: (id) => {
    const where = `\`state_id\`=${mysql.escape(id)}`;

    const sql = `SELECT pid as value, city_ascii as label, lat, lng FROM uscities WHERE ${where}`;

    return new Promise((resolve, reject) => {
      poolBc.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(sql, (err, result) => {
          connection.release();
          if (err) return reject(err);
          return resolve(result);
        });
      });
    });
  },
};

const geoModel = {

  getStates: async () => {
    try {
      const result = await geoSql.getStates();
      if (result.length === 0) {
        return null;
      } else {
        return result;
      }
    } catch (e) {
      console.log('get States Error:', e);
      return null;
    }
  },

  getCitiesByStateId: async (id) => {
    try {
      const result = await geoSql.getCitiesByStateId(id);
      if (result.length === 0) {
        return null;
      } else {
        return result;
      }
    } catch (e) {
      console.log('get Cities Error:', e);
      return null;
    }
  },
};

module.exports = geoModel;
