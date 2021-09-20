const Category = require('./Category');
const Product = require('./Product');
const User = require('./User');
const Order = require('./Order');

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
// ASSOCIATIONS: USER TO PRODUCT TO ORDER
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
  Product,
  User,
  Order,
};
