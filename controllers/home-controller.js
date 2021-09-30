const { Product, Category, User, Image } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { uniqueArray, gallery } = require('../utils/helpers');

////////////////////////////////////////////////////////////
// GET ALL USERS
////////////////////////////////////////////////////////////
// The `/users/all` endpoint
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const usersFindAll = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  res.status(200).json(usersFindAll);
});

////////////////////////////////////////////////////////////
// CREATE USER
////////////////////////////////////////////////////////////
// The `/users/create/` endpoint
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
// The `/users/login` endpoint
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
// The `/users/logout` endpoint
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
// The `/` endpoint
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
    raw: true,
    nest: true,
    order: [['id', 'DESC']],
  });

  // In the instance the user has multiple photos,
  // create an array of only the first image for each product id
  const filteredImageArr = uniqueArray(imagesFindAll, 'product_id');

  // Render homepage handlebar +
  // loggedIn: req.session.loggedIn >>>>> checks whether session is a logged in user
  // the filtered image array gallery [see folder utils/helper = gallery for explanation]

  res.render('homepage', { loggedIn: req.session.loggedIn, gallery_1: gallery(filteredImageArr, 3, 3), gallery_2: gallery(filteredImageArr, 3, 2), gallery_3: gallery(filteredImageArr, 3, 1) });
});

////////////////////////////////////////////////////////////
// GET FILTERED PRODUCTS
////////////////////////////////////////////////////////////

// The `/:name` endpoint
exports.getFilteredProducts = catchAsync(async (req, res, next) => {
  const category_name = req.params.name;

  // find all products where category_id
  const imagesFindAll = await Image.findAll({
    raw: true,
    include: [
      {
        model: Product,
        where: { category_name },
      },
    ],
    raw: true,
    nest: true,
    order: [['id', 'DESC']],
  });

  // In the instance the user has multiple photos,
  // create an array of only the first image for each product id
  const filteredImageArr = uniqueArray(imagesFindAll, 'product_id');

  // Render homepage_filtered handlebar +
  // loggedIn: req.session.loggedIn >>>>> checks whether session is a logged in user
  // the filtered image array gallery [see folder utils/helper = gallery for explanation]
  res.render('homepage_filtered', { loggedIn: req.session.loggedIn, gallery_1: gallery(filteredImageArr, 3, 3), gallery_2: gallery(filteredImageArr, 3, 2), gallery_3: gallery(filteredImageArr, 3, 1) });
});
