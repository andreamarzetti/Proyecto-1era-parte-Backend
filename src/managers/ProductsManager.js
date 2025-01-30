const mongoose = require('mongoose');
const Product = require('../models/Products');

class ProductManager {

  async getAll(query = {}, options = {}) {
    try {
        const products = await Product.paginate(query, options); // Usando mongoose-paginate-v2 o similar
        return products;
    } catch (error) {
        console.error("Error in getAll:", error);
        throw new Error('Error al obtener los productos');
    }
}

    async createProduct(productData) {
        try {
            const product = new Product(productData);
            await product.save();
            return product;
        } catch (error) {
            console.error("Error in createProduct:", error);
            if (error.code === 11000) {
                throw new Error('El código del producto ya existe. Por favor, elige un código diferente.');
            }
            throw new Error('Error al crear el producto');
        }
    }

    async getProductById(productId) {
          try {
              if (!mongoose.Types.ObjectId.isValid(productId)) {
                  throw new Error('ID de producto inválido');
              }
              const product = await Product.findById(productId);
              if (!product) {
                  throw new Error('Producto no encontrado');
              }
              return product;
          } catch (error) {
              console.error("Error in getProductById:", error);
              throw new Error('Error al obtener el producto');
          }
      }

    async updateProduct(productId, updateData) {
        try {
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                throw new Error('ID de producto inválido');
            }
            const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            return product;
        } catch (error) {
            console.error("Error in updateProduct:", error);
            throw new Error('Error al actualizar el producto');
        }
    }

    async deleteProduct(productId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                throw new Error('ID de producto inválido');
            }
            const product = await Product.findByIdAndDelete(productId);
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            return product;
        } catch (error) {
            console.error("Error in deleteProduct:", error);
            throw new Error('Error al eliminar el producto');
        }
    }
}

module.exports = new ProductManager();