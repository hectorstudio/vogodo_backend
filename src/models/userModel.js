const mysql = require('mysql2');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const utils = require('../utils/index');
const { getPoolBc } = require('../config/db');

const poolBc = getPoolBc();

const userSql = {
  getUser: (id) => {
    const where = `\`id\`=${mysql.escape(id)}`;

    const sql = `SELECT * FROM users WHERE ${where}`;

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

  getUserByEmail: (emailAddress) => {
    const where = `\`emailAddress\`=${mysql.escape(emailAddress)}`;

    const sql = `SELECT * FROM users WHERE ${where}`;

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

  getUsers: () => {
    const sql = `SELECT * FROM users`;

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

  insertUser: (user) => {
    const date = moment().toISOString();
    const sql =
      `INSERT INTO users (
        firstName,
        lastName,
        emailAddress,
        password,
        address,
        latitude,
        longitude,
        phone,
        title,
        description,
        membership,
        createdTime,
        passwordLastChanged              
      ) 
      VALUES (
        ${mysql.escape(user.firstName)},
        ${mysql.escape(user.lastName)},
        ${mysql.escape(user.emailAddress)},
        ${mysql.escape(user.password)},
        ${mysql.escape(user.address || '')},
        ${mysql.escape(user.latitude || 0)},
        ${mysql.escape(user.longitude || 0)},
        ${mysql.escape(user.phone || '')},
        ${mysql.escape(user.title || '')},
        ${mysql.escape(user.description || '')},
        ${mysql.escape(user.membership || 0)},
        ${mysql.escape(date)},
        ${mysql.escape(date)}
      )`;

      return new Promise((resolve, reject) => {
        poolBc.getConnection((err, connection) => {
          if (err) return reject(err);
          connection.query(sql, (err) => {
            connection.release();
            if (err) return reject(err);
            return resolve(true);
          });
        });
      });
  },

  updateUser: (id, user) => {
    const date = moment().toISOString();
    const where = `WHERE \`id\`=${mysql.escape(id)}`;
    const sql =
      `UPDATE users
      SET 
        \`firstName\` = ${mysql.escape(user.firstName)},
        \`lastName\` = ${mysql.escape(user.lastName)},
        \`emailAddress\` = ${mysql.escape(user.emailAddress)},
        \`password\` = ${mysql.escape(user.password)},
        \`address\` = ${mysql.escape(user.address || '')},
        \`latitude\` = ${mysql.escape(user.latitude || 0)},
        \`longitude\` = ${mysql.escape(user.longitude || 0)},
        \`phone\` = ${mysql.escape(user.phone || '')},
        \`title\` = ${mysql.escape(user.title || '')},
        \`description\` = ${mysql.escape(user.description || '')},
        \`membership\` = ${mysql.escape(user.membership || 0)},
        \`passwordLastChanged\` = ${mysql.escape(date)}
       ${where}`;
      return new Promise((resolve, reject) => {
        poolBc.getConnection((err, connection) => {
          if (err) return reject(err);
          connection.query(sql, (err) => {
            connection.release();
            if (err) return reject(err);
            return resolve(true);
          });
        });
      });
  }

};

const userModel = {

  checkDuplicateEmail: async (emailAddress) => {
    try {
      const result = await userSql.getUserByEmail(emailAddress);
      return result.length !== 0;
    } catch (e) {
      console.log('checkDuplicateEmail Error:', e);
      return null;
    }
  },

  getUser: async (id) => {
    try {
      const result = await userSql.getUser(id);
      if (result.length === 0) {
        return null;
      } else {
        return result[0];
      }
    } catch (e) {
      console.log('get User Error:', e);
      return null;
    }
  },

  getUsers: async () => {
    try {
      const result = await userSql.getUsers();
      if (result.length === 0) {
        return null;
      } else {
        return result;
      }
    } catch (e) {
      console.log('findById Error:', e);
      return null;
    }
  },

  // Create a new User
  addNewUser: async (user) => {
    try {
      user.password = await bcrypt.hash(user.password, 10);
      await userSql.insertUser(user);
      return true;
    } catch (e) {
      console.log('Add New User Error:', e);
      return false;
    }
  },
  
  updateUser: async (id, user) => {
    try {
      user.password = await bcrypt.hash(user.password, 10);
      await userSql.updateUser(id, user);
      return true;
    } catch (e) {
      console.log('Update User Error:', e);
      return false;
    }
  },

  findAndGenerateToken: async (emailAddress, password) => {
    try {
      // Find email
      let user = await userSql.getUserByEmail(emailAddress);
      if (!user || user.length === 0) {
        return { error: httpStatus.UNAUTHORIZED, msg: 'Email not found' };
      }

      user = user[0];

      const passwordMatched = await utils.passwordMatches(password, user.password);
      if (!passwordMatched) {
        return { error: httpStatus.UNAUTHORIZED, msg: 'Password wrong' };
      }

      if (passwordMatched) {
        user.password = ''; // clear the password hash
        const token = utils.token(user.id);
        return { user, accessToken: token };
      }
    } catch (e) {
      console.log('findAndGenerateToken Error:', e);
      return { error: httpStatus.INTERNAL_SERVER_ERROR, msg: 'Server failure' };
    }
  },
};

module.exports = userModel;
