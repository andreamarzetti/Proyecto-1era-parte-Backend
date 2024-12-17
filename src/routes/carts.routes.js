const express = require('express');
const fs = require('fs'); // Asegúrate de importar fs
const path = './src/data/carts.json'; // Ruta correcta a tu archivo de carritos

const router = express.Router();

// Obtener todos los carritos
router.get('/', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Error al leer los carritos' });
        }
        const carts = JSON.parse(data);
        res.json(carts); // Devolver todos los carritos
    });
});

// Crear un nuevo carrito
router.post('/', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Error al leer los carritos' });
        }
        const carts = JSON.parse(data);
        const newCart = {
            id: (carts.length ? carts[carts.length - 1].id + 1 : 1),
            products: []
        };
        carts.push(newCart);
        fs.writeFile(path, JSON.stringify(carts, null, 2), (err) => {
            if (err) {
                return res.status(500).send({ error: 'Error al crear el carrito' });
            }
            res.status(201).json(newCart);
        });
    });
});

// Obtener los productos de un carrito específico
router.get('/:cid', (req, res) => {
    const cid = req.params.cid;
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Error al leer los carritos' });
        }
        const carts = JSON.parse(data);
        const cart = carts.find(c => c.id == cid);
        if (!cart) {
            return res.status(404).send({ error: 'Carrito no encontrado' });
        }
        res.json(cart.products); // Devolver los productos del carrito
    });
});

// Agregar un producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Error al leer los carritos' });
        }
        const carts = JSON.parse(data);
        const cart = carts.find(c => c.id == cid);
        if (!cart) {
            return res.status(404).send({ error: 'Carrito no encontrado' });
        }
        const productIndex = cart.products.findIndex(p => p.product == pid);
        if (productIndex === -1) {
            cart.products.push({ product: pid, quantity: 1 });
        } else {
            cart.products[productIndex].quantity += 1;
        }
        fs.writeFile(path, JSON.stringify(carts, null, 2), (err) => {
            if (err) {
                return res.status(500).send({ error: 'Error al agregar el producto al carrito' });
            }
            res.status(200).json(cart);
        });
    });
});

module.exports = router;
