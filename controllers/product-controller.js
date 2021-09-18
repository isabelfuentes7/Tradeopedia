const { Product, Category, Tag, ProductTag } = require('../models');
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
        model: Category,
        attributes: ['category_name'],
      },
      {
        model: Tag,
        attributes: ['tag_name'],
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
  const productsFindOne = await Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Category,
        attributes: ['category_name'],
      },
      {
        model: Tag,
        attributes: ['tag_name'],
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

// createTagID's
const bulkCreateTags = (productTagIds, productId) => {
  if (productTagIds.length) {
    const productTagIdArr = productTagIds.map((tag_id) => {
      return {
        product_id: productId,
        tag_id,
      };
    });

    return ProductTag.bulkCreate(productTagIdArr);
  }
};

exports.createOneProduct = catchAsync(async (req, res, next) => {
  const productsCreateOne = await Product.create(req.body);
  const productTagIds = req.body.tagIds;
  const productId = productsCreateOne.id;

  if (productTagIds.length) {
    const bulkProductTagIds = await bulkCreateTags(productTagIds, productId);
    res.status(200).json(bulkProductTagIds);
  } else {
    res.status(200).json(productsCreateOne);
  }
});

////////////////////////////////////////////////////////////
// UPDATE ONE PRODUCT
////////////////////////////////////////////////////////////

exports.putOneProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const bodyTagIds = req.body.tagIds;
  const updateProduct = await Product.update(req.body, { where: { id } });
  // find all associated tags from ProductTag
  const associatedTag = await ProductTag.findAll({ where: { product_id: req.params.id } });
  // get list of current tag_ids
  const productTagIds = associatedTag.map(({ tag_id }) => tag_id);
  // create filtered list of new tag_ids
  const newProductTags = bodyTagIds
    .filter((tag_id) => !productTagIds.includes(tag_id))
    .map((tag_id) => {
      return {
        product_id: bodyTagIds,
        tag_id,
      };
    });
  // figure out which ones to remove
  const productTagsToRemove = associatedTag.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id)).map(({ id }) => id);

  // run both actions
  const updatedProductTags = await Promise.all([ProductTag.destroy({ where: { id: productTagsToRemove } }), ProductTag.bulkCreate(newProductTags)]);

  res.json(updatedProductTags);
});

////////////////////////////////////////////////////////////
// DELETE ONE PRODUCT
////////////////////////////////////////////////////////////

exports.deleteOneProduct = catchAsync(async (req, res, next) => {
  const productsDestroyOne = await Product.destroy({
    where: {
      id: req.params.id,
    },
  });

  //   Error handler for when ID does not exist
  if (!productsDestroyOne) {
    return next(new AppError('No Product found with that ID', 404));
  }
  res.json(productsDestroyOne);
});
