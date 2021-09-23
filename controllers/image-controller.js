const { Product, Image } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

////////////////////////////////////////////////////////////
// GET ALL IMAGES
////////////////////////////////////////////////////////////

// The `/api/orders` endpoint
exports.getAllImages = catchAsync(async (req, res, next) => {
  const imageFindAll = await Image.findAll({});

  res.status(200).json(imageFindAll);
});
