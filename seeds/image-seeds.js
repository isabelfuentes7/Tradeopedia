const { Image } = require('../models');

const imageData = [];

const seedImages = () => Image.bulkCreate(imageData);

module.exports = seedImages;
