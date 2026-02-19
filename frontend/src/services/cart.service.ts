// src/services/cart.service.ts
import { api } from './api';

export const cartService = {
    async getCartItems() {
        return api.get('/carts');
    },
    async addCartItem(item: any) {
        return api.post('/carts', item);
    },
    async updateCartItem(cartId: string, data: any) {
        return api.patch(`/carts/${cartId}`, data);
    },
    async removeCartItem(cartId: string) {
        return api.delete(`/carts/${cartId}`);
    },
};
