const { Category, Product } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

////////////////////////////////////////////////////////////
// GET ALL CATEGORIES
////////////////////////////////////////////////////////////

// The `/api/categories` endpoint
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categoriesFindAll = await Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'product_price', 'product_description', 'category_name'],
    },
  });

  res.status(200).json(categoriesFindAll);
});

////////////////////////////////////////////////////////////
// GET ONE CATEGORY
////////////////////////////////////////////////////////////

// The `/api/categories/:id` endpoint
exports.getOneCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const categoriesFindOne = await Category.findOne({
    where: { id },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'product_price', 'product_description', 'category_name'],
    },
  });

  //   Error handler for when ID does not exist
  if (!categoriesFindOne) {
    return next(new AppError('No Category found with that ID', 404));
  }

  res.status(200).json(categoriesFindOne);
});

////////////////////////////////////////////////////////////
// CREATE ONE CATEGORY
////////////////////////////////////////////////////////////

// The `/api/categories/` endpoint
exports.postOneCategory = catchAsync(async (req, res, next) => {
  const category_name = req.body.category_name;
  const categoriesCreateOne = await Category.create({ category_name });
  res.status(200).json(categoriesCreateOne);
});

////////////////////////////////////////////////////////////
// UPDATE ONE CATEGORY
////////////////////////////////////////////////////////////

// The `/api/categories/:id` endpoint
exports.putOneCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const category_name = req.body.category_name;

  const categoriesUpdateOne = await Category.update(
    { category_name },
    {
      where: { id },
    }
  );

  // Error handler for when ID does not exist
  if (!categoriesUpdateOne) {
    return next(new AppError('No Category found with that ID', 404));
  }

  res.status(200).json(categoriesUpdateOne);
});

////////////////////////////////////////////////////////////
// DELETE ONE CATEGORY
////////////////////////////////////////////////////////////

// The `/api/categories/:id` endpoint
exports.deleteOneCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const categoriesFindOne = await Category.findOne({
    where: { id },
    include: {
      model: Product,
    },
  });

  categoriesFindOne.products.forEach((products) => {
    products.destroy();
  });

  categoriesFindOne.destroy();
  res.status(200).json(categoriesFindOne);
});
