const multer = require('multer');
const { User, Product, Order, Category, Image } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const helper = require('../utils/helpers');

////////////////////////////////////////////////////////////
// Multer Middleware
////////////////////////////////////////////////////////////
// [1] multerStorage specifies where file should be saved and with what name
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/profile');
  },
  filename: (req, file, cb) => {
    // File Name Structure
    // userId-imageName-timestamp.jpeg
    const ext = file.mimetype.split('/')[1];
    const item_name = file.originalname.split('.')[0];
    cb(null, `user-${req.session.user_id}-${item_name}-${Date.now()}.${ext}`);
  },
});

// [2] multerFilter checks whether the file uploaded is an Image
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an Image! Please upload only images.', 400), false);
  }
};

// [3] upload will finalize the file to be uploaded to the directory
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// [4] Function to initiate the upload process
exports.uploadUserPhoto = upload.single('profile_img_url');
////////////////////////////////////////////////////////////

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
// SHOW USER MESSAGES TAB
////////////////////////////////////////////////////////////

exports.getMessages = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;

  // find one user with id
  const usersFindOne = await User.findOne({
    raw: true,
    attributes: { exclude: ['password'] },
    where: { id },
  });

  res.render('userMessages', { loggedIn: true, user: usersFindOne });
});

////////////////////////////////////////////////////////////
// UPLOAD IMAGE
////////////////////////////////////////////////////////////

exports.uploadImage = catchAsync(async (req, res, next) => {
  console.log(req.file);

  res.status(201).json({
    message: 'success',
    data: req.file,
  });
});

////////////////////////////////////////////////////////////
// SHOW USER PROFILE PAGE
////////////////////////////////////////////////////////////

exports.userProfile = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;

  // find one user with id
  const usersFindOne = await User.findOne({
    raw: true,
    attributes: { exclude: ['password'] },
    where: { id },
  });

  res.render('userProfile', { loggedIn: true, user: usersFindOne });
});

////////////////////////////////////////////////////////////
// UPDATE USE PROFILE IMAGE
////////////////////////////////////////////////////////////

exports.updateUserImage = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;
  const profile_img_url = req.file.filename;

  console.log();

  // update user profile
  await User.update(
    { profile_img_url },
    {
      where: { id },
    }
  );

  res.status(201).json({
    message: 'success',
    data: profile_img_url,
  });
});
