# Vector Dev Studio — лендинг

Продающий лендинг AI-студии на **React 18 + TypeScript + Vite**, со scroll-анимациями
(Framer Motion), плавным скроллом (Lenis) и анимированным нейросетевым фоном на Canvas.

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
```

Сборка и предпросмотр продакшен-версии:

```bash
npm run build
npm run preview
```

## Структура

```
src/
├── components/
│   ├── layout/      Navbar, Footer
│   ├── sections/    Hero, Stats, Services, Products, Cases,
│   │                Process, TechStack, Testimonials, CTA
│   └── ui/          Logo, Badge, Button, GlowCard, GradientText,
│                    SectionHeader, NeuralBackground, GlowOrbs
├── hooks/           useScrollAnimation, useSmoothScroll
├── lib/             animations.ts (Framer-варианты), cn.ts
├── data/            content.ts — ВЕСЬ контент и тексты в одном месте
├── App.tsx
├── main.tsx
└── index.css        дизайн-система (CSS-переменные, шрифты, a11y)
```

## Где что менять

- **Тексты, услуги, кейсы, продукты, отзывы, контакты** — `src/data/content.ts`.
- **Контакты** (Telegram / email / телефон) сейчас ЗАГЛУШКИ — блок `BRAND` в `content.ts`.
- **Цвета и токены** — `:root` в `src/index.css` и `tailwind.config.js`.
- **Отправка формы** в CTA — пометка `TODO` в `src/components/sections/CTA.tsx`
  (сейчас форма показывает заглушку успеха, бэкенд не подключён).

## Отклонения от исходного ТЗ (осознанные)

1. **Нейросетевой фон — Canvas 2D, а не Three.js.** ТЗ допускает выбор
   («THREE.js или Canvas — выбери лучшее»). Canvas даёт ту же визуализацию
   (150+ точек, связи, притяжение к курсору) при меньшем весе бандла и без
   зависимостей three / r3f.
2. **Иконки технологий — стилизованные бейджи, а не брендовые логотипы.**
   Безопаснее по товарным знакам и надёжнее рендерится. Реальные SVG-логотипы
   легко добавить в `TechStack.tsx`, если потребуется.
3. **GSAP не используется** — все нужные эффекты закрыты Framer Motion + CSS.

## Доступность

- Видимый фокус (`:focus-visible`) на всех интерактивных элементах.
- `prefers-reduced-motion`: отключает анимации, Lenis и циклы Canvas.
- ARIA: табы продуктов (`role="tab"`/`aria-selected`), кнопки без текста с
  `aria-label`, скрытые подписи у поля формы, skip-link «Перейти к контенту».
- Семантика: `header` / `main` / `footer`, `blockquote`/`footer` в отзывах.
```
