const router = require('express').Router();
const homeControls = require('./../controllers/home-controller');

//////////////////////////////////////////////////////////////////////
// SIGNUP USER + LOGIN USER + LOGOUT USER + GET ALL USERS
//////////////////////////////////////////////////////////////////////

// CREATE ONE USER
router.post('/users/create/', homeControls.createOneUser);

// LOGIN USERS
router.post('/users/login/', homeControls.loginUser);

// LOGOUT USERS
router.post('/users/logout/', homeControls.logoutUser);

// GET ALL USERS
router.get('/users/all/', homeControls.getAllUsers);

//////////////////////////////////////////////////////////////////////
// LOGGED OUT - SHOW HOME PAGE
//////////////////////////////////////////////////////////////////////
router.get('/', homeControls.getAllProducts);

router.get('/login', homeControls.loginPage);

router.get('/signup', homeControls.signUpPage);

module.exports = router;
