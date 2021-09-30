const Category = require('./Category');
const Product = require('./Product');
const User = require('./User');
const Image = require('./Image');

////////////////////////////////////////////////////////////
// ASSOCIATIONS: CATEGORY TO PRODUCT
////////////////////////////////////////////////////////////

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

////////////////////////////////////////////////////////////
// ASSOCIATIONS: USER TO PRODUCT
////////////////////////////////////////////////////////////

// Users have many Posts
User.hasMany(Product, {
  foreignKey: 'seller_id',
});

// // Posts belongs to Users
Product.belongsTo(User, {
  foreignKey: 'seller_id',
});

////////////////////////////////////////////////////////////
// ASSOCIATIONS: IMAGE TO PRODUCT
////////////////////////////////////////////////////////////

Product.hasMany(Image, {
  foreignKey: 'product_id',
});

Image.belongsTo(Product, {
  foreignKey: 'product_id',
});

////////////////////////////////////////////////////////////

module.exports = {
  Category,
  Product,
  User,
  Image,
};
