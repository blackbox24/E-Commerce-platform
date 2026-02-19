// src/services/product.service.ts
import { api } from './api';

export const productService = {
    async getAllProducts() {
        return api.get('/products');
    },
    async getProductById(id: string) {
        return api.get(`/products/${id}`);
    },
    async addProduct(productData: FormData) {
        return api.post('/products', productData);
    },
    async updateProduct(id: string, productData: FormData | any) {
        return api.patch(`/products/${id}`, productData);
    },
    async deleteProduct(id: string) {
        return api.delete(`/products/${id}`);
    },
};
