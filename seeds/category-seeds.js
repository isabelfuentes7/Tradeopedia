const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Jewelry & Accessories',
  },
  {
    category_name: 'Clothing & Shoes',
  },
  {
    category_name: 'Home & Living',
  },
  {
    category_name: 'Toys & Entertainment',
  },
  {
    category_name: 'Art & Collectibles',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
