const express = require('express');
const router = express.Router();

const fileUpload = require('../middleware/file-upload.js');

// users controllers
const usersControllers = require('../controllers/users-controllers.js');

// users routes
router.get('/', usersControllers.gettingUsersController);
router.get('/:uid', usersControllers.gettingUserByIdController);
router.post(
  '/upload/image',
  fileUpload.single('image'),
  usersControllers.uploadingUserImageController
);

module.exports = router;
