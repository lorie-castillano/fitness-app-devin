# Architecture

## Overview

The Fitness Tracker app follows a simple **client-server architecture** with two independent services orchestrated by Docker Compose.

```
Browser
   │
   │  HTTP (port 3000)
   ▼
┌─────────────────────┐
│   Frontend (Nginx)  │   React SPA served as static files
│   Container: 80     │
└────────┬────────────┘
         │
         │  HTTP REST API (port 5001)
         ▼
┌─────────────────────┐
│   Backend (Node.js) │   Express REST API
│   Container: 5001   │   In-memory data store
└─────────────────────┘
```

---

## Services

### Frontend

| Property     | Value                          |
|--------------|-------------------------------|
| Framework    | React 18                      |
| Build tool   | Create React App (react-scripts) |
| Server       | Nginx (Alpine)                |
| Port         | 3000 (host) → 80 (container)  |
| Build type   | Multi-stage Docker build      |

**How it works:**
1. The React app is compiled into static HTML/CSS/JS during the Docker build stage using `npm run build`.
2. The compiled output is copied into an Nginx container that serves the files.
3. Nginx is configured to support client-side routing (`try_files $uri /index.html`).
4. The API base URL (`REACT_APP_API_URL`) is injected at build time via a Docker build argument.

### Backend

| Property     | Value                          |
|--------------|-------------------------------|
| Runtime      | Node.js 18 (Alpine)           |
| Framework    | Express 4                     |
| Port         | 5001 (host) → 5001 (container)|
| Data storage | In-memory (JavaScript array)  |

**How it works:**
1. Express listens on port `5001` and exposes three REST endpoints under `/api/workouts`.
2. Workout data is stored in a plain JavaScript array (resets on container restart).
3. CORS is enabled to allow requests from the frontend.

---

## Docker Compose

Both services are defined in `docker-compose.yml`:

```
┌──────────────────────────────────────────┐
│           docker-compose.yml             │
│                                          │
│  ┌──────────────┐   ┌──────────────────┐ │
│  │   frontend   │   │     backend      │ │
│  │  port 3000   │──▶│   port 5001      │ │
│  └──────────────┘   └──────────────────┘ │
└──────────────────────────────────────────┘
```

- `frontend` depends on `backend` (starts after backend is up)
- The `REACT_APP_API_URL` build arg is passed to the frontend at image build time
- Both services are built from local Dockerfiles

---

## Data Flow

### Loading Workouts (on page load)
```
Browser → GET /api/workouts → Backend → returns JSON array → React renders table
```

### Adding a Workout
```
User fills form → clicks Add
→ POST /api/workouts (JSON body) → Backend appends to array
→ React re-fetches GET /api/workouts → table updates
```

### Deleting a Workout
```
User clicks Delete
→ DELETE /api/workouts/:id → Backend removes from array
→ React re-fetches GET /api/workouts → table updates
```

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| In-memory storage | Keeps the app simple; no database setup required |
| Multi-stage Docker build | Keeps the frontend image small (only Nginx + static files) |
| Nginx for frontend | Production-grade static file serving with SPA routing support |
| CORS enabled globally | Allows the browser to call the backend from a different port |
| Build-time env var | `REACT_APP_API_URL` must be baked in at build time (Create React App limitation) |
