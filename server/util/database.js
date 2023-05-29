const Sequelize = require('sequelize');

const sequelize = new Sequelize('donation', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
  
module.exports = sequelize;
