const express = require('express');
const cartsController = require('../controllers/cartsController');

const router = express.Router();

router.post('/', cartsController.createCart);
router.get('/', cartsController.getAllCarts);
router.get('/:id', cartsController.getCartById);
router.post('/:cartId/product/:productId', cartsController.addProductToCart);
router.delete('/:cartId/product/:productId', cartsController.removeProductFromCart);
router.put('/:cartId', cartsController.updateCart);
router.put('/:cartId/products/:productId', cartsController.updateProductQuantity);
router.delete('/:cartId', cartsController.deleteCart);

module.exports = router;