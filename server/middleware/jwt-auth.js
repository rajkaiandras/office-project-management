const jwt = require('jsonwebtoken');
require('dotenv').config();

const HttpError = require('../models/http-error');

const jwtAuth = (req, res, next) => {
  if (req.method === 'OPTIONS') return next();

  try {
    const token = req.headers.authorization.split('Bearer ')[1]; // Authorization: 'Bearer Token'
    if (!token) {
      throw new Error('Authentication FAILED!');
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication FAILED', 401);
    return next(error);
  }
};

module.exports = jwtAuth;
