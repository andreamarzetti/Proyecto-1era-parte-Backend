const fs = require('fs/promises');
const path = './data/carts.json';

class CartManager {
    async createCart() {
        const data = JSON.parse(await fs.readFile(path, 'utf-8'));
        const newCart = { id: Date.now().toString(), products: [] };
        data.push(newCart);
        await fs.writeFile(path, JSON.stringify(data, null, 2));
        return newCart;
    }

    async getCartById(id) {
        const data = JSON.parse(await fs.readFile(path, 'utf-8'));
        return data.find(cart => cart.id === id);
    }

    async addProductToCart(cartId, productId) {
        const data = JSON.parse(await fs.readFile(path, 'utf-8'));
        const cart = data.find(cart => cart.id === cartId);
        if (!cart) return null;

        const existingProduct = cart.products.find(p => p.product === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await fs.writeFile(path, JSON.stringify(data, null, 2));
        return cart;
    }
}

module.exports = CartManager;
