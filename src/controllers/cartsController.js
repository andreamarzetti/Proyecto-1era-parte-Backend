const CartManager = require('../managers/CartsManager');

exports.createCart = async (req, res) => {
  try {
    const newCart = await CartManager.createCart(req.body.userId);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).send({ error: 'Error al crear el carrito' });
  }
};

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await CartManager.getAll();
    res.json(carts);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los carritos' });
  }
};

exports.getCartById = async (req, res) => {
  try {
    const cart = await CartManager.getCartById(req.params.id);
    if (!cart) {
      return res.status(404).send({ error: 'Carrito no encontrado' });
    }
    res.json(cart.products);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener el carrito' });
  }
};

exports.addProductToCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const cart = await CartManager.addProductToCart(cartId, productId);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Error al agregar el producto al carrito' });
  }
};

exports.removeProductFromCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const cart = await CartManager.removeProductFromCart(cartId, productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Error al eliminar el producto del carrito' });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { products } = req.body;
    const cart = await CartManager.updateCart(cartId, products);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Error al actualizar el carrito' });
  }
};

exports.updateProductQuantity = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;
    const cart = await CartManager.updateProductQuantity(cartId, productId, quantity);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Error al actualizar la cantidad del producto en el carrito' });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const cart = await CartManager.deleteCart(req.params.cartId);
    res.json(cart);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Error al eliminar el carrito' });
  }
};