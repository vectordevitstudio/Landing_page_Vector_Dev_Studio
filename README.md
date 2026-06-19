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

## Деплой

Продакшен-развёртывание на VPS (Docker + nginx + HTTPS через Let's Encrypt)
описано в [DEPLOY.md](DEPLOY.md).

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
