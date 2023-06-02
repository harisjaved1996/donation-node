const express = require('express');
const authController = require('../controllers/auth');
const { body } = require('express-validator');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.post('/login',[
    body('email').notEmpty().escape().isEmail().normalizeEmail().withMessage("Invalid Email Value"),
    body('password').notEmpty().escape().withMessage('Password is Required')
], authController.login);
// registration
router.post('/registration',[
    body('name').notEmpty().escape().withMessage("Name is Required"),
    body('email').notEmpty().escape().isEmail().normalizeEmail().withMessage("Invalid Email Value"),
    body('password').notEmpty().escape().withMessage('Password is Required').custom((value, { req })=>{
        if (value != req.body.cpassword) {
            throw new Error('Passwords do not match with Confirm Password');
        }
        return true
    }),
    body('cpassword').notEmpty().escape().withMessage('Confirm Password is Required')
] ,authController.registration);
// XXXXXXXXXXXXXXXXXXXX
router.post('/logout', isAuth, authController.logout);

module.exports = router;
