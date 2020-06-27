const { Sequelize, Model } = require('sequelize');
const { initSequelize } = require('../config/db');

class User extends Model {}
User.init({
  owner_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
  },
  details: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  built: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.STRING,
  },
  resources: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  },
  alter_name: {
    type: Sequelize.STRING
  },
  alter_email: {
    type: Sequelize.STRING,
  },
  alter_phone: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.STRING,
  },
  deletedAt: {
    type: Sequelize.STRING,
  },
}, {
  freezeTableName: true,
  sequelize: initSequelize(),
  timestamps: false,
  tableName: 'properties',
});

module.exports = User;
