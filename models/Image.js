// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Image extends Model {}

// set up fields and rules for Order model
Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    image_data: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    // Will create date for when it was created
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'image',
  }
);

module.exports = Image;
