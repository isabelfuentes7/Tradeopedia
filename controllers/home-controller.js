const { Product, Category, User } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

////////////////////////////////////////////////////////////
// GET ALL PRODUCTS
////////////////////////////////////////////////////////////

// The `/api/products` endpoint
exports.getAllProducts = catchAsync(async (req, res, next) => {
  // find all products
  // const productsFindAll = await Product.findAll({
  //   include: [
  //     {
  //       model: Category,
  //       attributes: ['category_name'],
  //     },
  //     {
  //       model: User,
  //       attributes: { exclude: ['password', 'id'] },
  //     },
  //   ],
  // });

  // const productsAll = productsFindAll.map((product) => product.get({ plain: true }));
  // res.render('homepage', { productsAll, loggedIn: req.session.loggedIn });
  res.render('homepage', { loggedIn: req.session.loggedIn });
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
