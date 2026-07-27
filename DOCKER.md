# Docker Setup Guide for Athos

This directory contains the Docker configuration for containerizing and running the Athos web application using Docker and Docker Compose.

---

## 📁 File Overview

| File | Location | Description |
|------|----------|-------------|
| `docker-compose.yml` | `/docker-compose.yml` | Multi-container Docker compose orchestration configuration |
| `.env` | `/.env` | Root environment variables loaded by Docker Compose |
| `.env.example` | `/.env.example` | Template for root environment configuration |
| `.dockerignore` | `/.dockerignore` | Global ignore list for Docker build contexts |
| `Dockerfile` | `/client/Dockerfile` | Multi-stage Dockerfile (Node.js build -> Nginx Alpine production) |
| `nginx.conf` | `/client/nginx.conf` | Custom Nginx config handling SPA routing, Gzip compression & API reverse proxy |
| `.dockerignore` | `/client/.dockerignore` | Client-specific ignore list |

---

## 🚀 Quick Start Guide

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### 1. Run with Docker Compose (Recommended)

To build and launch the application container:

```bash
docker compose up --build -d
```

- **Application Access**: Open [http://localhost:8080](http://localhost:8080) (or the port defined by `VITE_PORT` in `.env`) in your browser.
- **View Logs**:
  ```bash
  docker compose logs -f client
  ```
- **Stop Containers**:
  ```bash
  docker compose down
  ```

---

## ⚙️ Environment Configuration

You can customize the API endpoint and port by modifying the root `.env` file:

### Root `.env` Example
```env
VITE_PORT=8080
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
```

---

## 🛠️ Building & Running Container Directly with Docker CLI

If you prefer using `docker build` and `docker run` directly:

### 1. Build the Docker Image
```bash
docker build \
  --build-arg VITE_API_URL=http://localhost:5000/api \
  --build-arg VITE_BACKEND_URL=http://localhost:5000 \
  --build-arg VITE_PORT=8080 \
  -t athos-client ./client
```

### 2. Run the Container
```bash
docker run -d \
  --name athos-client \
  -p 8080:80 \
  athos-client
```

---

## 🔍 Features & Architectural Highlights

1. **Multi-Stage Build**: Keeps the production Docker image tiny by excluding `node_modules` and raw source files, serving only optimized static bundles via Nginx Alpine (~25MB image size).
2. **Single Page Application (SPA) Routing**: Nginx is pre-configured with `try_files $uri $uri/ /index.html` to prevent 404 errors when reloading client-side React routes.
3. **Built-in Reverse Proxying**: Routes `/api/*` and `/uploads/*` requests to the host machine backend (`host.docker.internal:5000`).
4. **Performance**: Enabled Gzip text compression and long-term caching headers for static assets (images, JS, CSS, fonts).
