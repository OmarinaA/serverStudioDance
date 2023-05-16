const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sessions: {
            type: DataTypes.STRING,
            allowNull: false
        },
        periods: {
            type: DataTypes.STRING,
            allowNull: false
        },
        directions: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    });

    return Product;
};
