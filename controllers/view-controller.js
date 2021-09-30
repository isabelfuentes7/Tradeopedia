const { User, Product, Category, Image } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { uniqueArray, uniqueArray2, gallery } = require('../utils/helpers');

////////////////////////////////////////////////////////////
// FIND ONE USER
////////////////////////////////////////////////////////////
const getOneUser = (id) => {
  // find one user with id
  const usersFindOne = User.findOne({
    raw: true,
    attributes: { exclude: ['password'] },
    where: { id },
  });

  if (!usersFindOne) {
    return next(new AppError('No User found with that ID', 404));
  }

  return usersFindOne;
};

////////////////////////////////////////////////////////////
// SHOW USER EXPLORE
////////////////////////////////////////////////////////////
// The `/view/user/explore` endpoint
exports.getUserExplore = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;
  const usersFindOne = await getOneUser(id);

  // find all products
  const imagesFindAll = await Image.findAll({
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

  // Render userExplore handlebar +
  // the users info to be used for the side bar bottom section welcome message +
  // the filtered image array gallery [see helper for explanation]

  res.render('userExplore', { loggedIn: req.session.loggedIn, user: usersFindOne, gallery_1: gallery(filteredImageArr, 3, 3), gallery_2: gallery(filteredImageArr, 3, 2), gallery_3: gallery(filteredImageArr, 3, 1) });
});

////////////////////////////////////////////////////////////
// SHOW USER EXPLORE FILTERED PAGE
////////////////////////////////////////////////////////////
// The `/view/user/explore/:name` endpoint
exports.getFilteredProducts = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;
  const category_name = req.params.name;

  const usersFindOne = await getOneUser(id);
  // // find all products that match categeory name
  const imagesFindAll = await Image.findAll({
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

  // Render userExplore handlebar +
  // the users info to be used for the side bar bottom section welcome message +
  // the filtered image array gallery [see helper for explanation]

  res.render('userExplore', { loggedIn: req.session.loggedIn, user: usersFindOne, gallery_1: gallery(filteredImageArr, 3, 3), gallery_2: gallery(filteredImageArr, 3, 2), gallery_3: gallery(filteredImageArr, 3, 1) });
});

////////////////////////////////////////////////////////////
// SHOW USER DASHBOARD
////////////////////////////////////////////////////////////
// The `/view/user/dashboard` endpoint
exports.getUserDashboard = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;
  const usersFindOne = await getOneUser(id);

  res.render('userDashboard', { loggedIn: true, user: usersFindOne });
});

////////////////////////////////////////////////////////////
// SHOW USER PRODUCTS FOR SALE TAB
////////////////////////////////////////////////////////////
// The `/view/user/products` endpoint
exports.getUserProducts = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;
  const usersFindOne = await getOneUser(id);

  const productFindAll = await Image.findAll({
    include: [
      {
        model: Product,
        where: { seller_id: id },
      },
    ],
    raw: true,
    nest: true,
    order: [['id', 'DESC']],
  });

  // In the instance the user has multiple photos,
  // create an array of only the first image for each product id
  const filteredImageArr = uniqueArray(productFindAll, 'product_id');

  // Render userProducts handlebar +
  // the users info to be used for the side bar bottom section welcome message +
  // the filtered image array gallery [see helper for explanation]
  res.render('userProducts', { loggedIn: req.session.loggedIn, user: usersFindOne, gallery_1: gallery(filteredImageArr, 3, 3), gallery_2: gallery(filteredImageArr, 3, 2), gallery_3: gallery(filteredImageArr, 3, 1) });
});

////////////////////////////////////////////////////////////
// SHOW USER CREATE PRODUCTS PAGE
////////////////////////////////////////////////////////////
// The `/view/user/create` endpoint
exports.getUserCreate = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;
  const usersFindOne = await getOneUser(id);

  const categoriesFindAll = await Category.findAll({
    raw: true,
    attributes: { exclude: ['id'] },
  });

  res.render('userCreate', { loggedIn: req.session.loggedIn, user: usersFindOne, category: categoriesFindAll });
});

////////////////////////////////////////////////////////////
// SHOW USER PROFILE TAB
////////////////////////////////////////////////////////////
// The `/view/user/profile` endpoint
exports.getUserProfile = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;
  const usersFindOne = await getOneUser(id);

  res.render('userProfile', { loggedIn: req.session.loggedIn, user: usersFindOne });
});

////////////////////////////////////////////////////////////
// SHOW USER PRODUCT EDIT PAGE
////////////////////////////////////////////////////////////
// The `/view/user/edit-product/:id` endpoint
exports.putUserCreate = catchAsync(async (req, res, next) => {
  const user_id = req.session.user_id;
  const product_id = req.params.id;

  const usersFindOne = await getOneUser(user_id);

  const product = await Product.findOne({
    where: { id: product_id },
    raw: true,
  });

  const categoriesFindAll = await Category.findAll({
    raw: true,
    attributes: { exclude: ['id'] },
  });

  res.render('userEditProduct', { loggedIn: req.session.loggedIn, user: usersFindOne, product, category: categoriesFindAll });
});
