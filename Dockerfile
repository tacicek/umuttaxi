# --- Build stage -------------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies (use lockfile for reproducible builds)
COPY package.json package-lock.json ./
RUN npm ci

# Build the Astro site (hybrid: static pages + Node server for /api/submit)
COPY . .
RUN npm run build

# --- Runtime stage -----------------------------------------------------------
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# The standalone Node adapter listens on HOST:PORT.
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

# Only the build output + production deps are needed at runtime.
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

CMD ["node", "./dist/server/entry.mjs"]
