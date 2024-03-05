const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// models
const HttpError = require('./models/http-error.js');

// routes
const usersRoutes = require('./routes/users-routes.js');
const authRoutes = require('./routes/auth-routes.js');
const projectsRoutes = require('./routes/projects-routes.js');

// environment variables
require('dotenv').config();
const MONGODB_ADMIN = process.env.MONGODB_ADMIN;
const MONGODB_OFFICE_PASSWORD = process.env.MONGODB_OFFICE_PASSWORD;

// app setup
const app = express();
const HOST = 'http://localhost';
let PORT;
const MONGODB_URI = `mongodb+srv://${MONGODB_ADMIN}:${MONGODB_OFFICE_PASSWORD}@cluster0.ylenmqg.mongodb.net/?retryWrites=true&w=majority`;

process.env.STATUS === 'production'
  ? (PORT = process.env.PROD_PORT)
  : (PORT = process.env.DEV_PORT);

// generic middlewares
app.use(bodyParser.json());

// handling CORS error (set headers for every response to allow CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// routes middlewares
app.use('/api/auth/', authRoutes);
app.use('/api/users/', usersRoutes);
app.use('/api/projects/', projectsRoutes);

// 404 route
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route!', 404);
  next(error);
});

// error handling
app.use((error, req, res, next) => {
  res
    .status(error.errorCode || 500)
    .json({ message: error.message } || 'An unknown server error occurred!');
});

// connect to mongodb and listen port
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB!');

    app.listen(PORT, () => {
      console.log(`Server is running on: ${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Connection to MongoDB failed!', error);
  });
