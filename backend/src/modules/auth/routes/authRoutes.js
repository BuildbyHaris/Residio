const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerRules, validate } = require('../validations/registerValidation');

router.post('/register', registerRules, validate, authController.register);

module.exports = router;
