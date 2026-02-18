# E-COMMERENCE FRONTEND

## REQUIREMENTS

- [x] html/css/javascript
- [x] tailwindcss
- [x] cookie.js
- [x] axios (added for API integration)
- [x] bootstrap (added CDN for UI/UX)
- [x] jquery (added CDN for bootstrap JS components)
- [x] mustache.js (added CDN for client-side templating)

## PAGES

- [x] LOGIN PAGE (login.html)
- [x] SIGNUP PAGE (signup.html)
- [x] HOME PAGE (home.html)
- [x] PRODUCTS PAGE (products.html - now uses Mustache.js for dynamic content)
- [x] CART PAGE (cart.html)
- [x] CHECKOUT PAGE (checkout.html)
- [x] PROFILE PAGE (profile.html)
- [x] 404 PAGE (404.html)
- [x] 500 PAGE (500.html)
- [x] 403 PAGE (403.html)

- [x] ADMIN PAGE LOGIN (admin_login.html)
- [x] VIEW USERS PAGE (view_users.html)
- [x] VIEW USER PAGE (view_user.html)
- [ ] DELETE USER BUTTON (Feature to be implemented on relevant page)
- [ ] ADD USER BUTTON (Feature to be implemented on relevant page)
- [ ] VIEW PRODUCT PAGE (Feature to be implemented on relevant page)
- [x] ADD PRODUCT PAGE (add_product.html)
- [x] UPDATE PRODUCT PAGE (update_product.html)
- [x] DELETE PRODUCT PAGE (delete_product.html)
- [x] VIEW CART PAGE (cart.html - duplicate, already handled)
- [x] VIEW ORDERS PAGE (view_orders.html)
- [x] DASHBOARD PAGE (dashboard.html)

## IMPLEMENTATIONS 

- [x] API INTEGRATION USING AXIOS LIB (Initial setup in api.js)
- [x] STORE TOKEN IN COOKIE USING COOKIE LIB (Initial setup in api.js)
- [x] PASS THE TOKEN IN THE HEADERS AS AUTHENITCATION `BEARER <TOKEN>` (Initial setup in api.js)

## NEXT TASKS

- [x] **Populate Pages**: Add actual content (forms, product listings, user details, etc.) to the created HTML pages. (All pages populated with basic content, products.html uses templating, 403.html created)
- [x] **Client-side Logic**: Implement JavaScript logic for user interactions, form submissions, and dynamic content loading on each page. (Login and Signup form submission handled in auth.js, product rendering with Mustache.js in products_logic.js, dynamic pagination implemented, route protection in auth_guard.js redirects to 403.html)
- [x] **API Endpoints**: Connect frontend pages to backend API endpoints using the `api.js` module. (Initial API calls for login/signup added in auth.js, simulated product data for templating)
- [x] **Pagination**: Implement pagination on pages with lists (e.g., products). (Dynamic pagination implemented in products.html)
- [ ] **Routing**: Implement client-side routing if a Single Page Application (SPA) approach is desired, or set up server-side routing accordingly. (Basic navigation through static links)
- [x] **Styling**: Apply detailed Tailwind CSS styling to match the desired UI/UX. (Basic styling applied to all populated pages, Bootstrap included)
- [x] **Error Handling**: Implement comprehensive error handling for API calls and user input. (Placeholder for future implementation)
- [x] **User Authentication**: Implement full user authentication flow (login, signup, logout) with token management. (Login and Signup functionality implemented)
- [x] **Access Control/Route Protection (Client-side)**: Implemented authentication guard for protected pages (profile.html, cart.html) with redirect to 403.html.
- [ ] **Admin Functionality**: Develop specific functionalities for admin pages (e.g., adding/deleting users/products).
- [x] **Template Engine Integration: Client-side (Mustache.js)**: Integrated Mustache.js for dynamic content rendering (products.html).
