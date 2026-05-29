# JWT Auth Service — Backend

A **FastAPI** Web API that demonstrates JWT-based authentication.  
Dependencies are managed with **Poetry** and the service can be deployed with **Docker / Docker Compose**.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Development (Poetry)](#local-development-poetry)
- [Running with Docker Compose](#running-with-docker-compose)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)

---

## Features

| Feature | Details |
|---|---|
| Login endpoint | `POST /auth/login` — returns a JWT token |
| Refresh endpoint | `POST /auth/refresh` — issues a new token |
| Token expiration | **300 seconds** (configurable) |
| Default credentials | `admin` / `admin123` |
| Interactive docs | Swagger UI at `/docs`, ReDoc at `/redoc` |

---

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── auth.py        # JWT creation/verification, password hashing
│   ├── config.py      # Settings (loaded from environment / .env)
│   ├── main.py        # FastAPI application entry point
│   ├── routers.py     # /auth/login and /auth/refresh routes
│   └── schemas.py     # Pydantic request/response models
├── Dockerfile
├── docker-compose.yml
├── pyproject.toml
└── README.md
```

---

## Prerequisites

| Tool | Minimum version |
|---|---|
| Python | 3.11 |
| Poetry | 1.8 |
| Docker | 24 |
| Docker Compose | 2 |

---

## Local Development (Poetry)

```bash
# 1. Enter the backend directory
cd backend

# 2. Install all dependencies (including dev)
poetry install

# 3. Run the development server
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at <http://localhost:8000>.  
Interactive docs: <http://localhost:8000/docs>

---

## Running with Docker Compose

```bash
# From the backend/ directory
cd backend

# Build and start the container
docker compose up --build

# Stop the container
docker compose down
```

The API will be available at <http://localhost:8000>.

---

## API Reference

### `POST /auth/login`

Authenticates a user and returns a JWT access token.

**Request body (JSON)**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response**

```json
{
  "access_token": "<jwt_token>",
  "token_type": "bearer",
  "expires_in": 300
}
```

**Example with curl**

```bash
curl -s -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' | python3 -m json.tool
```

---

### `POST /auth/refresh`

Issues a new token using a valid existing token.  
The current token must be sent in the `Authorization` header as `Bearer <token>`.

**Headers**

```
Authorization: Bearer <your_access_token>
```

**Response** — same structure as `/auth/login`

**Example with curl**

```bash
TOKEN=$(curl -s -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

curl -s -X POST http://localhost:8000/auth/refresh \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
```

---

### `GET /health`

Returns a simple health-check response.

```json
{"status": "ok"}
```

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `SECRET_KEY` | `dev-only-secret-key-CHANGE-before-deploying` | Secret used to sign JWT tokens |
| `ALGORITHM` | `HS256` | JWT signing algorithm |
| `ACCESS_TOKEN_EXPIRE_SECONDS` | `300` | Token lifetime in seconds |

You can override these values by creating a `.env` file inside the `backend/` directory:

```dotenv
SECRET_KEY=my-very-strong-secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_SECONDS=300
```

> **Security note:** Always replace the default `SECRET_KEY` with a strong random value before deploying to production.
