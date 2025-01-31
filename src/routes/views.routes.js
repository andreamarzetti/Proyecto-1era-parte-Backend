const express = require('express');
const ProductManager = require('../managers/ProductsManager');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await ProductManager.getAll({}, {});
        res.render('home', { title: 'Home', products: products.docs });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error al cargar los productos');
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await ProductManager.getAll({}, {});
        res.render('realTimeProducts', { title: 'Real-Time Products', products: products.docs });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error al cargar los productos');
    }
});

module.exports = router;