const express = require('express');
const router = express.Router();

// auth controllers
const authControllers = require('../controllers/auth-controllers.js');

// input validation
const inputValidation = require('../models/input-validation.js');

// routes
router.post(
  '/signup',
  inputValidation.signupValidation,
  authControllers.signupController
);
router.post(
  '/login',
  inputValidation.loginValidation,
  authControllers.loginController
);

module.exports = router;
