# E-Commerce Platform - Backend API

A robust, production-ready RESTful API for a modern e-commerce platform. Built with a focus on security, scalability, and seamless payment integration.

## 🚀 Tech Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (Raw SQL with `pg` pool)
- **Authentication**: JWT via HTTP-only Cookies
- **Payments**: Stripe SDK (Checkout Sessions & Webhooks)
- **Containerization**: Docker (Multi-stage Alpine builds)
- **Proxy/LB**: Nginx (Reverse routing and load balancing)

---

## 🛠 Core Processes & Services

### 1. Authentication & Security
- **Identity Management**: Implements `bcrypt` for secure password hashing and `jsonwebtoken` (JWT) for session management.
- **Secure Sessions**: Uses HTTP-only, Secure, and SameSite cookies to mitigate XSS and CSRF risks.
- **Internal Networking**: The backend is isolated within the Docker network and only accessible through the Nginx reverse proxy, protecting it from direct public exposure.
- **Role-Based Access Control (RBAC)**: Middleware-driven permission checks for `user` and `admin` roles.
- **CORS Management**: Configured for credentialed requests, allowing secure frontend-to-backend communication.

### 2. Product & Inventory Management
- **CRUD Operations**: Complete management of the product catalog.
- **Advanced Querying**: Implemented backend-level pagination (`limit`/`offset`) and search logic to ensure performance as the database scales.
- **Asset Handling**: Integrated `multer` for multi-part file uploads, storing relative paths for frontend compatibility.

### 3. Order Fulfillment (Stripe Integration)
- **Transaction Integrity**: Uses PostgreSQL transactions (`BEGIN`, `COMMIT`, `ROLLBACK`) to ensure that order creation, stock deduction, and cart clearing happen atomically.
- **Webhook Processing**: Secure endpoint for Stripe events using raw body verification to confirm authenticity.
- **Idempotency**: Prevents duplicate fulfillment by tracking `stripe_session_id` in the database, ensuring each payment is processed exactly once.

---

## 📈 Future Bottlenecks (Real-World Scenarios)
- **Database Contention**: Under high load, `SELECT ... FOR UPDATE` on products can lead to row locking issues. **Solution**: Implement a caching layer (Redis) for product stock.
- **Search Performance**: Raw `ILIKE` queries scale poorly. **Solution**: Migrate to PostgreSQL Full-Text Search (FTS) or Elasticsearch.
- **Batch Processing**: Generating invoices or shipping labels synchronously can slow down fulfillment. **Solution**: Use a message queue (RabbitMQ/BullMQ) for asynchronous task processing.

---

## 🚢 Deployment Strategies
- **Containerization**: The API is packaged using a multi-stage Docker build to keep the production image under 150MB.
- **Database Migrations**: Uses `db.sql` for initial schema setup. Recommended to migrate to a migration tool (e.g., `dbmate` or `Prisma Migrate`) for versioned schema changes.
- **Environment Management**: Strict separation of concerns using `.env` files.

---

## ✅ TODO List

### Infrastructure
- [x] Multi-stage Docker optimization.
- [x] HTTP-only cookie authentication.
- [x] Global error handling middleware.
- [x] Database healthcheck integration.

### Features
- [x] JWT Authentication (Login/Signup).
- [x] Product CRUD with Image Uploads.
- [x] Cart Management logic.
- [x] Idempotent Stripe Webhook Fulfillment.
- [x] Admin Dashboard endpoints (Order management).
- [ ] Implement Order Status transitions (Pending -> Shipped -> Delivered).
- [ ] Add User Profile update endpoints.

### Quality Assurance
- [x] Sanitize raw error leakage in API responses.
- [x] Implement robust pagination validation.
- [ ] Unit tests for Order fulfillment logic.
- [ ] Integration tests for the Checkout flow.
