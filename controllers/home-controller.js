const { Product, Category, User, Image } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const helper = require('../utils/helpers');

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
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

////////////////////////////////////////////////////////////
// GO TO SIGNUP PAGE
////////////////////////////////////////////////////////////

exports.signUpPage = catchAsync(async (req, res, next) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});
