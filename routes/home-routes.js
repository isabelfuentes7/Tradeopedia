const router = require('express').Router();
const homeControls = require('./../controllers/home-controller');
const withAuth = require('./../utils/auth');

//////////////////////////////////////////////////////////////////////
// SIGNUP USER + LOGIN USER + LOGOUT USER + GET ALL USERS
//////////////////////////////////////////////////////////////////////

// CREATE ONE USER
router.post('/users/create', homeControls.createOneUser);

// LOGIN USERS
router.post('/users/login', homeControls.loginUser);

// LOGOUT USERS
router.post('/users/logout', withAuth, homeControls.logoutUser);

// GET ALL USERS
router.get('/users/all', homeControls.getAllUsers);

//////////////////////////////////////////////////////////////////////
// LOGGED OUT - SHOW HOME PAGE
//////////////////////////////////////////////////////////////////////
// The `/` endpoint
router.get('/', homeControls.getAllProducts);
// The `/:name` endpoint
router.get('/home/:name', homeControls.getFilteredProducts);

module.exports = router;
