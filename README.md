# Full-Stack E-Commerce Platform

A production-ready, full-stack e-commerce solution built with **Next.js**, **Express**, and **PostgreSQL**. This platform features a secure shopping experience, administrative management tools, and seamless **Stripe** payment integration.

## 🏗 Project Architecture

The project is orchestrated with **Docker Compose**, utilizing **Nginx** as a high-performance entry point:

- **Nginx**: Acting as a Reverse Proxy and Load Balancer (Port 80).
- **Frontend**: Next.js (App Router) storefront, optimized for performance and SEO.
- **Backend**: Express.js REST API with PostgreSQL for data persistence.

---

## 🚀 Quick Start (Docker)

Ensure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/blackbox24/E-Commerce-platform.git
   cd E-Commerce-platform
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory (based on `.env.example`) with your credentials:
   ```bash
   cp .env.example .env
   ```

3. **Launch the platform**:
   ```bash
   docker-compose up --build
   ```
   - **Storefront & Admin**: [http://localhost](http://localhost) (Port 80)
   - **API Access**: [http://localhost/api](http://localhost/api)

---

## 📦 Key Features

### 🛒 Storefront
- **Browse & Search**: Paginated product listings with dynamic image resolution.
- **Cart Management**: Add/Remove items with real-time stock awareness.
- **Secure Checkout**: Integrated with Stripe for PCI-compliant payments.
- **User Profile**: Personal order history and session management.

### 🛡 Security
- **HTTP-only Cookies**: Secure authentication flow that protects against XSS/CSRF.
- **Transactions**: Atomic database operations for order fulfillment.
- **Idempotency**: Webhook protection to prevent duplicate orders.

### 👨‍💼 Administration
- **Dashboard**: High-level overview of platform metrics.
- **Inventory CRUD**: Manage products with multi-part image uploads.
- **User & Order Management**: Administrative control over all platform data.

---

## 🛠 Documentation per Service

For detailed technical breakdowns, service-specific TODOs, and deployment strategies, please refer to:

- [**Backend Documentation (Express/PostgreSQL)**](./backend/README.md)
- [**Frontend Documentation (Next.js/Tailwind)**](./frontend/README.md)

---

## ✅ Master TODO List

- [x] Hybrid SSR/CSR Authentication with Cookies.
- [x] Scalable Backend Pagination.
- [x] Idempotent Stripe Webhook Integration.
- [x] Multi-stage Optimized Docker Builds.
- [x] Atomic Order Fulfillment Transactions.
- [ ] Implement Redis Caching for Product Stock.
- [ ] Add Loading Skeletons and Error Boundaries.
- [ ] Integrate a dedicated Image CDN (Cloudinary).

---

## 👥 Author
**Hope Decardi-Nelson** - [GitHub](https://github.com/blackbox24)
