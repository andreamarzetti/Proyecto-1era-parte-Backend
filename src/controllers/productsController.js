const ProductManager = require('../managers/ProductsManager');

exports.getAllProducts = async (req, res) => {
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
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await ProductManager.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al crear el producto' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await ProductManager.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al obtener el producto' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductManager.updateProduct(req.params.id, req.body);
    req.io.emit('productList', await ProductManager.getAll({}, {})); // Emitir nueva lista de productos en tiempo real
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Error al actualizar el producto' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductManager.deleteProduct(req.params.id);
    req.io.emit('productList', await ProductManager.getAll({}, {})); // Emitir nueva lista de productos en tiempo real
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).send({ error: error.message || 'Error al eliminar el producto' });
  }
};