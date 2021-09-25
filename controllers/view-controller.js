const { User, Product, Order, Category, Image } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const helper = require('../utils/helpers');

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

  return usersFindOne;
};

////////////////////////////////////////////////////////////
// SHOW USER EXPLORE
////////////////////////////////////////////////////////////
// The `/view/user/explore/` endpoint
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
  });

  // const imageJSON = JSON.stringify(imagesFindAll, null, 2);

  // Create a unique array of the first image for each product id
  const filteredImageArr = helper.uniqueArray(imagesFindAll, 'product_id');

  // Create separate arrays for each column of the home page
  const gallery1 = (arr, nth) => arr.filter((e, i) => i % nth === nth - 3);
  const gallery2 = (arr, nth) => arr.filter((e, i) => i % nth === nth - 2);
  const gallery3 = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);

  // render dashboard page and use the user first name for welcome message
  res.render('userExplore', { loggedIn: true, user: usersFindOne, gallery_1: gallery1(filteredImageArr, 3), gallery_2: gallery2(filteredImageArr, 3), gallery_3: gallery3(filteredImageArr, 3) });
});

////////////////////////////////////////////////////////////
// SHOW USER DASHBOARD
////////////////////////////////////////////////////////////
// The `/view/user/dashboard/` endpoint
exports.getUserDashboard = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;
  const usersFindOne = await getOneUser(id);

  res.render('userDashboard', { loggedIn: true, user: usersFindOne });
});

////////////////////////////////////////////////////////////
// SHOW USER PRODUCTS FOR SALE TAB
////////////////////////////////////////////////////////////
// The `/view/user/profile/` endpoint
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

  const filteredImageArr = helper.uniqueArray(productFindAll, 'product_id');

  const gallery1 = (arr, nth) => arr.filter((e, i) => i % nth === nth - 3);
  const gallery2 = (arr, nth) => arr.filter((e, i) => i % nth === nth - 2);
  const gallery3 = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);

  console.log(gallery3(filteredImageArr, 3));

  res.render('userProducts', { loggedIn: true, user: usersFindOne, productFindAll, gallery_1: gallery1(filteredImageArr, 3), gallery_2: gallery2(filteredImageArr, 3), gallery_3: gallery3(filteredImageArr, 3) });
});

////////////////////////////////////////////////////////////
// SHOW USER CREATE PRODUCTS PAGE
////////////////////////////////////////////////////////////
// The `/view/user/create/` endpoint
exports.getUserCreate = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;
  const usersFindOne = await getOneUser(id);

  const categoriesFindAll = await Category.findAll({
    raw: true,
    attributes: { exclude: ['id'] },
  });

  res.render('userCreate', { loggedIn: true, user: usersFindOne, category: categoriesFindAll });
});

////////////////////////////////////////////////////////////
// SHOW USER MESSAGES TAB
////////////////////////////////////////////////////////////
// The `/view/user/messages/` endpoint
exports.getUserMessages = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;
  const usersFindOne = await getOneUser(id);

  res.render('userMessages', { loggedIn: true, user: usersFindOne });
});

////////////////////////////////////////////////////////////
// SHOW USER PROFILE TAB
////////////////////////////////////////////////////////////
// The `/view/user/messages/` endpoint
exports.getUserProfile = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;
  const usersFindOne = await getOneUser(id);

  res.render('userProfile', { loggedIn: true, user: usersFindOne });
});

////////////////////////////////////////////////////////////
// SHOW USER PRODUCT EDIT PAGE
////////////////////////////////////////////////////////////

// The `/view/user/messages/` endpoint
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

  res.render('userEditProduct', { loggedIn: true, user: usersFindOne, product, category: categoriesFindAll });
  // res.render('userEditProduct', { loggedIn: true });
});
