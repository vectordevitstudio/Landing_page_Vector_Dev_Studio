# Деплой на VPS (Docker + nginx + HTTPS)

Лендинг — это статика (Vite собирает `dist/`). На сервере её раздаёт **nginx**,
а **certbot** выпускает и автоматически продлевает бесплатный TLS-сертификат
Let's Encrypt. Всё запускается через **Docker Compose** — два контейнера:

| Контейнер | Образ | Роль |
|-----------|-------|------|
| `vds-web` | собирается из `Dockerfile` (node → nginx) | сборка статики + раздача по HTTP/HTTPS |
| `vds-certbot` | `certbot/certbot` | выпуск и автопродление сертификата |

Собственный backend не нужен: сайт полностью статический, заявки приходят
напрямую в Telegram и на почту (контакты в `src/data/content.ts`).

---

## 1. Что нужно заранее

- VPS с Ubuntu 22.04/24.04 (подойдёт и Debian), 1 ГБ RAM, root или sudo.
- Домен **info.vectordev.ru** с **A-записью**, указывающей на IP сервера
  (для IPv6 — ещё и `AAAA`). Проверка: `dig +short info.vectordev.ru`.
- Открытые порты **80** и **443**.

> Let's Encrypt выдаёт сертификат только на реальный домен, к которому он может
> достучаться по порту 80. На «голый» IP сертификат не выпустить.

---

## 2. Установка Docker на сервер

```bash
# Официальный скрипт Docker (Ubuntu/Debian)
curl -fsSL https://get.docker.com | sudo sh

# Запускать docker без sudo (перелогиньтесь после команды)
sudo usermod -aG docker $USER

# Проверка
docker --version
docker compose version
```

## 3. Файрвол (опционально, но желательно)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 4. Получить код на сервер

```bash
git clone <URL-репозитория> vector-dev-studio
cd vector-dev-studio
```

## 5. Настроить переменные окружения

```bash
cp .env.deploy.example .env
nano .env
```

Заполните:

```ini
DOMAIN=info.vectordev.ru                # server_name + домен сертификата
CERTBOT_EMAIL=admin@vectordev.ru        # уведомления Let's Encrypt
STAGING=0                               # 1 — тестовый прогон без лимитов
```

> `.env` в git не коммитится (см. `.gitignore`).

## 6. Первый выпуск сертификата

Скрипт сам поднимет nginx с временным самоподписанным сертификатом, получит
боевой сертификат Let's Encrypt и перезагрузит nginx:

```bash
bash deploy/init-letsencrypt.sh
```

**Совет:** перед боевым выпуском прогоните на staging, чтобы не упереться в
[лимиты Let's Encrypt](https://letsencrypt.org/docs/rate-limits/) при ошибке в
настройке. Поставьте в `.env` `STAGING=1`, запустите скрипт (браузер будет
ругаться на сертификат — это нормально). Убедившись, что всё работает, верните
`STAGING=0` и запустите скрипт ещё раз — он предложит перевыпустить сертификат.

## 7. Запуск

```bash
docker compose up -d
```

Поднимется `vds-web` (раздача сайта) и `vds-certbot` (автопродление).
Проверьте статус:

```bash
docker compose ps          # web должен быть healthy
```

## 8. Проверка

```bash
curl -I http://info.vectordev.ru     # ожидаем 301 → https
curl -I https://info.vectordev.ru    # ожидаем 200 + заголовки безопасности
```

Откройте `https://info.vectordev.ru` в браузере — должен быть валидный замок,
редирект с http, и рабочие ссылки на Telegram и почту в секции контактов.

---

## Обновление сайта

```bash
git pull
docker compose up -d --build web   # пересобрать образ и перезапустить nginx
```

Старые слои закэшированы, пересборка быстрая. Сертификаты не затрагиваются.
Иногда полезно подчистить старые образы: `docker image prune -f`.

## Продление сертификатов

Происходит **автоматически**:

- контейнер `vds-certbot` каждые 12 ч вызывает `certbot renew`
  (реально продлевает за 30 дней до истечения);
- контейнер `vds-web` каждые 6 ч делает `nginx -s reload`, подхватывая новый
  сертификат.

Проверить продление вручную, ничего не меняя:

```bash
docker compose run --rm --entrypoint certbot certbot renew --dry-run
```

## Логи и обслуживание

```bash
docker compose logs -f web        # логи nginx
docker compose logs -f certbot    # логи продления
docker compose restart web        # перезапуск nginx
docker compose down               # остановить всё
```

---

## Траблшутинг

- **`init-letsencrypt.sh` не получает сертификат** — чаще всего DNS ещё не
  указывает на сервер или закрыт порт 80. Проверьте `dig +short info.vectordev.ru`
  и доступность `http://info.vectordev.ru/.well-known/acme-challenge/test`.
- **`too many certificates already issued`** — упёрлись в лимит из-за повторных
  боевых попыток. Используйте `STAGING=1`, пока не отладите.
- **nginx не стартует: `cannot load certificate`** — каталог `./certbot/conf`
  пуст. Это нормально до первого запуска `init-letsencrypt.sh`; запустите скрипт.
- **Порт 80/443 занят** — на сервере уже есть системный nginx/apache:
  `sudo systemctl disable --now nginx apache2`.

## Безопасность (что уже сделано)

- Принудительный HTTPS: 301 с :80 на `https://${DOMAIN}` (адрес зафиксирован,
  Host-заголовок клиента в редиректе не отражается) и **HSTS** (`max-age` 2 года).
- **Content-Security-Policy**: разрешены только собственные ресурсы + Google Fonts
  (стили/шрифты). `frame-ancestors 'none'` — защита от clickjacking. Подключаете
  внешние сервисы — добавьте источники в `deploy/nginx/security.conf`.
- Заголовки `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`,
  `Permissions-Policy` (камера, микрофон, геолокация запрещены).
- Современный TLS (1.2/1.3), OCSP stapling, `server_tokens off`.
- Долгий иммутабельный кэш для хешированных бандлов, `no-cache` для HTML.
- Форм и пользовательского ввода на сайте нет — нет и поверхности для спама
  и утечки введённых данных.

## Перед публикацией (не блокирует HTTPS)

- В `index.html` указан `og:image` → `/og-image.png`, но файла нет. Положите
  картинку (1200×630) в `public/og-image.png`, иначе превью в соцсетях будет
  битым.
- Telegram и email в `src/data/content.ts` (`BRAND`) — боевые. Заглушка осталась
  только в `BRAND.phone` (в футере такой телефон скрыт) и в `CERTBOT_EMAIL`.
- `public/robots.txt` и `public/sitemap.xml` содержат домен `info.vectordev.ru` —
  поправьте, если домен другой.
