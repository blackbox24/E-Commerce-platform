// src/services/order.service.ts
import { api } from './api';

export const orderService = {
    async getMyOrders() {
        return api.get('/orders');
    },
    async getAdminOrders() {
        return api.get('/orders/admin'); 
    },
};
