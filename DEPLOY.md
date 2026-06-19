# Деплой на VPS (Docker + nginx + HTTPS)

Лендинг — это статика (Vite собирает `dist/`). На сервере её раздаёт **nginx**,
а **certbot** выпускает и автоматически продлевает бесплатный TLS-сертификат
Let's Encrypt. Всё запускается через **Docker Compose** — два контейнера:

| Контейнер | Образ | Роль |
|-----------|-------|------|
| `vds-web` | собирается из `Dockerfile` (node → nginx) | сборка статики + раздача по HTTP/HTTPS |
| `vds-certbot` | `certbot/certbot` | выпуск и автопродление сертификата |

Собственный backend не нужен: форма заявки отправляется напрямую в сторонний
сервис [Web3Forms](https://web3forms.com).

---

## 1. Что нужно заранее

- VPS с Ubuntu 22.04/24.04 (подойдёт и Debian), 1 ГБ RAM, root или sudo.
- Домен **info.vectordev.ru** с **A-записью**, указывающей на IP сервера
  (для IPv6 — ещё и `AAAA`). Проверка: `dig +short info.vectordev.ru`.
- Открытые порты **80** и **443**.
- Access key для Web3Forms (форма заявки).

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
VITE_WEB3FORMS_KEY=ваш-ключ-web3forms   # вшивается в бандл при сборке
DOMAIN=info.vectordev.ru                # server_name + домен сертификата
CERTBOT_EMAIL=admin@vectordev.ru        # уведомления Let's Encrypt
STAGING=0                               # 1 — тестовый прогон без лимитов
```

> `.env` в git не коммитится. Ключ Web3Forms всё равно публичный (он попадает
> в клиентский JS) — это штатная схема Web3Forms, не секрет в строгом смысле.

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
редирект с http, и рабочая форма заявки.

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

- Принудительный HTTPS (301 с :80) и **HSTS** (`max-age` 2 года).
- Заголовки `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`.
- Современный TLS (1.2/1.3), OCSP stapling, `server_tokens off`.
- Долгий иммутабельный кэш для хешированных бандлов, `no-cache` для HTML.

**Опционально — Content-Security-Policy.** Не включён по умолчанию, т.к. требует
проверки (Framer Motion использует inline-стили, шрифты грузятся с Google).
Рабочий вариант — добавить в `deploy/nginx/security.conf`:

```nginx
add_header Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://api.web3forms.com; frame-ancestors 'none'; base-uri 'self'" always;
```

## Перед публикацией (не блокирует HTTPS)

- В `index.html` указан `og:image` → `/og-image.png`, но файла нет. Положите
  картинку (1200×630) в `public/og-image.png`, иначе превью в соцсетях будет
  битым.
- Контакты в `src/data/content.ts` (`BRAND`) и `CERTBOT_EMAIL` — заглушки,
  замените на реальные.
- `public/robots.txt` и `public/sitemap.xml` содержат домен `info.vectordev.ru` —
  поправьте, если домен другой.
