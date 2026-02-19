// src/services/checkout.service.ts
import { api } from './api';

export const checkoutService = {
    async createStripeSession() {
        return api.get('/checkout');
    },
};
