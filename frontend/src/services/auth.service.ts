// src/services/auth.service.ts
import { api } from './api';

export const authService = {
    async login(credentials: any) {
        return api.post('/auth/login', credentials);
    },
    async signup(userData: any) {
        return api.post('/auth/register', userData);
    },
};
