const express = require('express');
const router = express.Router();

// users controllers
const usersControllers = require('../controllers/users-controllers.js');

// users routes
router.get('/', usersControllers.gettingUsersController);
router.get('/:uid', usersControllers.gettingUserByIdController);

module.exports = router;
