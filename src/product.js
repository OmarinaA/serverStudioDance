// product.js

const { Sequelize } = require('sequelize');
const ProductModel = require('../model/product.model');

const sequelize = new Sequelize('studioDance', 'postgres', '123456789', {
    host: 'localhost',
    dialect: 'postgres'
});

const Product = ProductModel(sequelize, Sequelize);

module.exports = Product;
