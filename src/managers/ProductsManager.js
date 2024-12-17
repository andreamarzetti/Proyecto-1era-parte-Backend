const fs = require('fs/promises');
const path = './data/products.json';

class ProductManager {
    async getProducts(limit) {
        const data = JSON.parse(await fs.readFile(path, 'utf-8'));
        return limit ? data.slice(0, limit) : data;
    }

    async getProductById(id) {
        const data = JSON.parse(await fs.readFile(path, 'utf-8'));
        return data.find(product => product.id === id);
    }

    async addProduct(product) {
        const data = JSON.parse(await fs.readFile(path, 'utf-8'));
        const newProduct = { id: Date.now().toString(), ...product, status: true };
        data.push(newProduct);
        await fs.writeFile(path, JSON.stringify(data, null, 2));
        return newProduct;
    }

    async updateProduct(id, updates) {
        const data = JSON.parse(await fs.readFile(path, 'utf-8'));
        const index = data.findIndex(product => product.id === id);
        if (index === -1) return null;
        data[index] = { ...data[index], ...updates };
        await fs.writeFile(path, JSON.stringify(data, null, 2));
        return data[index];
    }

    async deleteProduct(id) {
        const data = JSON.parse(await fs.readFile(path, 'utf-8'));
        const newData = data.filter(product => product.id !== id);
        if (data.length === newData.length) return false;
        await fs.writeFile(path, JSON.stringify(newData, null, 2));
        return true;
    }
}

module.exports = ProductManager;
