const { User } = require('../models');

const userData = [
  {
    username: 'john_doe',
    email: 'johndoe@gmail.com',
    password: 'johndoe@1234',
  },
  {
    username: 'mike_chan',
    email: 'mikechan@gmail.com',
    password: 'mikechan@1234',
  },
  {
    username: 'kevin_tupak',
    email: 'kevintupak@gmail.com',
    password: 'kevintupak@1234',
  },
  {
    username: 'tom_allen',
    email: 'tomallen@gmail.com',
    password: 'tomallen@1234',
  },
  {
    username: 'david_blue',
    email: 'davidblue@gmail.com',
    password: 'davidblue@1234',
  },
  {
    username: 'kyle_town',
    email: 'kyletown@gmail.com',
    password: 'kyletown@1234',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
