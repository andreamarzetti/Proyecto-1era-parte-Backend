const ProductManager = require('../managers/ProductsManager');

/**
 * Renderiza la vista de la página principal (home).
 */
exports.renderHome = async (req, res) => {
  try {
    res.render('home', { title: 'Inicio', message: '¡Bienvenido al servidor de Backend!' });
  } catch (error) {
    console.error('Error al renderizar la vista del home:', error);
    res.status(500).send('Error al cargar la página.');
  }
};

/**
 * Renderiza la vista de productos en tiempo real.
 */
exports.renderRealTimeProducts = async (req, res) => {
  try {
    const products = await ProductManager.getAll({}, {}); // Recupera todos los productos
    res.render('realtimeproducts', { title: 'Productos en Tiempo Real', products: products.docs });
  } catch (error) {
    console.error('Error al renderizar la vista de productos en tiempo real:', error);
    res.status(500).send('Error al cargar la página.');
  }
};