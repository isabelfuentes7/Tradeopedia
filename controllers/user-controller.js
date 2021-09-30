const { User, Product } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

////////////////////////////////////////////////////////////
// GET ONE USER
////////////////////////////////////////////////////////////
// The `/api/users/:id` endpoint
exports.getOneUsers = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const usersFindOne = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id },
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

  // Error handler for when ID does not exist
  if (!usersFindOne) {
    return next(new AppError('No User found with that ID', 404));
  }

  res.status(200).json(usersFindOne);
});
