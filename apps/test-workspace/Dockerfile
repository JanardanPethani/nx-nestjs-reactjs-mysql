FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install
RUN npm install class-validator class-transformer @nestjs/typeorm typeorm mysql2

# Copy source code
COPY . .

# Build the application
RUN npx nx build test-workspace

EXPOSE 3000

CMD ["node", "dist/apps/test-workspace/main.js"] 