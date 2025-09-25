const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.post('/', async (req, res) => {
    const { name, place, phone, description, image } = req.body;
    const newProduct = new Product({ name, place, phone, description, image });
    await newProduct.save();
    res.json(newProduct);
});

module.exports = router;
