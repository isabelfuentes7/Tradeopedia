const { Tag, Product } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

////////////////////////////////////////////////////////////
// GET ALL ORDERS
////////////////////////////////////////////////////////////

// The `/api/tags` endpoint
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
  const ordersFindOne = await Order.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
    },
  });

  //   Error handler for when ID does not exist
  if (!tagsFindOne) {
    return next(new AppError('No Order found with that ID', 404));
  }

  res.status(200).json(ordersFindOne);
});

////////////////////////////////////////////////////////////
// CREATE ONE ORDER
////////////////////////////////////////////////////////////

// The `/api/tags/` endpoint
// exports.postOneOrder = catchAsync(async (req, res, next) => {
//   const ordersCreateOne = await Order.create({
//     tag_name: req.body.tag_name,
//   });

//   res.status(200).json(ordersCreateOne);
// });

////////////////////////////////////////////////////////////
// UPDATE ONE ORDER
////////////////////////////////////////////////////////////
// TODO - Not sure as of right now

// The `/api/tags/:id` endpoint
// exports.putOneOrder = catchAsync(async (req, res, next) => {
//   const orderUpdateOne = await Order.update(
//     {
//       tag_name: req.body.tag_name,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   );

//   // Error handler for when ID does not exist
//   if (!tagsUpdateOne) {
//     return next(new AppError('No Order found with that ID', 404));
//   }

//   res.status(200).json(orderUpdateOne);
// });

////////////////////////////////////////////////////////////
// DELETE ONE ORDER
////////////////////////////////////////////////////////////

// The `/api/tags/:id` endpoint
exports.deleteOneOrder = catchAsync(async (req, res, next) => {
  const ordersFindOne = await Order.destroy({
    where: {
      id: req.params.id,
    },
  });

  // Error handler for when ID does not exist
  if (!ordersFindOne) {
    return next(new AppError('No Order found with that ID', 404));
  }

  res.json(ordersFindOne);
});
