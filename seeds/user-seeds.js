const { User } = require('../models');

const userData = [
  {
    first_name: 'John',
    last_name: 'Doe',
    username: 'john_doe',
    email: 'johndoe@gmail.com',
    password: 'johndoe@1234',
    country: 'United States',
    state: 'NY',
    city: 'New York',
  },
  {
    first_name: 'Mike',
    last_name: 'Chan',
    username: 'mike_chan',
    email: 'mikechan@gmail.com',
    password: 'mikechan@1234',
    country: 'United States',
    state: 'NY',
    city: 'New York',
  },
  {
    first_name: 'Kevin',
    last_name: 'Tupak',
    username: 'kevin_tupak',
    email: 'kevintupak@gmail.com',
    password: 'kevintupak@1234',
    country: 'United States',
    state: 'NY',
    city: 'New York',
  },
  {
    first_name: 'Tom',
    last_name: 'Allen',
    username: 'tom_allen',
    email: 'tomallen@gmail.com',
    password: 'tomallen@1234',
    country: 'United States',
    state: 'NY',
    city: 'New York',
  },
  {
    first_name: 'David',
    last_name: 'Blue',
    username: 'david_blue',
    email: 'davidblue@gmail.com',
    password: 'davidblue@1234',
    country: 'United States',
    state: 'NY',
    city: 'New York',
  },
  {
    first_name: 'Kyle',
    last_name: 'Town',
    username: 'kyle_town',
    email: 'kyletown@gmail.com',
    password: 'kyletown@1234',
    country: 'United States',
    state: 'NY',
    city: 'New York',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
