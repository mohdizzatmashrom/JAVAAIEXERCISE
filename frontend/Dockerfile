# Frontend Dockerfile for Day 18
# Purpose: build the React app once, then serve the production files with Nginx.

FROM node:24-alpine AS build

WORKDIR /app

# Copy package metadata first to improve Docker layer caching.
COPY package*.json ./

# If package-lock.json exists, npm ci is cleaner. If students do not have a lock file, fallback to npm install.
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .
RUN npm run build

FROM nginx:1.27-alpine

# curl is needed for the HEALTHCHECK below; not present in the base image by default.
RUN apk add --no-cache curl

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
