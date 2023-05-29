const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Foundation = sequelize.define('foundation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: DataTypes.TEXT,
  website_link: DataTypes.TEXT,
  owner_name: DataTypes.TEXT,
});

module.exports = Foundation;
