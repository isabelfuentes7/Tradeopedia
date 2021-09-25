const router = require('express').Router();
const withAuth = require('./../utils/auth');
const updateControls = require('./../controllers/update-controller');

const multerImporter = require('../utils/multerImporter');

//////////////////////////////////////////////////////////////////////
// UPDATE PROFILE PAGE
//////////////////////////////////////////////////////////////////////

// Update user profile image
router.put('/profile', withAuth, multerImporter.uploadUserPhoto, updateControls.updateUserImage);

//////////////////////////////////////////////////////////////////////
// UPDATE PRODUCT
//////////////////////////////////////////////////////////////////////

// Update user product
router.put('/product/:id', withAuth, multerImporter.uploadUserPhoto, updateControls.updateProduct);

router.delete('/product/:id', withAuth, multerImporter.uploadUserPhoto, updateControls.deleteProduct);

module.exports = router;
