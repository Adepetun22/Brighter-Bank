FROM node:20-alpine AS builder
WORKDIR /app

# Copy lockfile and package manifests first for repeatable installs
COPY package.json package-lock.json* ./
COPY tsconfig.json ./tsconfig.json

# Make sure dev dependencies are available during build
ENV NODE_ENV=development
RUN npm ci

# Copy source and build
COPY src ./src
COPY scripts ./scripts
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app

# Production environment
ENV NODE_ENV=production

# Copy only runtime artifacts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/index.js"]