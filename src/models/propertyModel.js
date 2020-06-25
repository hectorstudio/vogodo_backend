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
    const sql = `SELECT * FROM properties WHERE pending = 1`;

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
        resources,
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
        ${mysql.escape(Property.resources || '')},
        ${mysql.escape(Property.address || '')},
        ${mysql.escape(Property.latitude || 0)},
        ${mysql.escape(Property.longitude || 0)},
        ${mysql.escape(Property.alter_name || '')},
        ${mysql.escape(Property.alter_email || '')},
        ${mysql.escape(Property.alter_phone || '')}
      )`;

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
        \`resources\` = ${mysql.escape(Property.resources || '')},
        \`address\` = ${mysql.escape(Property.address || '')},
        \`latitude\` = ${mysql.escape(Property.latitude || 0)},
        \`longitude\` = ${mysql.escape(Property.longitude || 0)},
        \`pending\` = 1,
        \`alter_name\` = ${mysql.escape(Property.alter_name || '')},
        \`alter_email\` = ${mysql.escape(Property.alter_email || '')},
        \`alter_phone\` = ${mysql.escape(Property.alter_phone || '')}
       ${where}`;
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

  deleteProperty: (id) => {
    const sql = `DELETE FROM properties WHERE id = ${id}`;

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

  getFavorites: (uid) => {
    const sql = `SELECT * FROM favorite WHERE owner_id = ${mysql.escape(uid)}`;
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

  getFavoritesByOwnerId: (owner_id) => {
    const sql = `SELECT p.* FROM \`properties\` p LEFT JOIN \`favorite\` f ON p.id = f.property_id WHERE f.owner_id = ${owner_id} and f.favorite = 1`;

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

  getFavorite: (item) => {
    const sql = `
      SELECT * FROM favorite WHERE property_id = ${mysql.escape(item.pid)} and owner_id = ${mysql.escape(item.uid)}
    `;

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

  insertIntoFavorite: (item) => {
    const sql =
      `INSERT INTO favorite (
        owner_id,
        property_id 
      ) 
      VALUES (
        ${mysql.escape(item.uid)},
        ${mysql.escape(item.pid)}
      )`;
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

  updateFavorite: (id, item) => {
    const where = `WHERE \`id\`=${mysql.escape(id)}`;
    const sql =
      `UPDATE favorite
      SET 
        \`owner_id\` = ${mysql.escape(item.uid)},
        \`property_id\` = ${mysql.escape(item.pid)},
        \`favorite\` = ${mysql.escape(item.favorite)}
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
  },

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
        return result;
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
        return {msg: 'No properties'};
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
      const result = await propertySql.insertProperty(property);
      return result;
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
  
  deleteProperty: async (id) => {
    try {
      await propertySql.deleteProperty(id);
      return true;
    } catch (e) {
      console.log('Update Property Error:', e);
      return false;
    }
  },

  getFavorite: async (item) => {
    try {
      const result = await propertySql.getFavorite(item);
      return result;
    } catch (e) {
      console.log('get Favorite Error:', e);
      return false;
    }    
  },

  getFavorites: async (uid) => {
    try {
      const result = await propertySql.getFavorites(uid);
      return result;
    } catch (e) {
      console.log('get Favorites Error:', e);
      return false;
    }    
  },

  getFavoritesByOwnerId: async (uid) => {
    try {
      const result = await propertySql.getFavoritesByOwnerId(uid);
      return result;
    } catch (e) {
      console.log('get Saved Favorites Error:', e);
      return false;
    }    
  },

  insertIntoFavorite: async (item) => {
    try {
      const result = await propertySql.insertIntoFavorite(item);
      return result;
    } catch (e) {
      console.log('add Favorite Error:', e);
      return false;
    }    
  },

  updateFavorite: async (id, item) => {
    try {
      const result = await propertySql.updateFavorite(id, item);
      return result;
    } catch (e) {
      console.log('update Favorite Error:', e);
      return false;
    }    
  },
};

module.exports = propertyModel;
