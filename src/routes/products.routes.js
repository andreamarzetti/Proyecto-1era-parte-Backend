const express = require('express');
const ProductManager = require('../managers/ProductsManager');

const router = express.Router();

// Obtener todos los productos con filtros, paginación y ordenamientos
router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
    };
    const queryObj = query ? { $or: [{ category: query }, { status: query === 'available' }] } : {};
    const products = await ProductManager.getAll(queryObj, options);
    res.json({
      status: 'success',
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.hasPrevPage ? products.page - 1 : null,
      nextPage: products.hasNextPage ? products.page + 1 : null,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.page - 1}&sort=${sort}&query=${query}` : null,
      nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.page + 1}&sort=${sort}&query=${query}` : null
    });
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los productos' });
  }
});

router.get('/products/:pid', async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);
    if (!product) {
      return res.status(404).send({ error: 'Producto no encontrado' });
    }
    res.render('productDetails', { product });
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).send({ error: 'Error al obtener el producto' });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { id, title, description, code, price, status = true, stock, category, thumbnails } = req.body;
    if (!id || !title || !description || !code || !price || !stock || !category || !thumbnails) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    const newProduct = await ProductManager.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await ProductManager.getProductById(req.params.id);
    if (!product) {
      return res.status(404).send({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un producto existente
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await ProductManager.updateProduct(req.params.id, req.body);
    req.io.emit('productList', await ProductManager.getAll({}, {})); // Emitir nueva lista de productos en tiempo real
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Error al actualizar el producto' });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await ProductManager.deleteProduct(req.params.id);
    req.io.emit('productList', await ProductManager.getAll({}, {})); // Emitir nueva lista de productos en tiempo real
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Error al eliminar el producto' });
  }
});

module.exports = router;