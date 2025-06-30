# 1) FRONTEND BUILD  Next.js standalone

FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend

ARG API_BASE_INTERNAL
ARG NEXT_PUBLIC_API_BASE
ENV API_BASE_INTERNAL=$API_BASE_INTERNAL
ENV NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE

RUN npm i -g pnpm
COPY frontend/package.json frontend/pnpm-lock.* ./
RUN pnpm install --frozen-lockfile
COPY frontend .
RUN pnpm build

# 2) RUNTIME IMAGE  (Python + slim Node
FROM python:3.11-slim
WORKDIR /app

# install Node for Next.js runtime
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# install backend deps
COPY requirements.txt .
RUN pip install --no-cache-dir --break-system-packages -r requirements.txt

# copy backend source
COPY app ./app
COPY alembic alembic
COPY alembic.ini .

# copy Next.js standalone output
COPY --from=frontend-build /app/frontend/.next/standalone ./
COPY --from=frontend-build /app/frontend/.next/static ./.next/static
COPY --from=frontend-build /app/frontend/public ./public


# runtime env
ARG API_BASE_INTERNAL
ARG NEXT_PUBLIC_API_BASE
ENV API_BASE_INTERNAL=$API_BASE_INTERNAL
ENV NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE
ENV NODE_ENV=production
ENV PATH="/usr/local/bin:${PATH}"

EXPOSE 8000 3000

CMD ["sh", "-c", "\
  gunicorn -k uvicorn.workers.UvicornWorker -w 2 \
           -b 0.0.0.0:8000 app.main:app & \
  node server.js --port ${PORT:-3000} \
"]
