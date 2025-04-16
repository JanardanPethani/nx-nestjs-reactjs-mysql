# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npx nx build front-end

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist/apps/front-end /usr/share/nginx/html

# Copy nginx configuration
COPY apps/front-end/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"] 