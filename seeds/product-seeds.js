const { Product } = require('../models');

const productData = [
  {
    product_name: 'Gold Bracelet',
    price: 400.0,
    stock: 1,
    category_id: 1,
  },
  {
    product_name: 'Lebron James Signed Jersey',
    price: 220.0,
    stock: 1,
    category_id: 2,
  },
  {
    product_name: 'Chesterfield ',
    price: 300.0,
    stock: 1,
    category_id: 3,
  },
  {
    product_name: '1970s Vintage Doll ',
    price: 120,
    stock: 1,
    category_id: 4,
  },
  {
    product_name: 'Beatles Original Vinyl',
    price: 160.0,
    stock: 22,
    category_id: 5,
  },
  {
    product_name: 'Tiger For Sale',
    price: 160.0,
    stock: 1,
    category_id: 6,
  },
  {
    product_name: 'Cat For Sale',
    price: 160.0,
    stock: 1,
    category_id: 6,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
