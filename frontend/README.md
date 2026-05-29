# PlayStation Auth Portal — Frontend

Aplicación web React que provee una **página de inicio de sesión** y una **página de bienvenida protegida**, utilizando el servicio de autenticación JWT del backend FastAPI.

---

## Tabla de contenidos

- [Características](#características)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos](#requisitos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Variables de entorno](#variables-de-entorno)
- [Uso de la aplicación](#uso-de-la-aplicación)
- [Diseño](#diseño)
- [Flujo de autenticación](#flujo-de-autenticación)

---

## Características

- **Página de login** — Formulario de usuario y contraseña que llama al endpoint `POST /auth/login` del backend.
- **Página de bienvenida** — Página protegida que solo es accesible una vez que el usuario ha iniciado sesión.
- **Protección de rutas** — Redirección automática al login si el usuario no tiene sesión activa.
- **Almacenamiento en sesión** — El token JWT se guarda en `sessionStorage` (no persiste al cerrar la pestaña).
- **Cierre de sesión** — Botón "Cerrar sesión" que elimina el token y redirige al login.
- **Diseño PlayStation** — Estilo basado en el sistema de diseño PlayStation definido en `DESIGN.md`.

---

## Estructura del proyecto

```
frontend/
├── public/                  # Archivos estáticos
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx   # Guard de rutas privadas
│   ├── pages/
│   │   ├── LoginPage.jsx        # Página de inicio de sesión
│   │   └── WelcomePage.jsx      # Página de bienvenida (protegida)
│   ├── services/
│   │   └── auth.js              # Lógica de autenticación y sessionStorage
│   ├── App.jsx                  # Configuración de rutas
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Estilos del sistema de diseño PlayStation
├── index.html
├── package.json
├── vite.config.js
├── .env.example
└── README.md
```

---

## Requisitos

| Herramienta | Versión mínima |
|-------------|----------------|
| Node.js     | 18             |
| npm         | 9              |

El **backend** debe estar en ejecución antes de iniciar el frontend. Consulta `backend/README.md` para instrucciones.

---

## Instalación y ejecución

### 1. Instalar dependencias

```bash
cd frontend
npm install
```

### 2. Configurar variables de entorno (opcional)

```bash
cp .env.example .env
# Editar .env si el backend corre en un puerto distinto a 8000
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en **http://localhost:5173**.

### 4. Compilar para producción

```bash
npm run build
```

Los archivos compilados se generan en la carpeta `dist/`.

---

## Variables de entorno

| Variable            | Descripción                        | Valor por defecto              |
|---------------------|------------------------------------|-------------------------------|
| `VITE_API_BASE_URL` | URL base del backend FastAPI        | `http://localhost:8000`        |

---

## Uso de la aplicación

### Inicio de sesión

1. Abre **http://localhost:5173** en el navegador.
2. Serás redirigido automáticamente a `/login`.
3. Ingresa las credenciales por defecto:
   - **Usuario:** `admin`
   - **Contraseña:** `admin123`
4. Haz clic en **"Ingresar"**.
5. Al autenticarte correctamente, serás redirigido a la página de bienvenida `/welcome`.

### Página de bienvenida

- Muestra el nombre de usuario autenticado.
- Presenta información del estado de la sesión JWT.
- El botón **"Cerrar sesión"** en la barra superior elimina el token y regresa al login.

### Protección de rutas

- Si intentas acceder directamente a `/welcome` sin estar autenticado, la aplicación te redirigirá automáticamente a `/login`.
- Al cerrar la pestaña del navegador, la sesión expira (el token se elimina de `sessionStorage`).

---

## Diseño

La interfaz sigue el sistema de diseño PlayStation definido en [`DESIGN.md`](../DESIGN.md):

- **Fondo:** Canvas oscuro (`#000000`) y Surface Dark Elevated (`#121314`).
- **Botón principal:** Pill completamente redondeado en PlayStation Blue (`#0070d1`).
- **Tipografía:** PlayStation SST / Inter, peso 300 para titulares y 700 para CTAs.
- **Cards:** 8px de radio (`--rounded-md`) con borde hairline oscuro.
- **Hero:** Banda PlayStation Blue con titular display-xl (54px, weight 300).
- **Errores:** Color warning (`#c81b3a`).

---

## Flujo de autenticación

```
Usuario → GET /                → Redirige a /login
Usuario → POST /auth/login     → Backend valida credenciales
Backend → Token JWT            → Frontend guarda en sessionStorage
Usuario → GET /welcome         → ProtectedRoute verifica token
ProtectedRoute → Sin token     → Redirige a /login
ProtectedRoute → Con token     → Renderiza WelcomePage
Usuario → Cerrar sesión        → Elimina token → Redirige a /login
```

---

## Ejecución completa (backend + frontend)

### Con Poetry (backend)

```bash
# Terminal 1 — Backend
cd backend
poetry install
poetry run uvicorn app.main:app --reload
# → http://localhost:8000

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### Con Docker (backend)

```bash
# Terminal 1 — Backend con Docker Compose
cd backend
docker compose up

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev
```
