const mysql = require('mysql2');
const moment = require('moment');
const { getPoolBc } = require('../config/db');

const poolBc = getPoolBc();

const propertySql = {
  getProperty: (id) => {
    const where = `\`id\`=${mysql.escape(id)}`;

    const sql = `SELECT * FROM properties WHERE ${where}`;

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

  getPropertiesByOwnerId: (owner_id) => {
    const where = `\`owner_id\`=${mysql.escape(owner_id)}`;

    const sql = `SELECT * FROM properties WHERE ${where}`;

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

  getProperties: () => {
    const sql = `SELECT * FROM properties`;

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

  insertProperty: (Property) => {
    const date = moment().toISOString();
    const sql =
      `INSERT INTO properties (
        owner_id,
        title,
        details,
        description,
        address,
        latitude,
        longitude,
        alter_name,
        alter_email,
        alter_phone      
      ) 
      VALUES (
        ${mysql.escape(Property.owner_id)},
        ${mysql.escape(Property.title)},
        ${mysql.escape(Property.details)},
        ${mysql.escape(Property.description)},
        ${mysql.escape(Property.address || '')},
        ${mysql.escape(Property.latitude || 0)},
        ${mysql.escape(Property.longitude || 0)},
        ${mysql.escape(Property.alter_name || '')},
        ${mysql.escape(Property.alter_email || '')},
        ${mysql.escape(Property.alter_phone || '')}
      )`;

      console.log(sql);

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

  updateProperty: (id, Property) => {
    const date = moment().toISOString();
    const where = `WHERE \`id\`=${mysql.escape(id)}`;
    const sql =
      `UPDATE properties
      SET 
        \`owner_id\` = ${mysql.escape(Property.owner_id)},
        \`title\` = ${mysql.escape(Property.title)},
        \`details\` = ${mysql.escape(Property.details)},
        \`description\` = ${mysql.escape(Property.description)},
        \`address\` = ${mysql.escape(Property.address || '')},
        \`latitude\` = ${mysql.escape(Property.latitude || 0)},
        \`longitude\` = ${mysql.escape(Property.longitude || 0)},
        \`alter_name\` = ${mysql.escape(Property.alter_name || '')},
        \`alter_email\` = ${mysql.escape(alter_email.title || '')},
        \`alter_phone\` = ${mysql.escape(Property.alter_phone || '')},
        \`membership\` = ${mysql.escape(Property.membership || 0)}
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

const propertyModel = {

  getProperty: async (id) => {
    try {
      const result = await propertySql.getProperty(id);
      if (result.length === 0) {
        return null;
      } else {
        return result[0];
      }
    } catch (e) {
      console.log('get Property Error:', e);
      return null;
    }
  },

  getPropertiesByOwnerId: async (owner_id) => {
    try {
      const result = await propertySql.getPropertiesByOwnerId(owner_id);
      if (result.length === 0) {
        return null;
      } else {
        return result[0];
      }
    } catch (e) {
      console.log('get Properties By Owner Id Error:', e);
      return null;
    }
  },

  getProperties: async () => {
    try {
      const result = await propertySql.getProperties();
      if (result.length === 0) {
        return null;
      } else {
        return result;
      }
    } catch (e) {
      console.log('Get Properties Error:', e);
      return null;
    }
  },

  // Create a new Property
  addNewProperty: async (property) => {
    try {
      property.details = JSON.stringify(property.details);
      await propertySql.insertProperty(property);
      return true;
    } catch (e) {
      console.log('Add New Property Error:', e);
      return false;
    }
  },
  
  updateProperty: async (id, property) => {
    try {
      property.details = JSON.stringify(property.details);
      await propertySql.updateProperty(id, property);
      return true;
    } catch (e) {
      console.log('Update Property Error:', e);
      return false;
    }
  },
};

module.exports = propertyModel;
