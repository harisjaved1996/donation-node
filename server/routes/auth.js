const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.post('/login', authController.login);
// adding dummy Admin
router.post('/dummyAdmin', authController.dummyAdmin);
// XXXXXXXXXXXXXXXXXXXX
router.post('/logout', isAuth, authController.logout);

module.exports = router;
