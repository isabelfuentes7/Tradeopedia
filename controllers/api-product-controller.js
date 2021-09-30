const { Product, Category, User, Image } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

////////////////////////////////////////////////////////////
// GET ALL PRODUCTS
////////////////////////////////////////////////////////////

// The `/api/products` endpoint
exports.getAllProducts = catchAsync(async (req, res, next) => {
  //   // find all products
  const productsFindAll = await Product.findAll({
    include: [
      {
        model: Image,
      },
      {
        model: User,
        attributes: { exclude: ['password', 'id'] },
      },
    ],
  });

  res.status(200).json(productsFindAll);
});

////////////////////////////////////////////////////////////
// GET ONE PRODUCT
////////////////////////////////////////////////////////////
// The `/api/products/:id` endpoint
exports.getOneProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const productsFindOne = await Product.findOne({
    where: { id },
    include: [
      {
        model: Image,
      },
      {
        model: User,
        attributes: { exclude: ['password', 'id'] },
      },
    ],
  });

  //   Error handler for when ID does not exist
  if (!productsFindOne) {
    return next(new AppError('No Product found with that ID', 404));
  }

  res.status(200).json(productsFindOne);
});

////////////////////////////////////////////////////////////
// CREATE ONE PRODUCT
////////////////////////////////////////////////////////////

exports.createOneProduct = catchAsync(async (req, res, next) => {
  const productsCreateOne = await Product.create(req.body);
  res.status(201).json(productsCreateOne);
});

////////////////////////////////////////////////////////////
// UPDATE ONE PRODUCT
////////////////////////////////////////////////////////////

exports.putOneProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updateProduct = await Product.update(req.body, { where: { id } });
  res.status(201).json(updateProduct);
});

////////////////////////////////////////////////////////////
// DELETE ONE PRODUCT
////////////////////////////////////////////////////////////

exports.deleteOneProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const productsDestroyOne = await Product.destroy({ where: { id } });

  //   Error handler for when ID does not exist
  if (!productsDestroyOne) {
    return next(new AppError('No Product found with that ID', 404));
  }
  res.json(productsDestroyOne);
});
