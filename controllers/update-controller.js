const { User, Product, Category, Image } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

////////////////////////////////////////////////////////////
// UPDATE USE PROFILE IMAGE
////////////////////////////////////////////////////////////

exports.updateUserImage = catchAsync(async (req, res, next) => {
  const id = req.session.user_id;
  const profile_img_url = req.file.filename;

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

////////////////////////////////////////////////////////////
// UPDATE USER PRODUCT
////////////////////////////////////////////////////////////

exports.updateProduct = catchAsync(async (req, res, next) => {
  const id = req.body.id;
  const product_name = req.body.product_name;
  const product_price = req.body.product_price;
  const product_description = req.body.product_description;
  const category_name = req.body.category_name;
  const seller_id = req.session.user_id;

  // Error handler for when ID does not exist

  const productUpdate = await Product.update(
    { product_name, product_price, product_description, category_name, seller_id },
    {
      where: { id },
    }
  );
  res.status(201).json(productUpdate);
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const id = req.body.id;

  const productFind = await Product.findOne({
    where: { id },
    include: [Image],
  });

  productFind.images.forEach((image) => {
    image.destroy();
  });

  productFind.destroy();
  res.end();
});
