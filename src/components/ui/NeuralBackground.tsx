import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  r: number;
  glow: number;
}

const INK = 'rgba(21, 20, 15, ';
const GREEN = 'rgba(15, 165, 108, ';
const LIME = 'rgba(203, 242, 74, ';

/**
 * Анимированная нейросеть: точки свободно дрейфуют и соединяются линиями.
 * Курсор работает как «энергоузел» — мягко расталкивает ближайшие точки,
 * подсвечивает их и протягивает к себе светящиеся связи. Поле никогда не
 * схлопывается в точку: расталкивание квадратично затухает и плавно гаснет,
 * когда курсор уходит, а сеть восстанавливает форму.
 * Поверх — градиент, растворяющий фон вниз.
 */
export const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];

    const mouse = { x: -9999, y: -9999, active: false };
    let mx = -9999; // сглаженная позиция курсора
    let my = -9999;
    let influence = 0; // 0..1 — плавное «присутствие» курсора

    const CONNECT_DIST = 130;
    const MOUSE_DIST = 200; // радиус влияния курсора

    const buildNodes = () => {
      // плотность ~ площади, минимум 150 точек
      const count = Math.max(150, Math.round((width * height) / 11000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        color: Math.random() > 0.72 ? GREEN : INK,
        r: Math.random() * 1.4 + 0.8,
        glow: 0,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // плавно ведём «присутствие» и позицию курсора
      influence += ((mouse.active ? 1 : 0) - influence) * 0.06;
      if (mouse.active) {
        mx += (mouse.x - mx) * 0.14;
        my += (mouse.y - my) * 0.14;
      }
      const active = influence > 0.01;

      // ── проход 1: движение, мягкое расталкивание, подсветка ──
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));

        let glow = 0;
        if (active) {
          const dx = n.x - mx;
          const dy = n.y - my;
          const dm = Math.hypot(dx, dy) || 0.0001;
          if (dm < MOUSE_DIST) {
            const t = 1 - dm / MOUSE_DIST;
            // отталкивание от курсора с квадратичным затуханием
            const push = t * t * 2.4 * influence;
            n.x += (dx / dm) * push;
            n.y += (dy / dm) * push;
            glow = t * influence;
          }
        }
        n.glow = glow;
      }

      // ── проход 2: связи между точками (ярче у курсора) ──
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const d = Math.hypot(dx, dy);
          if (d < CONNECT_DIST) {
            const near = Math.max(n.glow, m.glow);
            const alpha = (1 - d / CONNECT_DIST) * (0.12 + near * 0.5);
            const grad = ctx.createLinearGradient(n.x, n.y, m.x, m.y);
            grad.addColorStop(0, `${n.color}${alpha})`);
            grad.addColorStop(1, `${m.color}${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6 + near * 0.7;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }

      // ── мягкое ядро под курсором ──
      if (active) {
        const coreR = 90;
        const core = ctx.createRadialGradient(mx, my, 0, mx, my, coreR);
        core.addColorStop(0, `${GREEN}${0.1 * influence})`);
        core.addColorStop(1, `${GREEN}0)`);
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(mx, my, coreR, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── проход 3: светящиеся связи к курсору + сами точки ──
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (n.glow > 0.01) {
          const a = n.glow * 0.55;
          const grad = ctx.createLinearGradient(mx, my, n.x, n.y);
          grad.addColorStop(0, `${LIME}${a})`);
          grad.addColorStop(1, `${GREEN}${a * 0.35})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.6 + n.glow * 1.1;
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }

        const baseAlpha = n.color === GREEN ? 0.55 : 0.3;
        ctx.fillStyle = `${n.color}${baseAlpha + n.glow * 0.45})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + n.glow * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let rafId = 0;
    const loop = () => {
      draw();
      rafId = requestAnimationFrame(loop);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      const inside = nx >= 0 && ny >= 0 && nx <= width && ny <= height;
      // привязываем сглаженную позицию при «входе», чтобы не было рывка
      if (inside && !mouse.active) {
        mx = nx;
        my = ny;
      }
      mouse.x = nx;
      mouse.y = ny;
      mouse.active = inside;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    resize();
    if (prefersReduced) {
      draw(); // один статичный кадр
    } else {
      window.addEventListener('mousemove', onMouse);
      canvas.parentElement?.addEventListener('mouseleave', onLeave);
      loop();
    }
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      canvas.parentElement?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 opacity-90" />
      {/* Растворение фона вниз */}
      <div className="absolute inset-0 [background:linear-gradient(to_bottom,transparent_45%,var(--bg-primary)_100%)]" />
    </div>
  );
};
