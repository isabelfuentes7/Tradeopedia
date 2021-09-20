const { Image } = require('../models');

const imageData = [
  {
    product_id: 1,
    image_url: 'https://images.unsplash.com/photo-1611598935678-c88dca238fce?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z29sZCUyMGpld2VsbGVyeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
  },
];

const seedImages = () => Image.bulkCreate(imageData);

module.exports = seedImages;
