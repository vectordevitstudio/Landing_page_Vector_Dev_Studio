import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  r: number;
}

const VIOLET = 'rgba(109, 86, 250, ';
const CYAN = 'rgba(0, 212, 255, ';

/**
 * Анимированная нейросеть: точки движутся, соединяются линиями,
 * ближайшие к курсору притягиваются и ярче светятся.
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
    const mouse = { x: -9999, y: -9999 };
    const CONNECT_DIST = 130;
    const MOUSE_DIST = 180;

    const buildNodes = () => {
      // плотность ~ площади, минимум 150 точек
      const count = Math.max(150, Math.round((width * height) / 11000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        color: Math.random() > 0.45 ? VIOLET : CYAN,
        r: Math.random() * 1.4 + 0.8,
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

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // движение
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // притяжение к курсору
        const dxm = mouse.x - n.x;
        const dym = mouse.y - n.y;
        const dm = Math.hypot(dxm, dym);
        let glow = 0;
        if (dm < MOUSE_DIST) {
          const force = (1 - dm / MOUSE_DIST) * 0.04;
          n.x += dxm * force;
          n.y += dym * force;
          glow = 1 - dm / MOUSE_DIST;
        }

        // линии к соседям
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const d = Math.hypot(dx, dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.16;
            const grad = ctx.createLinearGradient(n.x, n.y, m.x, m.y);
            grad.addColorStop(0, `${n.color}${alpha})`);
            grad.addColorStop(1, `${m.color}${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }

        // точка
        const baseAlpha = n.color === VIOLET ? 0.6 : 0.4;
        ctx.fillStyle = `${n.color}${baseAlpha + glow * 0.4})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + glow * 1.6, 0, Math.PI * 2);
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
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
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
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Растворение фона вниз */}
      <div className="absolute inset-0 [background:linear-gradient(to_bottom,transparent_55%,var(--bg-primary)_100%)]" />
    </div>
  );
};
