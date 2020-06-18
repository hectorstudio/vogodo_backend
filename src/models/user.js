const { Sequelize, Model } = require('sequelize');
const { initSequelize } = require('../config/db');

class User extends Model {}
User.init({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  emailAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  },
  phone: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  membership: {
    type: Sequelize.INTEGER,
  },
  createdTime: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  passwordLastChanged: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  sequelize: initSequelize(),
  timestamps: false,
  tableName: 'users',
});

module.exports = User;
