const { User, Product, Order, Category, Image } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const helper = require('../utils/helpers');

////////////////////////////////////////////////////////////
// GET ONE USER
////////////////////////////////////////////////////////////
// The `/dashboard` endpoint
exports.getUserProfile = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;

  // find one user with id
  const usersFindOne = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id },
  });

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

  // render dashboard page and use the user first name for welcome message
  res.render('dashboard', { loggedIn: true, user: usersFindOne.dataValues, gallery_1: gallery1(filteredImageArr, 3), gallery_2: gallery2(filteredImageArr, 3), gallery_3: gallery3(filteredImageArr, 3) });
});

////////////////////////////////////////////////////////////
// GET USER PRODUCTS FOR SALE LIST
////////////////////////////////////////////////////////////
// The `/dashboard/products/` endpoint
exports.getOneUsersProducts = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;

  // find one user with id
  const usersFindOne = await User.findOne({
    raw: true,
    attributes: { exclude: ['password'] },
    where: { id },
  });

  res.render('userProducts', { loggedIn: true, user: usersFindOne });
});

////////////////////////////////////////////////////////////
// SHOW USER CREATE PRODUCTS PAGE
////////////////////////////////////////////////////////////
// The `/dashboard/create/` endpoint
exports.getOneUsersCreate = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;

  // find one user with id
  const usersFindOne = await User.findOne({
    raw: true,
    attributes: { exclude: ['password'] },
    where: { id },
  });

  const categoriesFindAll = await Category.findAll({
    raw: true,
    attributes: { exclude: ['id'] },
  });

  // user: usersFindOne.dataValues => for expressions used for partials [side nav bar]
  // category: usersFindOne.dataValues => for expressions used for partials [create product category list]
  res.render('userCreate', { loggedIn: true, user: usersFindOne, category: categoriesFindAll });
});

////////////////////////////////////////////////////////////
// CREATE ONE PRODUCT
////////////////////////////////////////////////////////////

exports.createOneProduct = catchAsync(async (req, res, next) => {
  const seller_id = req.session.user_id;
  const category_name = req.body.category_name;

  const categoriesFindAll = await Category.findAll({
    raw: true,
  });

  const findCategoryId = categoriesFindAll.find((el) => el.category_name === category_name);
  const category_id = findCategoryId.id;

  // To create a new object with the missing values
  const newProduct = Object.assign(req.body, { category_id: category_id, seller_id: seller_id });

  const productsCreateOne = await Product.create(newProduct);
  res.status(201).json(productsCreateOne);
});

////////////////////////////////////////////////////////////
// CREATE ONE PRODUCT
////////////////////////////////////////////////////////////

exports.getMessages = catchAsync(async (req, res, next) => {
  res.render('userMessages', { loggedIn: true });
});
