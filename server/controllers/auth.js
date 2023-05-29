// const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const { validationResult } = require('express-validator');
exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsMsg = errors.errors.map((err) => err.msg);
    return res.status(422).json({error:errorsMsg});
  }
  let loadedUser;
  const {email, password} = req.body;
  
  User.findOne({ where: { email: email } }).then(user=>{
    // 
    loadedUser = user;
    if(!loadedUser){
      return res.status(404).json({error:`Invalid Email`});
    }
    loadedUser=loadedUser.dataValues;
    bcrypt.compare(password, loadedUser.password).then((isEqual)=>{
      if(!isEqual){
        return res.status(404).json({ error: 'invalid Password' });
      } 
      const token = jwt.sign(
          {
          email:loadedUser.email,
          userId:loadedUser.id.toString(),
          userType:loadedUser.userType.toString()
          },
          'somesupersecretsecret',
          { expiresIn: '1h' }
      );
      return res.status(200).json({ token: token, userId: loadedUser.id.toString(), msg:'Login Successfully' });
    });
  }).catch(err=>{
    return res.status(500).json({error:`error on login api ${err}`});
  });
  
  
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

