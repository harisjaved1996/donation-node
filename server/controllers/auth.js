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
  
  User.findOne({ email: email }).then(user=>{
    loadedUser = user;
    if(!loadedUser){
      return res.status(404).json({error:`Invalid Email`});
    }
    bcrypt.compare(password, loadedUser.password).then((isEqual)=>{
      if(!isEqual){
        return res.status(404).json({ error: 'invalid Password' });
      } 
      const token = jwt.sign(
          {
          email:loadedUser.email,
          userId:loadedUser._id.toString(),
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

exports.registration = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.errors.map((err) => err.msg);
    return res.status(422).json({error:errors});
  }
  const {name,email, password} = req.body;
  User.findOne({ email: email }).then(user=>{
    if(user){
      return res.status(422).json({error:"User Already Exist with this email"});
    }
    bcrypt.hash(password, 12).then(hashedPw => {
      const user = new User({
        name:name,
        email: email,
        password:hashedPw
      });
      user.save().then(result=>{
        res.status(201).json({msg:"User Created Successfully"});
      }).catch(error=>{
        return res.status(500).json({error:error});
      });
    });
  }).catch(error=>{
      return res.status(500).json({error:error});
  });
};

exports.logout = (req, res, next) => {
  return res.status(200).json({ msg: 'Logged out successfully' });
};

