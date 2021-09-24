const router = require('express').Router();
const withAuth = require('./../utils/auth');
const dashboardControls = require('./../controllers/dashboard-controller');

// Show expore page as it is the default when user logs in
router.get('/', withAuth, dashboardControls.getUserProfile);

//////////////////////////////////////////////////////////////////////
// SHOW PRODUCT FOR SALE PAGE
//////////////////////////////////////////////////////////////////////

// Show products for sale page
router.get('/products/', withAuth, dashboardControls.getOneUsersProducts);

//////////////////////////////////////////////////////////////////////
// CREATE PRODUCT PAGE
//////////////////////////////////////////////////////////////////////

// Show create product page
router.get('/create/', withAuth, dashboardControls.getOneUsersCreate);

// Create product
router.post('/create/', withAuth, dashboardControls.createOneProduct);

// Upload Product images
router.post('/upload-image/', withAuth, dashboardControls.uploadImage);

//////////////////////////////////////////////////////////////////////
// MESSAGES PAGE
//////////////////////////////////////////////////////////////////////

// Show messages page
router.get('/messages/', withAuth, dashboardControls.getMessages);

//////////////////////////////////////////////////////////////////////
// PROFILE PAGE
//////////////////////////////////////////////////////////////////////

// Show profile page
router.get('/profile/', withAuth, dashboardControls.userProfile);

// Update user profile image
router.put('/profile/', withAuth, dashboardControls.uploadUserPhoto, dashboardControls.updateUserImage);

//////////////////////////////////////////////////////////////////////

module.exports = router;
