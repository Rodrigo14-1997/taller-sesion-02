# Taller Sesión 02 — JWT Auth App

Aplicación full-stack de autenticación JWT compuesta por un **backend FastAPI** y un **frontend React**.

---

## Estructura del repositorio

```
taller-sesion-02/
├── backend/     # API FastAPI con autenticación JWT (Poetry)
├── frontend/    # Aplicación React + Vite
├── DESIGN.md    # Sistema de diseño PlayStation
└── README.md    # Este archivo
```

---

## Inicio rápido

### 1. Backend

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload
# API disponible en http://localhost:8000
# Docs interactivos: http://localhost:8000/docs
```

Credenciales por defecto: **usuario** `admin` / **contraseña** `admin123`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# Aplicación disponible en http://localhost:5173
```

---

## Documentación detallada

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [Sistema de Diseño](./DESIGN.md)
