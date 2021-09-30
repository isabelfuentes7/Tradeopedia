const multer = require('multer');
const { Product, Image, User } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

////////////////////////////////////////////////////////////
// Multer Middleware
////////////////////////////////////////////////////////////
// [1] multerStorage specifies where file should be saved and with what name
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/products');
  },
  filename: (req, file, cb) => {
    // File Name Structure
    // userId-imageName-timestamp.jpeg
    const ext = file.mimetype.split('/')[1];
    const item_name = file.originalname.split('.')[0];
    cb(null, `${item_name}-${Date.now()}.${ext}`);
  },
});

// [2] multerFilter checks whether the file uploaded is an Image
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an Image! Please upload only images.', 400), false);
  }
};

// [3] upload will finalize the file to be uploaded to the directory
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// [4] Function to initiate the upload process / max-count = 3
exports.uploadProductPhotos = upload.array('product_img_url', 3);

////////////////////////////////////////////////////////////
// GET ALL IMAGES
////////////////////////////////////////////////////////////

// The `/api/images` endpoint
exports.getAllImages = catchAsync(async (req, res, next) => {
  const imageFindAll = await Image.findAll({
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
    raw: true,
    nest: true,
  });

  res.status(200).json(imageFindAll);
});

////////////////////////////////////////////////////////////
// GET ONE IMAGE
////////////////////////////////////////////////////////////

// The `/api/tags/:id` endpoint
exports.getOneImage = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const imageFindOne = await Image.findOne({
    where: { id },
    include: {
      model: Product,
    },
  });

  //   Error handler for when ID does not exist
  if (!imageFindOne) {
    return next(new AppError('No Order found with that ID', 404));
  }

  res.status(200).json(imageFindOne);
});

////////////////////////////////////////////////////////////
// POST IMAGE
////////////////////////////////////////////////////////////

exports.postMultipleImages = catchAsync(async (req, res, next) => {
  const product_id = req.body.product_id;
  const product_images = req.files;

  for (let i = 0; i < product_images.length; i++) {
    await Image.create({ product_id: product_id, product_img_url: product_images[i].filename });
  }

  res.status(201).json(req.files);
});
