const { Image } = require('../models');

const imageData = [
  {
    product_id: 1,
    product_img_url: 'brown_men_leather_jacket-1632568199462.jpeg',
  },
  {
    product_id: 2,
    product_img_url: 'concrete_wood_console-1632568265472.jpeg',
  },
  {
    product_id: 3,
    product_img_url: 'walnut_nightstand-1632568307924.jpeg',
  },
  {
    product_id: 4,
    product_img_url: '1960_yonezawa_directional_robot-1632568339650.jpeg',
  },
  {
    product_id: 5,
    product_img_url: 'large_custom_puppet-1632568399702.jpeg',
  },
  {
    product_id: 6,
    product_img_url: 'pegasus_antique_copper_metal_chess-1632568451514.jpeg',
  },
  {
    product_id: 7,
    product_img_url: 'english_platform_rocking_horse-1632568489538.jpeg',
  },
  {
    product_id: 8,
    product_img_url: 'olympus_stylus_epic-1632568537687.jpeg',
  },
  {
    product_id: 9,
    product_img_url: 'hitty_mahogany-1632568577981.jpeg',
  },
  {
    product_id: 10,
    product_img_url: 'modern_platform_bed-1632568627436.jpeg',
  },
  {
    product_id: 11,
    product_img_url: 'vintage_oushak_rug-1632568670768.jpeg',
  },
  {
    product_id: 12,
    product_img_url: 'barn_wood_dining_chair-1632568714912.jpeg',
  },
  {
    product_id: 13,
    product_img_url: 'women_oxford_leather-1632568811567.jpeg',
  },
  {
    product_id: 14,
    product_img_url: 'womens_cutout_oxfords-1632568852992.jpeg',
  },
  {
    product_id: 15,
    product_img_url: 'pop_art_painting-1632568885479.jpeg',
  },
  {
    product_id: 16,
    product_img_url: 'metal_sculpture_art-1632568918484.jpeg',
  },
];

const seedImages = () => Image.bulkCreate(imageData);

module.exports = seedImages;
