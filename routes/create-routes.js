const router = require('express').Router();
const withAuth = require('./../utils/auth');
const createControls = require('./../controllers/create-controller');

const multerImporter = require('../utils/multerImporter');

//////////////////////////////////////////////////////////////////////
// CREATE PRODUCT TO SELL
//////////////////////////////////////////////////////////////////////

// [1] Create product
router.post('/product', withAuth, createControls.createOneProduct);

// [2] Upload Product images
router.post('/product-image', withAuth, multerImporter.uploadProductPhotos, createControls.createProductImage);

module.exports = router;
