# My Site 🏠

A **portfolio** site built with **FastAPI + SQLAlchemy + PostgreSQL** on the back end and **Next.js + React + Tailwind** on the front.
Everything can run in a single Docker container.

---

## ✨ Key Features

| Layer                  | Highlights                                                                                                                                                                                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend (FastAPI)**  | • REST API mounted at `/api` with typed Pydantic responses<br>• Async SQLAlchemy + PostgreSQL<br>• `sqladmin` UI at `/admin` with session-based auth<br>• CORS & session middleware already configured                                                     |
| **Frontend (Next.js)** | • App-router architecture (`/app`)<br>• Incremental static regeneration with `REVALIDATION` constant<br>• Tailwind + custom CSS variables for theming<br>• Type-safe API helpers (`apiFetch`) that auto-select the correct base URL (server vs. browser) |
| **DevOps**             | • Multi-stage **Dockerfile** that first builds the static site, then serves **FastAPI on :8000** and **Next.js on :3000** side-by-side                                                                                                                     |

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
├─ frontend/                ← Next.js 15 codebase
│   ├─ src/app/             ← App-router pages (about, projects, etc.)
│   ├─ src/lib/             ← API helpers & config
│   ├─ styles/              ← Tailwind layers & global CSS
│   └─ tailwind.config.js
│
├─ requirements.txt         ← Python dependencies
├─ Dockerfile               ← Multi-stage build (see below)
└─ README.md
```

---

## 🔌 API Overview

| Method | Path            | Description                       | Response Model |
| ------ | --------------- | --------------------------------- | -------------- |
| GET    | `/api/about`    | About-page hero, story & slides   | `About`        |
| GET    | `/api/projects` | All portfolio projects            | `Project[]`    |
| GET    | `/api/resume`   | Resume with skills & work history | `Resume`       |
| GET    | `/api/home`     | Landing-page CTA / timeline data  | `Home`         |
| GET    | `/api/contact`  | Contact links & metadata          | `Contact`      |

All endpoints are registered in **`app/api/v1/api.py`** and mounted by `app/main.py`.

---

## ⚙️ Environment Variables

| Variable               | Purpose                            | Example                                        |
| ---------------------- | ---------------------------------- | ---------------------------------------------- |
| `SECRET_KEY`           | Session & password hashing         | `mysupersecretkey`                             |
| `DATABASE_URL`         | PostgreSQL connection string       | `postgres://user:pass@localhost:5432/personal` |
| `API_BASE_INTERNAL`    | Backend base URL **inside** Docker | `http://backend:8000`                          |
| `NEXT_PUBLIC_API_BASE` | Backend URL for the browser        | `http://localhost:8000`                        |

---

## 🏃‍♂️ Local Development

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

`apiFetch` automatically selects the correct base URL thanks to the environment variables above.

---

## 🐳 One-command Docker Build

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

## 🛡️ Admin Panel

Visit **`http://localhost:8000/admin`** and log in with a user marked `is_admin=True`.
Authentication is handled through the lightweight `sqladmin` backend (`app/admin/auth.py`) using secure session cookies.

---

## 📦 Deployment Notes

* **Gunicorn** is production-ready; scale `--workers` by CPU count.
* Point `DATABASE_URL` to your managed PostgreSQL instance and run migrations.
* Use a reverse proxy (e.g., Nginx or Cloud Run) to expose only **ports 80/443** and route:

  * `/api/*` → backend :8000
  * `/*`     → next :3000 (static & SSR content)

---

## 🙌 Contributing

1. Fork the repo & create a feature branch.
2. Run `pnpm lint` & `pnpm type-check` (see **package.json**).
3. Open a pull request—include a short description & screenshots for UI work.

---

## 📄 License

Released under the **MIT License**. See [`LICENSE`](./LICENSE) for details.
