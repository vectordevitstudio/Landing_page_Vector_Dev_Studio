# ──────────────────────────────────────────────────────────────────────
# Stage 1 — сборка статики (Vite + React + TypeScript)
# ──────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

# Сначала манифесты — слой npm ci кэшируется, пока они не меняются
COPY package.json package-lock.json ./
RUN npm ci

# Затем исходники и сборка → /app/dist
COPY . .
RUN npm run build

# ──────────────────────────────────────────────────────────────────────
# Stage 2 — раздача статики через nginx
# ──────────────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runtime

# Убираем дефолтный сайт, кладём наш шаблон конфига и сниппет с заголовками.
# Шаблон обрабатывается envsubst на старте контейнера (подставляется ${DOMAIN}).
RUN rm -f /etc/nginx/conf.d/default.conf
COPY deploy/nginx/security.conf      /etc/nginx/snippets/security.conf
COPY deploy/nginx/app.conf.template  /etc/nginx/templates/app.conf.template

# Хук entrypoint: фоновый перезапуск nginx для подхвата продлённых сертификатов.
# Кладём в /docker-entrypoint.d, чтобы сохранить штатный CMD (nginx) — иначе
# официальный образ не обработает шаблоны через envsubst.
COPY deploy/nginx/reload.sh          /docker-entrypoint.d/99-reload-on-renewal.sh
RUN chmod +x /docker-entrypoint.d/99-reload-on-renewal.sh

# Собранная статика
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80 443

# CMD наследуется из базового образа (nginx -g 'daemon off;').
# docker compose переопределяет command, добавляя периодический reload
# для подхвата продлённых сертификатов.
