# Docker Setup Guide

This guide explains how to run the application using Docker and Docker Compose.

## Prerequisites

- Docker Engine (version 20.10.0 or later)
- Docker Compose (version 2.0.0 or later)

## Project Structure

The Docker setup consists of three main services:

1. **Frontend (React)**

   - Port: 80
   - URL: http://localhost:80
   - Configuration: `apps/front-end/Dockerfile`
   - Nginx config: `apps/front-end/nginx.conf`

2. **Backend (NestJS)**

   - Port: 3000
   - URL: http://localhost:3000
   - Configuration: `apps/test-workspace/Dockerfile`

3. **MySQL Database**
   - Port: 3306
   - Credentials:
     - Username: root
     - Password: rootpassword
     - Database: testdb

## Getting Started

1. **Build and Start Services**

   ```sh
   docker-compose up --build
   ```

   This command will:

   - Build all service images
   - Create and start containers
   - Set up the network between services
   - Mount the MySQL volume

2. **View Logs**

   ```sh
   # All services
   docker-compose logs -f

   # Specific service
   docker-compose logs -f [service_name]
   # Example: docker-compose logs -f frontend
   ```

3. **Stop Services**

   ```sh
   # Stop services (preserve data)
   docker-compose down

   # Stop services and remove volumes (clean slate)
   docker-compose down -v
   ```

## Development Workflow

### Rebuilding a Specific Service

```sh
docker-compose up --build [service_name]
# Example: docker-compose up --build frontend
```

### Accessing Services

- Frontend: http://localhost:80
- Backend API: http://localhost:3000
- MySQL: localhost:3306

### Database Management

- Connect to MySQL:
  ```sh
  docker-compose exec mysql mysql -u root -p
  # Enter password when prompted: rootpassword
  ```

### Troubleshooting

1. **Port Conflicts**

   - If ports 80, 3000, or 3306 are already in use, modify the port mappings in `docker-compose.yml`

2. **Container Issues**

   - Check container status:
     ```sh
     docker-compose ps
     ```
   - View container logs:
     ```sh
     docker-compose logs [service_name]
     ```

3. **Database Issues**
   - Reset database:
     ```sh
     docker-compose down -v
     docker-compose up --build
     ```

## Environment Variables

The following environment variables are configured in `docker-compose.yml`:

### Backend Service

- `DATABASE_HOST`: mysql
- `DATABASE_PORT`: 3306
- `DATABASE_USER`: root
- `DATABASE_PASSWORD`: rootpassword
- `DATABASE_NAME`: testdb

### MySQL Service

- `MYSQL_ROOT_PASSWORD`: rootpassword
- `MYSQL_DATABASE`: testdb

## Network Configuration

All services are connected through a Docker network named `app-network`. This ensures:

- Service discovery using container names
- Isolated network environment
- Secure communication between services

## Volume Management

MySQL data is persisted using a Docker volume named `mysql-data`. This ensures:

- Data persistence between container restarts
- Backup and restore capabilities
- Clean separation of data and container lifecycle
