#!/usr/bin/env bash
# Первичный выпуск TLS-сертификата Let's Encrypt для связки Docker + nginx + certbot.
# Решает проблему «курицы и яйца»: nginx не стартует без сертификата, а certbot
# не пройдёт ACME-челлендж без работающего nginx.
#
# Запуск из корня проекта:  bash deploy/init-letsencrypt.sh
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  echo "✗ Нет файла .env. Выполните: cp .env.deploy.example .env  и заполните его." >&2
  exit 1
fi

# Загружаем переменные окружения из .env
set -a
# shellcheck disable=SC1091
. ./.env
set +a

: "${DOMAIN:?DOMAIN не задан в .env}"
: "${CERTBOT_EMAIL:?CERTBOT_EMAIL не задан в .env}"
STAGING="${STAGING:-0}"

LIVE_DIR="./certbot/conf/live/${DOMAIN}"
echo "### Домен: ${DOMAIN} | Email: ${CERTBOT_EMAIL} | Staging: ${STAGING}"

if [ -d "${LIVE_DIR}" ]; then
  printf "Сертификат для %s уже существует. Перевыпустить? (y/N) " "${DOMAIN}"
  read -r ans
  case "${ans}" in
    [yY]) : ;;
    *) echo "Отмена."; exit 0 ;;
  esac
fi

mkdir -p "${LIVE_DIR}" ./certbot/www

echo "### 1/5 Временный самоподписанный сертификат (чтобы nginx смог стартовать)…"
docker compose run --rm --entrypoint sh certbot -c "\
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout /etc/letsencrypt/live/${DOMAIN}/privkey.pem \
    -out    /etc/letsencrypt/live/${DOMAIN}/fullchain.pem \
    -subj   /CN=localhost"

echo "### 2/5 Сборка и запуск nginx…"
docker compose up -d --build web

echo "### 3/5 Удаление временного сертификата…"
docker compose run --rm --entrypoint sh certbot -c "\
  rm -rf /etc/letsencrypt/live/${DOMAIN} \
         /etc/letsencrypt/archive/${DOMAIN} \
         /etc/letsencrypt/renewal/${DOMAIN}.conf"

staging_arg=""
if [ "${STAGING}" != "0" ]; then staging_arg="--staging"; fi

echo "### 4/5 Запрос сертификата Let's Encrypt…"
# shellcheck disable=SC2086
docker compose run --rm --entrypoint certbot certbot \
  certonly --webroot -w /var/www/certbot ${staging_arg} \
    -d "${DOMAIN}" \
    --email "${CERTBOT_EMAIL}" \
    --rsa-key-size 4096 \
    --agree-tos --no-eff-email --non-interactive --force-renewal

echo "### 5/5 Перезапуск nginx с боевым сертификатом…"
docker compose exec web nginx -s reload

echo "✓ Готово. Откройте https://${DOMAIN}"
echo "  Не забудьте запустить автопродление:  docker compose up -d"
