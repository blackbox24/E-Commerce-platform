// src/services/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
}

async function handleResponse(response: Response) {
    if (!response.ok) {
        let errorData: any = {};
        try {
            errorData = await response.json();
        } catch (e) {
            // If not JSON, try to get text
            const text = await response.text().catch(() => '');
            errorData = { message: text || response.statusText };
        }
        
        const message = errorData.message || `Error ${response.status}: ${response.statusText || 'Something went wrong'}`;
        const error = new Error(message);
        (error as any).status = response.status;
        (error as any).data = errorData;
        throw error;
    }
    return response.json();
}

export const api = {
    async get(endpoint: string, options: RequestOptions = {}) {
        const url = new URL(`${API_BASE_URL}${endpoint}`);
        if (options.params) {
            Object.keys(options.params).forEach(key => url.searchParams.append(key, options.params![key]));
        }

        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers,
        };

        const response = await fetch(url.toString(), {
            ...options,
            method: 'GET',
            headers,
        });
        return handleResponse(response);
    },

    async post(endpoint: string, data?: any, options: RequestOptions = {}) {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        
        // Handle FormData (for file uploads)
        const isFormData = data instanceof FormData;
        
        const headers: any = {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers,
        };

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            method: 'POST',
            headers,
            body: isFormData ? data : JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async patch(endpoint: string, data?: any, options: RequestOptions = {}) {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        
        const isFormData = data instanceof FormData;
        const headers: any = {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers,
        };

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            method: 'PATCH',
            headers,
            body: isFormData ? data : JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async put(endpoint: string, data?: any, options: RequestOptions = {}) {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        
        const isFormData = data instanceof FormData;
        const headers: any = {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers,
        };

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            method: 'PUT',
            headers,
            body: isFormData ? data : JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async delete(endpoint: string, options: RequestOptions = {}) {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers,
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            method: 'DELETE',
            headers,
        });
        return handleResponse(response);
    },
};
