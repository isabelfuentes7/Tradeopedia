const { Order, Product, User } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

////////////////////////////////////////////////////////////
// GET ALL ORDERS
////////////////////////////////////////////////////////////

// The `/api/orders` endpoint
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const ordersFindAll = await Order.findAll({
    include: {
      model: Product,
    },
  });

  res.status(200).json(ordersFindAll);
});

////////////////////////////////////////////////////////////
// GET ONE ORDER
////////////////////////////////////////////////////////////

// The `/api/tags/:id` endpoint
exports.getOneOrder = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const ordersFindOne = await Order.findOne({
    where: { id },
    include: {
      model: Product,
    },
  });

  //   Error handler for when ID does not exist
  if (!ordersFindOne) {
    return next(new AppError('No Order found with that ID', 404));
  }

  res.status(200).json(ordersFindOne);
});
