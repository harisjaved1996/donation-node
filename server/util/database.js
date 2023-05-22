const mysql = require('mysql');
// Create MySQL connection
const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'donation'
});
// Connect to MySQL
dbConnection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
});
module.exports = dbConnection;