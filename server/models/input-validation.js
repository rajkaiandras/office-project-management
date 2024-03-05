const { check } = require('express-validator');

const loginValidation = [
  check('email').not().isEmpty(),
  check('password').not().isEmpty(),
];

const signupValidation = [
  check('firstName').not().isEmpty(),
  check('lastName').not().isEmpty(),
  check('email').not().isEmpty(),
  check('password').not().isEmpty(),
];

const creatingProjectValidation = [
  check('projectName').not().isEmpty(),
  check('projectDetails').not().isEmpty(),
  check('dueDate').not().isEmpty(),
  check('category').not().isEmpty(),
  check('assignedTo').not().isEmpty(),
];

const updatingProjectValidation = [
  check('projectName').not().isEmpty(),
  check('projectDetails').not().isEmpty(),
  check('dueDate').not().isEmpty(),
  check('category').not().isEmpty(),
  check('assignTo').not().isEmpty(),
];

module.exports = {
  loginValidation,
  signupValidation,
  creatingProjectValidation,
  updatingProjectValidation,
};
