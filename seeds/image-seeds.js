const { Image } = require('../models');

const imageData = [
  {
    image_name: 'banksy_signed.jpg',
    product_id: 1,
  },
  {
    image_name: 'dresser_craftsman_jewelry.jpg',
    product_id: 1,
  },
  {
    image_name: 'women_oxford_leather.jpg',
    product_id: 2,
  },
  {
    image_name: 'walking_stick_fiddle.jpg',
    product_id: 3,
  },
  {
    image_name: 'pop_art_painting.jpg',
    product_id: 4,
  },
  {
    image_name: 'origami_bear_necklace.jpg',
    product_id: 5,
  },
  {
    image_name: 'nike_air_max_blue_galaxy.jpg',
    product_id: 6,
  },
  {
    image_name: 'olympus_stylus_epic.jpg',
    product_id: 7,
  },
];

const seedImages = () => Image.bulkCreate(imageData);

module.exports = seedImages;
