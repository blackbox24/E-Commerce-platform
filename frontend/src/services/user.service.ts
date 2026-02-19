// src/services/user.service.ts
import { api } from './api';

export const userService = {
    async getAllUsers() {
        return api.get('/users');
    },
    async getUserById(id: string) {
        return api.get(`/users/${id}`);
    },
    async addUser(userData: any) {
        return api.post('/users', userData);
    },
    async updateUser(id: string, userData: any) {
        return api.put(`/users/${id}`, userData);
    },
    async deleteUser(id: string) {
        return api.delete(`/users/${id}`);
    },
};
