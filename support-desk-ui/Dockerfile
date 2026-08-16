# ===== Stage 1: Build React app =====
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency manifests first (better layer caching)
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies needed for the build)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the production bundle (outputs to dist/)
RUN npm run build

# ===== Stage 2: Serve with Nginx =====
FROM nginx:1.27-alpine

# Remove the default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Nginx runs in the foreground by default
CMD ["nginx", "-g", "daemon off;"]
