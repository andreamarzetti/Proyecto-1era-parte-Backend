const Cart = require('../models/Carts.js'); // Asegúrate de que el modelo Cart esté correctamente definido

class CartDAO {
  /**
   * Obtiene todos los carritos con filtros y opciones de paginación.
   * @param {Object} filter - Filtros para buscar carritos.
   * @param {Object} options - Opciones como paginación, límite, etc.
   * @returns {Promise} - Lista de carritos.
   */
  static async getAll(filter = {}, options = {}) {
    try {
      return await Cart.paginate(filter, options);
    } catch (error) {
      console.error('Error al obtener carritos:', error);
      throw error;
    }
  }

  /**
   * Obtiene un carrito por su ID.
   * @param {String} id - ID del carrito.
   * @returns {Promise} - Carrito encontrado.
   */
  static async getById(id) {
    try {
      return await Cart.findById(id).populate('products.product');
    } catch (error) {
      console.error('Error al obtener carrito por ID:', error);
      throw error;
    }
  }

  /**
   * Crea un nuevo carrito.
   * @param {Object} cartData - Datos del carrito a crear.
   * @returns {Promise} - Carrito creado.
   */
  static async create(cartData) {
    try {
      return await Cart.create(cartData);
    } catch (error) {
      console.error('Error al crear carrito:', error);
      throw error;
    }
  }

  /**
   * Actualiza un carrito por su ID.
   * @param {String} id - ID del carrito.
   * @param {Object} updateData - Datos para actualizar.
   * @returns {Promise} - Carrito actualizado.
   */
  static async updateById(id, updateData) {
    try {
      return await Cart.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      console.error('Error al actualizar carrito:', error);
      throw error;
    }
  }

  /**
   * Elimina un carrito por su ID.
   * @param {String} id - ID del carrito.
   * @returns {Promise} - Carrito eliminado.
   */
  static async deleteById(id) {
    try {
      return await Cart.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error al eliminar carrito:', error);
      throw error;
    }
  }
}

module.exports = CartDAO;