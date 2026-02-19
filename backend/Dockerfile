# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files first for caching
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Prune development dependencies
RUN npm prune --production

# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy only the necessary files for running the app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Create uploads directory (will be used by volume)
RUN mkdir -p dist/uploads

EXPOSE 5000

# Using node directly instead of npm for better signal handling (Ctrl+C)
CMD ["node", "dist/index.js"]
