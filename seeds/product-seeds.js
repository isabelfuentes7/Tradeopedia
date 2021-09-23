const { Product } = require('../models');

const productData = [
  {
    product_name: 'Product 1',
    product_price: 400.0,
    product_description: 'to do',
    category_name: 'Jewelry & Accessories',
    category_id: 1,
    seller_id: 1,
  },
  {
    product_name: 'Product 2',
    product_price: 250.0,
    product_description: 'to do',
    category_name: 'Jewelry & Accessories',
    category_id: 1,
    seller_id: 2,
  },
  {
    product_name: 'Product 3',
    product_price: 250.0,
    product_description: 'to do',
    category_name: 'Jewelry & Accessories',
    category_id: 1,
    seller_id: 3,
  },
  {
    product_name: 'Product 4',
    product_price: 250.0,
    product_description: 'to do',
    category_name: 'Jewelry & Accessories',
    category_id: 1,
    seller_id: 3,
  },
  {
    product_name: 'Product 5',
    product_price: 250.0,
    product_description: 'to do',
    category_name: 'Jewelry & Accessories',
    category_id: 1,
    seller_id: 4,
  },
  {
    product_name: 'Product 6',
    product_price: 250.0,
    product_description: 'to do',
    category_name: 'Jewelry & Accessories',
    category_id: 1,
    seller_id: 3,
  },
  {
    product_name: 'Product 7',
    product_price: 250.0,
    product_description: 'to do',
    category_name: 'Jewelry & Accessories',
    category_id: 1,
    seller_id: 3,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
