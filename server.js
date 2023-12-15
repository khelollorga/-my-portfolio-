const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/inventory', { useNewUrlParser: true, useUnifiedTopology: true });

const inventorySchema = new mongoose.Schema({
    productName: String,
    quantity: Number
});

const Product = mongoose.model('Product', inventorySchema);

app.use(express.json());

app.get('/api/inventory', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/inventory', async (req, res) => {
    const { productName, quantity } = req.body;

    try {
        const newProduct = new Product({ productName, quantity });
        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
