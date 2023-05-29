// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Add this line
const cors = require('cors');

// Will use this to create the models (tales) in the database
const sequelize = require('./util/database');
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

// sync the tables of the database
const port = 8080;
sequelize.sync({ alter: true }).then(result=>{
  console.log("=====Result====",result);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error=>{
  console.log("error",error);
});


