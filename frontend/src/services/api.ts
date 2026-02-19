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

        // Log specific errors for debugging
        if (response.status === 401) {
            console.warn("Unauthorized request - potential token expiry");
        }
        
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

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const response = await fetch(url.toString(), {
            ...options,
            method: 'GET',
            headers,
            credentials: 'include', // Automatically send cookies
        });
        return handleResponse(response);
    },

    async post(endpoint: string, data?: any, options: RequestOptions = {}) {
        // Handle FormData (for file uploads)
        const isFormData = data instanceof FormData;
        
        const headers: any = {
            ...options.headers,
        };

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            method: 'POST',
            headers,
            credentials: 'include',
            body: isFormData ? data : JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async patch(endpoint: string, data?: any, options: RequestOptions = {}) {
        const isFormData = data instanceof FormData;
        const headers: any = {
            ...options.headers,
        };

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            method: 'PATCH',
            headers,
            credentials: 'include',
            body: isFormData ? data : JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async put(endpoint: string, data?: any, options: RequestOptions = {}) {
        const isFormData = data instanceof FormData;
        const headers: any = {
            ...options.headers,
        };

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            method: 'PUT',
            headers,
            credentials: 'include',
            body: isFormData ? data : JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async delete(endpoint: string, options: RequestOptions = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            method: 'DELETE',
            headers,
            credentials: 'include',
        });
        return handleResponse(response);
    },
};
