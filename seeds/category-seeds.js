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
    category_name: 'Toys & Crafts',
  },
  {
    category_name: 'Art & Music',
  },
  {
    category_name: 'Others',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
