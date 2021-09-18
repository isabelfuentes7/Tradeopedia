const { User } = require('../models');

const userData = [
  {
    username: 'john_doe',
    email: 'johndoe@gmail.com',
    password: 'johndoe@1234',
  },
  {
    username: 'mike_doe',
    email: 'mikedoe@gmail.com',
    password: 'mikedoe@1234',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
