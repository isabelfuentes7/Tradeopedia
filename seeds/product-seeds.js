const { Product } = require('../models');

const productData = [
  {
    product_name: 'Gold Bracelet',
    product_price: 400.0,
    product_description: 'to do',
    category_name: 'Jewelry & Accessories',
    category_id: 1,
    seller_id: 1,
  },
  {
    product_name: 'Gold Ring',
    product_price: 250.0,
    product_description: 'to do',
    category_name: 'Jewelry & Accessories',
    category_id: 1,
    seller_id: 4,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
