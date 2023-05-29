const express = require('express');
const authController = require('../controllers/auth');
const { body } = require('express-validator');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.post('/login',[
    body('email').notEmpty().escape().withMessage('Email Required'),
    body('password').notEmpty().escape().withMessage('Password Required')
], authController.login);
// adding dummy Admin
router.post('/dummyAdmin', authController.dummyAdmin);
// XXXXXXXXXXXXXXXXXXXX
router.post('/logout', isAuth, authController.logout);

module.exports = router;
