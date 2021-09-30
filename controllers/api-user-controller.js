const { User, Product, Image } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

////////////////////////////////////////////////////////////
// GET ALL USERS
////////////////////////////////////////////////////////////

// The `/api/users` endpoint
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const usersFindAll = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  res.status(200).json(usersFindAll);
});

////////////////////////////////////////////////////////////
// GET ONE USER
////////////////////////////////////////////////////////////
// The `/api/users/:id` endpoint
exports.getOneUsers = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const usersFindOne = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id },
    include: [
      {
        model: Product,
      },
    ],
  });

  // Error handler for when ID does not exist
  if (!usersFindOne) {
    return next(new AppError('No User found with that ID', 404));
  }

  res.status(200).json(usersFindOne);
});

////////////////////////////////////////////////////////////
// CREATE USER
////////////////////////////////////////////////////////////
// The `/api/users/` endpoint
exports.postOneUser = catchAsync(async (req, res, next) => {
  const createOneUser = await User.create(req.body);

  await req.session.save(() => {
    req.session.user_id = createOneUser.id;
    req.session.username = createOneUser.username;
    req.session.loggedIn = true;
  });

  res.status(201).json(createOneUser);
});

////////////////////////////////////////////////////////////
// LOGIN USER
////////////////////////////////////////////////////////////
// The `/api/users/login` endpoint
exports.loginUser = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const dbUserData = await User.findOne({ where: { email } });

  // Error handler for when ID does not exist
  if (!dbUserData) {
    return next(new AppError('No User found with that Email', 404));
  }

  const validatePassword = dbUserData.checkPassword(password);

  if (!validatePassword) {
    return next(new AppError('Invalid Password', 404));
  }

  req.session.save(() => {
    // declare session variables
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;
    res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
  });
});

////////////////////////////////////////////////////////////
// LOGOUT USER
////////////////////////////////////////////////////////////
// The `/api/users/logout` endpoint
exports.logoutUser = catchAsync(async (req, res, next) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
