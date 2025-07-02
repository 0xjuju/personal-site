# Personal Site

This is the source code for my personal website. It's a full-stack project built using a modern JavaScript frontend and a Python backend. The site includes my portfolio, resume, and information about me.

---

## Overview

* The **frontend** is built with a modern JavaScript framework and uses file-based routing. Styling is handled with utility-first CSS and some custom CSS variables for consistent theming.

* The **backend** is built with Python and serves JSON data to the frontend through clean API endpoints. An admin panel is included for managing site content.

* Both frontend and backend are bundled together into a single deployable container using Docker.

---

## Features

* **Fast page loads**: Uses server-side caching (`force-cache`) to deliver content quickly.
* **Smart content updates**: When admin users make edits (like updating a project), the frontend automatically revalidates the affected pages using custom revalidation logic.
* **Admin dashboard**: Accessible via `/admin`, lets me update content like bio, resume, and projects without touching code.
* **API structure**: Cleanly organized endpoints for `/about`, `/projects`, `/resume`, `/home`, and `/contact`, each backed by a database model.

---

## Running Locally

### Backend (Python)

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

### Frontend (JavaScript)

```bash
cd frontend
pnpm install
pnpm dev
```

### All Together (Docker)

```bash
docker build -t personal-site .
docker run -p 8000:8000 -p 3000:3000 personal-site
```

---

## Admin Access

Visit `/admin` to log in. This area is protected and only accessible to users marked as admins in the database.

---

## Deployment Notes

* Uses environment variables to configure API base URLs and database connections.
* In production, content updates automatically trigger frontend cache revalidation.

---

## License

MIT
