const express = require('express');
const CartManager = require('../managers/CartsManager');

const router = express.Router();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await CartManager.createCart(req.body.userId);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).send({ error: 'Error al crear el carrito' });
  }
});

// Obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    const carts = await CartManager.getAll();
    res.json(carts);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los carritos' });
  }
});

// Obtener los productos de un carrito específico
router.get('/:id', async (req, res) => {
  try {
    const cart = await CartManager.getCartById(req.params.id);
    if (!cart) {
      return res.status(404).send({ error: 'Carrito no encontrado' });
    }
    res.json(cart.products);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener el carrito' });
  }
});

// Agregar un producto al carrito
router.post('/:cartId/product/:productId', async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const cart = await CartManager.addProductToCart(cartId, productId);
    if (!cart) {
      return res.status(404).send({ error: 'Carrito no encontrado' });
    }
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Error al agregar el producto al carrito' });
  }
});

// Eliminar un producto del carrito
router.delete('/:cartId/product/:productId', async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const cart = await CartManager.removeProductFromCart(cartId, productId);
    if (!cart) {
      return res.status(404).send({ error: 'Carrito no encontrado' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Error al eliminar el producto del carrito' });
  }
});

// Actualizar el carrito con un arreglo de productos
router.put('/:cartId', async (req, res) => {
  try {
    const { cartId } = req.params;
    const { products } = req.body;
    const cart = await CartManager.updateCart(cartId, products);
    if (!cart) {
      return res.status(404).send({ error: 'Carrito no encontrado' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Error al actualizar el carrito' });
  }
});

// Actualizar la cantidad de un producto en el carrito
router.put('/:cartId/products/:productId', async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;
    const cart = await CartManager.updateProductQuantity(cartId, productId, quantity);
    if (!cart) {
      return res.status(404).send({ error: 'Carrito no encontrado' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Error al actualizar la cantidad del producto en el carrito' });
  }
});

// Eliminar todos los productos del carrito
router.delete('/:cartId', async (req, res) => {
  try {
    const cart = await CartManager.deleteCart(req.params.cartId);
    if (!cart) {
      return res.status(404).send({ error: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Error al eliminar el carrito' });
  }
});

module.exports = router;