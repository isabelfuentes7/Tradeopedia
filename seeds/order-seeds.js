const { Order } = require('../models');

const orderData = [
  {
    buyer_id: 2,
    product_id: 1,
  },
];

const seedOrders = () => Order.bulkCreate(orderData);

module.exports = seedOrders;
