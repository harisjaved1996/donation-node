// const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

exports.login = (req, res, next) => {
  let loadedUser;
  const {email, password} = req.body;
  bcrypt.hash(password, 12).then(hashedPw => {
    User.create({ name:'haris',email:email,password:hashedPw,userType:1 }).then(result=>{
      return res.status(200).json({result:result});
    }).catch(error=>{
      return res.status(500).json({error:error});
    })
  });
  
  // User.findOne({ where: { email: email } }).then(user=>{
  //   return res.status(200).json({users:user[0]});
  // }).catch(err=>{
  //   return res.status(500).json({error:`error on login api ${err}`});
  // });


  /*
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
  */
};

exports.dummyAdmin = (req, res, next) => {
  const {email, password} = req.body;
  bcrypt.hash(password, 12).then(hashedPw => {
    // Truncate the table
    User.destroy({truncate: true}).then(result=>{
      return User.create({ name:'haris',email:email,password:hashedPw,userType:1 });
    }).then(result=>{
      return res.status(200).json({result:result});
    }).catch(error=>{
      return res.status(500).json({error:error});
    })
  });
};

exports.logout = (req, res, next) => {
  return res.status(200).json({ msg: 'Logged out successfully' });
};

