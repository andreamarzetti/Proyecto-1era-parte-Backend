const ProductDAO = require('../dao/ProductDAO');

exports.getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
    };

    const queryObj = query
      ? {
          $or: [{ category: query }, { status: query === 'available' }],
        }
      : {};

    const products = await ProductDAO.getAll(queryObj, options);

    res.json({
      status: 'success',
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.hasPrevPage ? products.page - 1 : null,
      nextPage: products.hasNextPage ? products.page + 1 : null,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage
        ? `/api/products?limit=${limit}&page=${
            products.page - 1
          }&sort=${sort}&query=${query}`
        : null,
      nextLink: products.hasNextPage
        ? `/api/products?limit=${limit}&page=${
            products.page + 1
          }&sort=${sort}&query=${query}`
        : null,
    });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).send({ error: 'Error al obtener los productos' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await ProductDAO.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: error.message || 'Error al crear el producto' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await ProductDAO.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ error: error.message || 'Error al obtener el producto' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductDAO.updateById(req.params.id, req.body);

    // Emitir la nueva lista de productos en tiempo real
    req.io.emit('productList', await ProductDAO.getAll({}, {}));

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).send({ error: error.message || 'Error al actualizar el producto' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductDAO.deleteById(req.params.id);

    // Emitir la nueva lista de productos en tiempo real
    req.io.emit('productList', await ProductDAO.getAll({}, {}));

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(deletedProduct);
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).send({ error: error.message || 'Error al eliminar el producto' });
  }
};