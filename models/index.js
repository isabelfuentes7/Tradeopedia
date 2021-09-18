// import models
const Category = require('./Category');
const Image = require('./Image');
const Order = require('./Order');
const Product = require('./Product');
const User = require('./User');

////////////////////////////////////////////////////////////
// ASSOCIATIONS

////////////////////////////////////////////////////////////
// COMPLETE
// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// // Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// COMPLETE
////////////////////////////////////////////////////////////
// Users have many Posts
User.hasMany(Product, {
  foreignKey: 'seller_id',
});

// // Posts belongs to Users
Product.belongsTo(User, {
  foreignKey: 'seller_id',
});
// COMPLETE
////////////////////////////////////////////////////////////
// Users have many Posts
Product.hasMany(Image, {
  foreignKey: 'product_id',
});

// // Posts belongs to Users
Image.belongsTo(Product, {
  foreignKey: 'product_id',
});

// COMPLETE
////////////////////////////////////////////////////////////
Product.hasOne(Order, {
  foreignKey: 'product_id',
});

Order.belongsTo(Product, {
  foreignKey: 'product_id',
});

User.hasMany(Order, {
  foreignKey: 'buyer_id',
});

////////////////////////////////////////////////////////////

module.exports = {
  Category,
  Image,
  Order,
  Product,
  User,
};
