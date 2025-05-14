const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware.js');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.post('/', isAdmin, productsController.createProduct);
router.get('/:id', productsController.getProductById);
router.put('/:id', isAdmin, productsController.updateProduct);
router.delete('/:id', isAdmin, productsController.deleteProduct);

module.exports = router;