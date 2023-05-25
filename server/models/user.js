const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
  userType: {
    type:DataTypes.INTEGER,
    comment: '1=admin'
  }
});

module.exports = User;
