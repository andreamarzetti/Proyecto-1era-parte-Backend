const Cart = require('../models/Carts');

class CartRepository {
  async findById(id) {
    return await Cart.findById(id).populate('products.productId');
  }

  async create(cartData) {
    const cart = new Cart(cartData);
    return await cart.save();
  }

  async update(cartId, updateData) {
    return await Cart.findByIdAndUpdate(cartId, updateData, { new: true });
  }

  async delete(cartId) {
    return await Cart.findByIdAndDelete(cartId);
  }
}

module.exports = new CartRepository();