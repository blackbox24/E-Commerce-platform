# E-COMMERENCE FRONTEND

## ARCHITECTURAL SHIFT

- [x] Decision made to switch from plain HTML/CSS/JavaScript to Next.js (React framework).
- [x] Next.js project scaffolded in `nextjs-frontend/` directory with TypeScript, ESLint, Tailwind CSS, `src/` directory, App Router, and default import alias.

## REQUIREMENTS

- [x] html/css/javascript (Legacy setup, to be replaced by Next.js components)
- [x] tailwindcss (Integrated into Next.js project, configuration issue resolved)
- [x] cookie.js (Functionality to be re-implemented within Next.js context)
- [x] axios (Functionality to be re-implemented within Next.js context)
- [x] bootstrap (Not used in Next.js project - Tailwind CSS adopted as primary styling)
- [x] jquery (Not used in Next.js project - React and Tailwind CSS handle dynamic UI)
- [x] mustache.js (Legacy setup, templating to be handled by React components)

## PAGES (Legacy - to be migrated to Next.js components/routes)

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

## IMPLEMENTATIONS (Legacy - to be re-implemented within Next.js context)

- [x] API INTEGRATION USING AXIOS LIB (Initial setup in api.js)
- [x] STORE TOKEN IN COOKIE USING COOKIE LIB (Initial setup in api.js)
- [x] PASS THE TOKEN IN THE HEADERS AS AUTHENITCATION `BEARER <TOKEN>` (Initial setup in api.js)

## NEXT TASKS: Next.js Migration and Development

- [x] **Project Setup & Basic Structure**:
    - [x] Clean up `nextjs-frontend` directory (removed default content and prepared `layout.tsx`).
    - [x] Configure basic layout components (e.g., Header, Footer).
    - [x] Establish initial Next.js routing for core pages (Home, Login, Dashboard).
- [x] **Authentication System Re-implementation**:
    - [x] Implement `AuthContext` or similar state management for authentication.
    - [x] Re-implement Login and Home pages as Next.js components.
    - [x] Re-implement Signup page as Next.js component.
    - [ ] Integrate Axios for API calls within Next.js.
    - [ ] Re-implement token storage and passing in headers.
    - [x] Implement robust route protection using Next.js middleware or component-level checks (Implemented component-level protection for Dashboard, Cart, Profile, Admin pages).
- [x] **Page Migration & Templating**:
    - [x] Migrate all existing HTML pages into Next.js components/pages. (All pages migrated and styled)
    - [x] Re-implement dynamic content rendering using React's JSX.
- [x] **Styling Migration**:
    - [x] Decide on primary styling library (Tailwind CSS is already configured).
    - [x] Migrate existing Tailwind CSS styles. (All pages styled with Tailwind CSS, configuration issue resolved)
    - [x] Re-evaluate Bootstrap/jQuery necessity and integrate/replace as needed. (Decided to use Tailwind CSS as primary, Bootstrap/jQuery not integrated into Next.js project)
- [x] **Dynamic Pagination**:
    - [x] Re-implement dynamic pagination within Next.js pages, possibly leveraging server components or data fetching patterns. (Implemented in products/page.tsx)
- [ ] **Error Handling**:
    - [ ] Implement comprehensive error handling for API calls and UI.
- [ ] **Admin Functionality**:
    - [ ] Develop specific functionalities for admin pages.
