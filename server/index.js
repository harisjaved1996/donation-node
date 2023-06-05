// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Add this line
const cors = require('cors');

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

// starting app and connecting with the database
const port = 8080;

mongoose.connect('mongodb://127.0.0.1:27017/donation').then(result=>{
  console.log("app connected with database");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error=>{
  console.log("app did not connect with the mongodb",error);
})