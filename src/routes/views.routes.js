const express = require('express');
const fs = require('fs');
const path = './src/data/products.json'; // Ruta del archivo de productos

const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al cargar los productos');
        }
        const products = JSON.parse(data);
        res.render('home', { title: 'Home', products });
    });
});

router.get('/realtimeproducts', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al cargar los productos');
        }
        const products = JSON.parse(data);
        res.render('realTimeProducts', { title: 'Real-Time Products', products });
    });
});

module.exports = router;
