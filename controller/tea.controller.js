const Product = require('../src/product');
const db = require("../model/model");
const products = db.products;

module.exports = {
    getAll: async (req, res) => {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        const { title, directions, sessions, periods,  price } = req.body;

        try {
            const product = await Product.create({
                title,
                sessions,
                periods,
                directions,
                price
            });

            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
