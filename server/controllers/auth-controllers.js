const { validationResult } = require('express-validator');

// hash, encrypt password
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

require('dotenv').config();

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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again!',
      500
    );
    return next(error);
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  let existingUser;
  try {
    existingUser = await User.find({ email }).exec();

    if (existingUser.length !== 0) {
      const error = new HttpError(
        `Account with provided email (${email}) already exists!`,
        409
      );
      return next(error);
    } else {
      await newUser.save();

      let token;
      const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
      try {
        token = jwt.sign(
          {
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
          },
          JWT_SECRET_KEY,
          { expiresIn: '1h' }
        );
      } catch (err) {
        const error = new HttpError(
          'Signing up failed, please try again later.',
          500
        );
        return next(error);
      }

      res.status(201).json({
        message: 'Your account has been created!',
        user: {
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          token: token,
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

  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.find({ email }).exec();

    if (existingUser.length === 0) {
      const error = new HttpError(
        'Invalid email address, failed to log in!',
        401
      );
      return next(error);
    }

    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(
        password,
        existingUser[0].password
      );
    } catch (err) {
      const error = new HttpError(
        'Could not log you in, please check your credentials and try again!',
        500
      );
      return next(error);
    }

    if (!isValidPassword) {
      const error = new HttpError('Invalid password, failed to log in!', 401);
      return next(error);
    }

    let token;
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    try {
      token = jwt.sign(
        {
          _id: existingUser[0]._id,
          firstName: existingUser[0].firstName,
          lastName: existingUser[0].lastName,
          email: existingUser[0].email,
        },
        JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }

    res.json({
      message: 'You successfully logged in!',
      user: {
        _id: existingUser[0]._id,
        firstName: existingUser[0].firstName,
        lastName: existingUser[0].lastName,
        image: existingUser[0].image,
        token: token,
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
