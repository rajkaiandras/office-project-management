// models
const HttpError = require('../models/http-error.js');
const User = require('../models/user-schema.js');

// users controllers
const gettingUsersController = async (req, res, next) => {
  console.log('GET request in /api/users - getUsers route!');

  try {
    const users = await User.find();

    // RESPONSE CAN'T CONTAIN CREDENTIALS
    // const filtered = users.map((user) => {
    //   return Object.fromEntries(
    //     Object.entries(user).filter(
    //       ([key]) =>
    //         key.includes('_id') ||
    //         key.includes('firstName') ||
    //         key.includes('lastName')
    //     )
    //   );
    // });

    res.json(users);
  } catch (err) {
    const error = new HttpError(
      'Could not find any user in the database!',
      404
    );
    return next(error);
  }
};

const gettingUserByIdController = async (req, res, next) => {
  console.log('GET request in /api/users/:uid - get user by id route!');

  const userId = req.params.uid;

  try {
    const user = await User.findById(userId);
    res.json(user);
  } catch (err) {
    const error = new HttpError(
      'Could not find user with provided user id!',
      404
    );
    return next(error);
  }
};

module.exports = {
  gettingUsersController,
  gettingUserByIdController,
};
