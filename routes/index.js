const router = require('express').Router();
const apiRoutes = require('./api');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/errorController');

// TODO ONCE FRONTEND + LOGIN HAS BEEN CREATED
// const homeRoutes = require('./homeRoutes.js');
// const dashboardRoutes = require('./dashboardRoutes.js');
// router.use('/', homeRoutes);
// router.use('/dashboard', dashboardRoutes);

router.use('/api', apiRoutes);

// MIDDLEWARE: UNHANDLED ROUTES
router.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

// MIDDLEWARE: GLOBAL ERROR HANDLER
router.use(globalErrorHandler);

module.exports = router;
