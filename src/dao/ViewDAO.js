const Product = require('../models/Products.js');
const Cart = require('../models/Carts.js');

class ViewDAO {
  /**
   * Obtiene los datos necesarios para la vista `home`.
   * @returns {Promise} - Datos para la vista.
   */
  static async getHomeData() {
    try {
      return await Product.find().limit(10); // Por ejemplo, los 10 primeros productos
    } catch (error) {
      console.error('Error al obtener datos para la vista home:', error);
      throw error;
    }
  }

  /**
   * Obtiene los datos necesarios para la vista `realtimeproducts`.
   * @returns {Promise} - Datos para la vista.
   */
  static async getRealTimeProductsData() {
    try {
      return await Product.find(); // Todos los productos
    } catch (error) {
      console.error('Error al obtener datos para la vista realtimeproducts:', error);
      throw error;
    }
  }
}

module.exports = ViewDAO;