const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Jewelry & Accessories',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
