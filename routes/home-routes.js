const router = require('express').Router();
const homeControls = require('./../controllers/home-controller');

router.get('/', homeControls.getAllProducts);

router.get('/login', homeControls.loginPage);

router.get('/signup', homeControls.signUpPage);

// router.get('/post/:id', homeControls.getOnePost);

module.exports = router;
