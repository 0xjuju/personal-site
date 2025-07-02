# Personal-Site 🏠

My portfolio site built with **FastAPI + SQLAlchemy + PostgreSQL** on the backend and **Next.js + React + TypeScript** on the frontend. Everything runs from a single Docker container.

---

## Key Features

| Layer                  | Info                                                                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Backend (FastAPI)**  | • REST API mounted at `/api` with Pydantic validation• Async SQLAlchemy + PostgreSQL• `sqladmin` UI at `/admin` with session-based auth• CORS, session, and rate-limiting middleware |
| **Frontend (Next.js)** | • App-router  (`/app`)• Uses `force-cache` for instant static pages• Custom revalidation logic for dynamic page updates • Tailwind CSS + custom theming                              |
| **DevOps**             | • Multi-stage Dockerfile builds static frontend, then runs backend and frontend in a single container                                                                                |

---

## 🗂️ Repository Layout

```text
personal-site/
│
├─ app/                     ← FastAPI application
│   ├─ api/                 ← Versioned routers & endpoints
│   │   └─ v1/endpoints/    ← about, project, resume, home, contact routes
│   ├─ core/                ← Config, database, security, etc.
│   ├─ models/              ← SQLAlchemy ORM models
│   └─ admin/               ← sqladmin views & auth backend
│
├─ frontend/                ← Next.js / React
│   ├─ src/app/             ← App-router pages (about, projects, etc.)
│   ├─ src/lib/             ← API helpers & config
│   ├─ styles/              ← Tailwind layers & global CSS
│   └─ tailwind.config.js
│
├─ requirements.txt         ← Python dependencies
├─ Dockerfile               ← Multi-stage build 
└─ README.md
```

---

## API Overview

| Method | Path              | Description                                                                        | Response Model |
| ------ | ----------------- | ---------------------------------------------------------------------------------- | -------------- |
| GET    | `/api/about`      | About-page hero, story & slides                                                    | `About`        |
| GET    | `/api/projects`   | All portfolio projects                                                             | `Project[]`    |
| GET    | `/api/resume`     | Resume with skills & work history                                                  | `Resume`       |
| GET    | `/api/home`       | Landing-page CTA / timeline data                                                   | `Home`         |
| GET    | `/api/contact`    | Contact links & metadata                                                           | `Contact`      |
| POST   | `/api/revalidate` | Revalidates a dynamic frontend tag by key. Requires `secret_token` authentication. | `None`         |

All endpoints are registered in **`app/api/v1/api.py`** and mounted by `app/main.py`.

---

## Environment Variables

| Variable               | Purpose                            | Example                                        |
| ---------------------- | ---------------------------------- | ---------------------------------------------- |
| `SECRET_KEY`           | Session & password hashing         | `mysupersecretkey`                             |
| `DATABASE_URL`         | PostgreSQL connection string       | `postgres://user:pass@localhost:5432/personal` |
| `API_BASE_INTERNAL`    | Backend base URL **inside** Docker | `http://backend:8000`                          |
| `REVALIDATION_KEY`     | protect api/revalidate with secret token | `anothersupersecretkey`                    |
| `NEXT_PUBLIC_API_BASE` | Backend URL for the browser        | `http://localhost:8000`                        |

---

## Local Development

### 1. Back-end (port 8000)

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # then fill SECRET_KEY, DATABASE_URL, etc.
alembic upgrade head          # create tables
uvicorn app.main:app --reload --port 8000
```

### 2. Front-end (port 3000)

```bash
cd frontend
pnpm install                  # or npm / yarn
pnpm dev                      # hot-reload at http://localhost:3000
```

`apiFetch` automatically selects the correct base URL

---

## One-command Docker Build

```bash
docker build -t personal-site \
  --build-arg API_BASE_INTERNAL=http://localhost:8000 \
  --build-arg NEXT_PUBLIC_API_BASE=http://localhost:8000 .
docker run -p 8000:8000 -p 3000:3000 personal-site
```

Inside the container:

* **FastAPI** is served by Gunicorn + Uvicorn workers on **:8000**.
* **Next.js** runs in standalone mode on **:3000** (production build).
* Both processes start via the shell `CMD` in the Dockerfile.

---

## Admin Panel

Visit **`http://localhost:8000/admin`** and log in. Authentication is handled through the `sqladmin` backend using secure session cookies.

---

## Deployment Notes

* Point `DATABASE_URL` to your managed PostgreSQL instance and run migrations.
* Content edits in the admin panel trigger revalidation on the appropriate frontend pages.
* A reverse proxy (e.g., Nginx or Cloud Run) should route:

  * `/api/*` → backend :8000
  * `/*`     → frontend :3000 (static + dynamic content)

---

---

## 📄 License

Released under the **MIT License**. See [`LICENSE`](./LICENSE) for details.
