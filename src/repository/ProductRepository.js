const Product = require('../models/Products');

class ProductRepository {
  async findById(id) {
    return await Product.findById(id);
  }

  async findAll(query = {}, options = {}) {
    return await Product.paginate(query, options);
  }

  async update(productId, updateData) {
    return await Product.findByIdAndUpdate(productId, updateData, { new: true });
  }
}

module.exports = new ProductRepository();