// auth_guard.js
import { removeAuthToken } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const token = cookie.get('authToken');
    if (!token) {
        alert('You need to be logged in to view this page.');
        // Optionally clear any invalid/expired token before redirecting
        removeAuthToken(); 
        window.location.href = '403.html';
    }
});
