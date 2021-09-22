const router = require('express').Router();
const withAuth = require('./../utils/auth');
const dashboardControls = require('./../controllers/dashboard-controller');

router.get('/', withAuth, dashboardControls.getUserProfile);

router.get('/products/', withAuth, dashboardControls.getOneUsersProducts);

router.get('/create/', withAuth, dashboardControls.getOneUsersCreate);

router.post('/create/', withAuth, dashboardControls.createOneProduct);

module.exports = router;
