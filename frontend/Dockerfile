# Purpose: build the React app once, then serve the production files with Nginx

FROM node:24-alpine AS build

WORKDIR /app

# Copy package metadata first to improve Docker later caching
COPY package*.json ./

# If package-lock.json exists, npm ci will be used to install dependencies, otherwise npm install will be used
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .
RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
