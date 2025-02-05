const mongoose = require('mongoose');
const Cart = require('../models/Carts');
const ProductManager = require('./ProductsManager');  

class CartManager {
    async createCart(userId) {
        try {
            const newCart = new Cart({ userId, products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.error("Error in createCart:", error);
            throw new Error('Error al crear el carrito');
        }
    }

    async getAll() {
        try {
            return await Cart.find().populate('products.productId');
        } catch (error) {
            console.error("Error in getAll:", error);
            throw new Error('Error al obtener los carritos');
        }
    }

    async getCartById(cartId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(cartId)) {
                throw new Error('ID de carrito inválido');
            }
            const cart = await Cart.findById(cartId).populate('products.productId');
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            return cart;
        } catch (error) {
            console.error("Error in getCartById:", error);
            throw new Error('Error al obtener el carrito');
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await this.getCartById(cartId);
            const product = await ProductManager.getProductById(productId);
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
            if (productIndex === -1) {
                cart.products.push({ productId, quantity: 1 });
            } else {
                cart.products[productIndex].quantity += 1;
            }
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error in addProductToCart:", error);
            throw new Error('Error al agregar el producto al carrito');
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await this.getCartById(cartId);
            const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }
            cart.products.splice(productIndex, 1);
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error in removeProductFromCart:", error);
            throw new Error('Error al eliminar el producto del carrito');
        }
    }

    async updateCart(cartId, products) {
        try {
            const cart = await this.getCartById(cartId);
            cart.products = products.map(p => ({
                productId: new mongoose.Types.ObjectId(p.productId),
                quantity: p.quantity
            }));
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error in updateCart:", error);
            throw new Error('Error al actualizar el carrito');
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await this.getCartById(cartId);
            const product = cart.products.find(p => p.productId.equals(productId));
            if (!product) {
                throw new Error('Producto no encontrado en el carrito');
            }
            product.quantity = quantity;
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error in updateProductQuantity:", error);
            throw new Error('Error al actualizar la cantidad del producto en el carrito');
        }
    }

    async deleteCart(cartId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(cartId)) {
                throw new Error('ID de carrito inválido');
            }
            const cart = await Cart.findByIdAndDelete(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            return cart;
        } catch (error) {
            console.error("Error in deleteCart:", error);
            throw new Error('Error al eliminar el carrito');
        }
    }
}

module.exports = new CartManager();