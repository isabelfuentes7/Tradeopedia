const multer = require('multer');

////////////////////////////////////////////////////////////
// Multer Middleware: USER PROFULE
////////////////////////////////////////////////////////////
// [1] multerStorage specifies where file should be saved and with what name
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/profile');
  },
  filename: (req, file, cb) => {
    // File Name Structure
    // userId-imageName-timestamp.jpeg
    const ext = file.mimetype.split('/')[1];
    const item_name = file.originalname.split('.')[0];
    cb(null, `user-${req.session.user_id}-${item_name}-${Date.now()}.${ext}`);
  },
});

// [2] multerFilter checks whether the file uploaded is an Image
const profileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an Image! Please upload only images.', 400), false);
  }
};

// [3] upload will finalize the file to be uploaded to the directory
const uploadProfileImg = multer({
  storage: profileStorage,
  fileFilter: profileFilter,
});

////////////////////////////////////////////////////////////
// Multer Middleware: PRODUCT IMAGE
////////////////////////////////////////////////////////////
// [1] multerStorage specifies where file should be saved and with what name
const multerStorageProduct = multer.diskStorage({
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
const multerFilterProduct = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an Image! Please upload only images.', 400), false);
  }
};

// [3] upload will finalize the file to be uploaded to the directory
const uploadProduct = multer({
  storage: multerStorageProduct,
  fileFilter: multerFilterProduct,
});

// Produce Image Upload - Function to initiate the upload process / max-count = 3
exports.uploadProductPhotos = uploadProduct.array('product_img_url', 3);
// Profile Image Upload - Function to initiate the upload process
exports.uploadUserPhoto = uploadProfileImg.single('profile_img_url');
////////////////////////////////////////////////////////////
