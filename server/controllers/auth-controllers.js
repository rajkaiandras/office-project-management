const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error.js');
const User = require('../models/user-schema.js');

const signupController = async (req, res, next) => {
  console.log('POST request in /api/auth - signup route!');

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const error = new HttpError('Invalid input, please check your data!', 422);
    return next(error);
  }

  const { firstName, lastName, email, password } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  let userExists;
  try {
    userExists = await User.find({ email }).exec();

    if (userExists.length !== 0) {
      const error = new HttpError(
        `Account with provided email (${email}) already exists!`,
        409
      );
      return next(error);
    } else {
      await newUser.save();
      res.status(201).json({
        message: 'Your account has been created!',
        user: {
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        },
      });
    }
  } catch (err) {
    const error = new HttpError('Creating new user failed!', 500);
    return next(error);
  }
};

const loginController = async (req, res, next) => {
  console.log('POST request in /api/auth - login route!');

  // request body (frontend form input data) validation
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const error = new HttpError('Invalid input, please check your data!', 422);
    next(error);
  }

  // find user with provided credentials
  const { email, password } = req.body;

  let user;
  try {
    user = await User.find({ email, password }).exec();

    if (user.length === 0) {
      const error = new HttpError(
        'Invalid credentials, failed to log in!',
        401
      );
      return next(error);
    }

    res.json({
      message: 'You successfully logged in!',
      user: {
        _id: user[0]._id,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
      },
    });
  } catch (err) {
    const error = new HttpError('Log in failed! Server error occurred!', 500);
    return next(error);
  }
};

module.exports = {
  signupController: signupController,
  loginController: loginController,
};
