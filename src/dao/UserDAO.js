const User = require('../models/User.js'); // Asegúrate de que el modelo User esté correctamente definido

class UserDAO {
  /**
   * Obtiene todos los usuarios con filtros y opciones de paginación.
   * @param {Object} filter - Filtros para buscar usuarios.
   * @param {Object} options - Opciones como paginación, límite, etc.
   * @returns {Promise} - Lista de usuarios.
   */
  static async getAll(filter = {}, options = {}) {
    try {
      return await User.paginate(filter, options);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  /**
   * Obtiene un usuario por su ID.
   * @param {String} id - ID del usuario.
   * @returns {Promise} - Usuario encontrado.
   */
  static async getById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      throw error;
    }
  }

  /**
   * Crea un nuevo usuario.
   * @param {Object} userData - Datos del usuario a crear.
   * @returns {Promise} - Usuario creado.
   */
  static async create(userData) {
    try {
      return await User.create(userData);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  /**
   * Actualiza un usuario por su ID.
   * @param {String} id - ID del usuario.
   * @param {Object} updateData - Datos para actualizar.
   * @returns {Promise} - Usuario actualizado.
   */
  static async updateById(id, updateData) {
    try {
      return await User.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  }

  /**
   * Elimina un usuario por su ID.
   * @param {String} id - ID del usuario.
   * @returns {Promise} - Usuario eliminado.
   */
  static async deleteById(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }
}

module.exports = UserDAO;