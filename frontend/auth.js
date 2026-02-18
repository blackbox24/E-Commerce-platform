// auth.js
import { api, setAuthToken } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm'); // Assuming the login form has an id 'loginForm'
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = loginForm.querySelector('#email-address').value;
            const password = loginForm.querySelector('#password').value;

            try {
                const response = await api.post('/auth/login', { email, password });
                const { token } = response.data;
                setAuthToken(token);
                alert('Login successful!');
                // Redirect to a protected page, e.g., home.html or dashboard.html
                window.location.href = 'home.html'; 
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed. Please check your credentials.');
            }
        });
    }

    const signupForm = document.querySelector('#signupForm'); // Assuming the signup form has an id 'signupForm'
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const fullName = signupForm.querySelector('#full-name').value;
            const email = signupForm.querySelector('#email-address').value;
            const password = signupForm.querySelector('#password').value;

            try {
                await api.post('/auth/signup', { name: fullName, email, password });
                alert('Signup successful! Please log in.');
                // Redirect to login page
                window.location.href = 'login.html'; 
            } catch (error) {
                console.error('Signup error:', error);
                alert('Signup failed. Please try again.');
            }
        });
    }
});
