// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Add this line
const cors = require('cors');

// checking here db connected successfully or not. you will get just a confirmation message on your console , nothing else
const dbConnection = require('./util/database');
// 

// Addming Admin Routes
const adminRoutes = require('./routes/admin');

// auth routes
const authRoutes = require('./routes/auth');

// Create Express app
const app = express();

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors()); 

// admin routes will go there
app.use('/admin', adminRoutes);

// auth routes will go there
app.use('/auth', authRoutes);

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
