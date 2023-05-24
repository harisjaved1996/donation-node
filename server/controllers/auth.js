// const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConnection = require("../util/database");

exports.login = (req, res, next) => {
  let loadedUser;
  const {email, password} = req.body;
  const sql = 'select * from users where email = ?';
  dbConnection.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error on login Api:', err);
      res.status(500).json({ error: 'Error on login' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'User with this email does not exist' });
    } else {
      loadedUser = results[0];
      bcrypt.compare(password, loadedUser.password).then((isEqual)=>{
        if(!isEqual){
            res.status(404).json({ error: 'invalid Password' });
        } else {
            const token = jwt.sign(
                {
                email:loadedUser.email,
                userId:loadedUser.id.toString(),
                userType:loadedUser.userType.toString()
                },
                'somesupersecretsecret',
                { expiresIn: '1h' }
            );
            res.status(200).json({ token: token, userId: loadedUser.id.toString(), msg:'Login Successfully' });
        } 
      });
    }
  });
};

exports.logout = (req, res, next) => {
  return res.status(200).json({ msg: 'Logged out successfully' });
};

