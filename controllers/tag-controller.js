const { Tag, Product } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

////////////////////////////////////////////////////////////
// GET ALL TAGS
////////////////////////////////////////////////////////////

// The `/api/tags` endpoint
exports.getAllTags = catchAsync(async (req, res, next) => {
  const tagsFindAll = await Tag.findAll({
    include: {
      model: Product,
    },
  });

  res.status(200).json(tagsFindAll);
});

////////////////////////////////////////////////////////////
// GET ONE CATEGORY
////////////////////////////////////////////////////////////

// The `/api/tags/:id` endpoint
exports.getOneTag = catchAsync(async (req, res, next) => {
  const tagsFindOne = await Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
    },
  });

  //   Error handler for when ID does not exist
  if (!tagsFindOne) {
    return next(new AppError('No Category found with that ID', 404));
  }

  res.status(200).json(tagsFindOne);
});

////////////////////////////////////////////////////////////
// CREATE ONE TAG
////////////////////////////////////////////////////////////

// The `/api/tags/` endpoint
exports.postOneTag = catchAsync(async (req, res, next) => {
  const categoriesCreateOne = await Tag.create({
    tag_name: req.body.tag_name,
  });

  res.status(200).json(categoriesCreateOne);
});

////////////////////////////////////////////////////////////
// UPDATE ONE TAG
////////////////////////////////////////////////////////////

// The `/api/tags/:id` endpoint
exports.putOneTag = catchAsync(async (req, res, next) => {
  const tagsUpdateOne = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  // Error handler for when ID does not exist
  if (!tagsUpdateOne) {
    return next(new AppError('No Tag found with that ID', 404));
  }

  res.status(200).json(tagsUpdateOne);
});

////////////////////////////////////////////////////////////
// DELETE ONE TAG
////////////////////////////////////////////////////////////

// The `/api/tags/:id` endpoint
exports.deleteOneTag = catchAsync(async (req, res, next) => {
  const tagsFindOne = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });

  // Error handler for when ID does not exist
  if (!tagsFindOne) {
    return next(new AppError('No Tag found with that ID', 404));
  }

  res.json(tagsFindOne);
});
