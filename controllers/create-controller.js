const { User, Product, Category, Image } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const helper = require('../utils/helpers');

////////////////////////////////////////////////////////////
// CREATE ONE PRODUCT
////////////////////////////////////////////////////////////
// [1] PRODUCT CREATION
exports.createOneProduct = catchAsync(async (req, res, next) => {
  const seller_id = req.session.user_id;

  const { product_name, product_price, product_description, category_name } = req.body;

  const categoriesFindAll = await Category.findAll({
    where: { category_name },
    raw: true,
    nest: true,
  });

  const category_id = categoriesFindAll[0].id;

  const productsCreateOne = await Product.create({ product_name, product_price, product_description, category_name, category_id, seller_id, created_at: new Date() });

  res.status(201).json(productsCreateOne);
});

// [2] PRODUCT IMAGE UPLOAD
exports.createProductImage = catchAsync(async (req, res, next) => {
  const product_id = req.body.product_id;
  const product_images = req.files;

  for (let i = 0; i < product_images.length; i++) {
    const product_img_uploaded = await Image.create({ product_id: product_id, product_img_url: product_images[i].filename });
  }

  res.status(201).json({
    message: 'success',
    data: req.files,
  });
});
