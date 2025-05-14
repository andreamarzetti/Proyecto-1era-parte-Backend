const Product = require('../models/Products.js'); // Asegúrate de que el modelo Product esté correctamente definido

class ProductDAO {
  /**
   * Obtiene todos los productos con filtros y opciones de paginación.
   * @param {Object} filter - Filtros para buscar productos.
   * @param {Object} options - Opciones como paginación, límite, etc.
   * @returns {Promise} - Lista de productos.
   */
  static async getAll(filter = {}, options = {}) {
    try {
      return await Product.paginate(filter, options);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  }

  /**
   * Obtiene un producto por su ID.
   * @param {String} id - ID del producto.
   * @returns {Promise} - Producto encontrado.
   */
  static async getById(id) {
    try {
      return await Product.findById(id);
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      throw error;
    }
  }

  /**
   * Crea un nuevo producto.
   * @param {Object} productData - Datos del producto a crear.
   * @returns {Promise} - Producto creado.
   */
  static async create(productData) {
    try {
      return await Product.create(productData);
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  }

  /**
   * Actualiza un producto por su ID.
   * @param {String} id - ID del producto.
   * @param {Object} updateData - Datos para actualizar.
   * @returns {Promise} - Producto actualizado.
   */
  static async updateById(id, updateData) {
    try {
      return await Product.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  }

  /**
   * Elimina un producto por su ID.
   * @param {String} id - ID del producto.
   * @returns {Promise} - Producto eliminado.
   */
  static async deleteById(id) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  }
}

module.exports = ProductDAO;