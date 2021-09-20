const { User, Product, Order } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const helper = require('../utils/helpers');

////////////////////////////////////////////////////////////
// GET ONE USER
////////////////////////////////////////////////////////////
// The `/api/users/:id` endpoint
exports.getUserProfile = catchAsync(async (req, res, next) => {
  const username = req.session.username;

  console.log(req.session);
  // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  res.render('dashboard', { loggedIn: true, username: username });
});
