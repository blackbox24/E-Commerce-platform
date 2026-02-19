# E-Commerce Platform - Frontend (Next.js)

A high-performance, SEO-friendly storefront built with Next.js and Tailwind CSS. This frontend is designed for speed, security, and a seamless user experience.

## 🚀 Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API (Auth)
- **Notifications**: `react-hot-toast`
- **Infrastructure**: Nginx Reverse Proxy (Port 80 routing)
- **Deployment**: Docker (Standalone output optimization)

---

## 🏗 Architecture & Best Practices

### 1. Hybrid Rendering (SSR/CSR)
- **Server Components**: Used for initial page structure and SEO-critical content.
- **Client Components**: Used for interactive elements (Cart, Auth, Forms) and state-heavy interactions.
- **Cookie-Based Auth**: By moving from `localStorage` to HTTP-only cookies, the app can perform authenticated data fetching directly in Server Components, eliminating "flicker" during hydration.
- **Unified Routing**: All API and image requests are routed relatively (e.g., `/api/...`) via Nginx, simplifying environment configuration and preventing CORS issues in production.

### 2. Service Layer Pattern
- **Centralized API**: Located in `src/services/api.ts`, providing a consistent wrapper around `fetch` with automatic credential handling (`credentials: 'include'`).
- **Modular Services**: Dedicated service files (`auth.service.ts`, `product.service.ts`, etc.) abstract API logic away from components, making them easier to test and maintain.

### 3. Professional UI/UX
- **Interactive Feedback**: Replaced standard `alert()` calls with `react-hot-toast` for non-blocking notifications.
- **Responsive Design**: Mobile-first approach using Tailwind's utility classes.
- **Dynamic Assets**: Robust image handling that supports both relative backend paths and external URLs.

---

## 📈 Future Bottlenecks (Real-World Scenarios)
- **Large State Management**: As features grow (Wishlists, Compare, etc.), Context API might cause performance bottlenecks due to unnecessary re-renders. **Solution**: Migrate complex state to `Zustand` or `Redux Toolkit`.
- **Image Optimization**: Serving raw images from the backend can impact LCP scores. **Solution**: Use Next.js `next/image` with a custom loader or an image CDN (Cloudinary).
- **Client-side Filtering**: Filtering products in the browser becomes slow with 1000+ items. **Solution**: Implement server-side filtering and sorting via query parameters.

---

## 🚢 Deployment Strategies
- **Standalone Build**: Configured `output: 'standalone'` in `next.config.ts`. This bundles only the minimal `node_modules` required for production, drastically reducing the Docker image footprint.
- **Environment Injection**: Uses `NEXT_PUBLIC_` variables for build-time configuration (like API URLs).

---

## ✅ TODO List

### Core Pages
- [x] Home Page with Product Listing.
- [x] Product Detail View (Admin CRUD).
- [x] Shopping Cart with real-time updates.
- [x] Secure Login/Signup pages.
- [x] Admin Dashboard (Products, Users, Orders).
- [x] Profile Page with Order History.

### Features
- [x] Cookie-based Auth Provider.
- [x] Toast notification integration.
- [x] Responsive navigation (Header/Footer).
- [x] Stripe Checkout redirection.
- [ ] Implement Search & Category filtering.
- [ ] Add Loading Skeletons for better perceived performance.

### Technical Quality
- [x] Optimized Multi-stage Dockerfile.
- [x] Standardized API Service layer.
- [x] Dynamic Image URL resolution.
- [ ] Implement React Error Boundaries.
- [ ] Add E2E tests using Playwright or Cypress.
