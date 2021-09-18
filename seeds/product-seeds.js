const { Product } = require('../models');

const productData = [
  {
    product_name: 'Gold Bracelet',
    price: 400.0,
    category_id: 1,
    seller_id: 1,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
