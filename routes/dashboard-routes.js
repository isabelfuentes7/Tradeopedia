const router = require('express').Router();
const withAuth = require('./../utils/auth');
const dashboardControls = require('./../controllers/dashboard-controller');

router.get('/', withAuth, dashboardControls.getUserProfile);

// router.get('/create/', withAuth, handlerDashboard.createUserPost);

// router.get('/edit/:id', withAuth, handlerDashboard.editUserPost);

module.exports = router;
