FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./package.json
COPY tsconfig.json ./tsconfig.json
RUN npm install
COPY src ./src
COPY scripts ./scripts
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]