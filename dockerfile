# Stage 1 — Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json tsconfig*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build  # should compile TypeScript into dist/

# Stage 2 — Runtime stage
FROM node:20-alpine
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built output from builder
COPY --from=builder /app/dist ./dist

# Security best practice: create non-root user
RUN addgroup -S app && adduser -S app -G app
USER app

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://localhost:4000/api/health || exit 1

CMD ["node", "dist/server.js"]
