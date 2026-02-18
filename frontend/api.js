// api.js

const API_BASE_URL = 'http://localhost:3000/api'; // Placeholder: Update with your actual API base URL

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the authorization token
api.interceptors.request.use(
    (config) => {
        const token = cookie.get('authToken'); // Assuming 'authToken' is the name of your cookie
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Function to store the authentication token
function setAuthToken(token) {
    cookie.set('authToken', token, { expires: 7 }); // Store for 7 days
}

// Function to remove the authentication token
function removeAuthToken() {
    cookie.remove('authToken');
}

// Export the api instance and helper functions
export { api, setAuthToken, removeAuthToken };