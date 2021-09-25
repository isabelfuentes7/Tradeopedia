const router = require('express').Router();
const apiRoutes = require('./api');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/errorController');

const homeRoutes = require('./home-routes.js');
const viewRoutes = require('./view-routes.js');
const updateRoutes = require('./update-routes.js');
const createRoutes = require('./create-routes.js');

//////////////////////////////////////////////////////////////////////
router.use('/api', apiRoutes);
//////////////////////////////////////////////////////////////////////
router.use('/', homeRoutes);
router.use('/home', homeRoutes);
router.use('/view', viewRoutes);
router.use('/update', updateRoutes);
router.use('/create', createRoutes);

//////////////////////////////////////////////////////////////////////

// MIDDLEWARE: UNHANDLED ROUTES
router.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

// MIDDLEWARE: GLOBAL ERROR HANDLER
router.use(globalErrorHandler);

module.exports = router;
