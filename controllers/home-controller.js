const { Product, Category, User, Image } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const helper = require('../utils/helpers');

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
// CREATE USER
////////////////////////////////////////////////////////////
// The `/api/users/` endpoint
exports.createOneUser = catchAsync(async (req, res, next) => {
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

////////////////////////////////////////////////////////////
// GET ALL PRODUCTS
////////////////////////////////////////////////////////////

// The `/api/products` endpoint
exports.getAllProducts = catchAsync(async (req, res, next) => {
  // find all products
  const imagesFindAll = await Image.findAll({
    raw: true,
    include: [
      {
        model: Product,
        include: [
          {
            model: User,
            attributes: { exclude: ['password'] },
          },
        ],
      },
    ],
  });

  // Create a unique array of the first image for each product id
  const filteredImageArr = helper.uniqueArray(imagesFindAll, 'product_id');

  // Create separate arrays for each column of the home page
  const gallery1 = (arr, nth) => arr.filter((e, i) => i % nth === nth - 3);
  const gallery2 = (arr, nth) => arr.filter((e, i) => i % nth === nth - 2);
  const gallery3 = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);

  // render the home page
  res.render('homepage', { loggedIn: req.session.loggedIn, gallery_1: gallery1(filteredImageArr, 3), gallery_2: gallery2(filteredImageArr, 3), gallery_3: gallery3(filteredImageArr, 3) });
});

////////////////////////////////////////////////////////////
// GO TO LOGIN PAGE
////////////////////////////////////////////////////////////
exports.loginPage = catchAsync(async (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

////////////////////////////////////////////////////////////
// GO TO SIGNUP PAGE
////////////////////////////////////////////////////////////

exports.signUpPage = catchAsync(async (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});
