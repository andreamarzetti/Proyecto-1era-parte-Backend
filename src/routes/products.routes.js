const express = require('express');
const fs = require('fs');
const path = './src/data/products.json'; // Ruta al archivo JSON de productos
const io = require('../app').io; // Importar Socket.IO desde el servidor principal

const router = express.Router();

// Obtener todos los productos
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit) || 0; // Obtener el parámetro 'limit' de la URL
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Error al leer los productos' });
        }
        const products = JSON.parse(data);
        if (limit > 0) {
            return res.json(products.slice(0, limit)); // Limitar la cantidad de productos
        }
        res.json(products);
    });
});

// Obtener un producto por su ID
router.get('/:pid', (req, res) => {
    const pid = req.params.pid;
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Error al leer los productos' });
        }
        const products = JSON.parse(data);
        const product = products.find(p => p.id == pid);
        if (!product) {
            return res.status(404).send({ error: 'Producto no encontrado' });
        }
        res.json(product);
    });
});

// Crear un nuevo producto
router.post('/', (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails } = req.body;
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Error al leer los productos' });
        }
        const products = JSON.parse(data);
        const newProduct = {
            id: (products.length ? products[products.length - 1].id + 1 : 1), // Generar ID único
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails: thumbnails || []
        };
        products.push(newProduct);
        fs.writeFile(path, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                return res.status(500).send({ error: 'Error al guardar el producto' });
            }

            io.emit('productList', products); // Emitir nueva lista de productos en tiempo real
            res.status(201).json(newProduct);
        });
    });
});

// Actualizar un producto
router.put('/:pid', (req, res) => {
    const pid = req.params.pid;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Error al leer los productos' });
        }
        const products = JSON.parse(data);
        const productIndex = products.findIndex(p => p.id == pid);
        if (productIndex === -1) {
            return res.status(404).send({ error: 'Producto no encontrado' });
        }
        const updatedProduct = { ...products[productIndex], title, description, code, price, status, stock, category, thumbnails };
        products[productIndex] = updatedProduct;
        fs.writeFile(path, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                return res.status(500).send({ error: 'Error al actualizar el producto' });
            }

            io.emit('productList', products); // Emitir nueva lista de productos en tiempo real
            res.json(updatedProduct);
        });
    });
});

// Eliminar un producto
router.delete('/:pid', (req, res) => {
    const pid = req.params.pid;
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Error al leer los productos' });
        }
        let products = JSON.parse(data);
        const productIndex = products.findIndex(p => p.id == pid);
        if (productIndex === -1) {
            return res.status(404).send({ error: 'Producto no encontrado' });
        }
        products = products.filter(p => p.id != pid);
        fs.writeFile(path, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                return res.status(500).send({ error: 'Error al eliminar el producto' });
            }

            io.emit('productList', products); // Emitir nueva lista de productos en tiempo real
            res.status(200).send({ message: 'Producto eliminado' });
        });
    });
});

module.exports = router;
