const { Order } = require('../models');

const orderData = [];

const seedOrders = () => Order.bulkCreate(orderData);

module.exports = seedOrders;
