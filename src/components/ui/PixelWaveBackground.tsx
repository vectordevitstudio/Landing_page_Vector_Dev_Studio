import { useEffect, useRef } from 'react';

const INK = 'rgba(21, 20, 15, ';
const GREEN = 'rgba(15, 165, 108, ';

const GRID = 22; // шаг сетки ячеек, px
const MOUSE_DIST = 200; // радиус влияния курсора
const WAVE_LEN = 0.045; // пространственная частота волны яркости
const WAVE_SPEED = 1.6; // скорость бега волны

/** Детерминированный хэш ячейки — стабилен между кадрами и ресайзами. */
const cellHash = (i: number, j: number) => {
  const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

/**
 * Плавное «шумовое» поле направлений: сумма разночастотных волн даёт
 * медленные органичные завихрения без резких швов.
 */
const fieldAngle = (x: number, y: number, t: number) =>
  Math.sin(x * 0.0016 + t * 0.32) * 0.9 +
  Math.cos(y * 0.0021 - t * 0.22) * 0.9 +
  Math.sin((x + y) * 0.001 + t * 0.12) * 0.6;

/**
 * «Пиксельная волна» — фон hero из ячеек фирменной сетки 4×4.
 * Квадраты (как в знаке логотипа) лежат неподвижной сеткой, а направление
 * векторного поля показывают волны яркости, бегущие вдоль его линий:
 * фаза волны — проекция координаты ячейки на местное направление поля.
 * Курсор — «магнит»: ближайшие ячейки укрупняются и подсвечиваются
 * изумрудом, влияние затухает квадратично и плавно гаснет при уходе.
 * Поверх — градиент, растворяющий фон вниз.
 */
export const PixelWaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // roundRect нет в старых Safari — мягко откатываемся к прямым углам
    const hasRoundRect = typeof ctx.roundRect === 'function';

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cols = 0;
    let rows = 0;

    const mouse = { x: -9999, y: -9999, active: false };
    let mx = -9999; // сглаженная позиция курсора
    let my = -9999;
    let influence = 0; // 0..1 — плавное «присутствие» курсора

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
      cols = Math.ceil(width / GRID) + 1;
      rows = Math.ceil(height / GRID) + 1;
    };

    const cell = (x: number, y: number, size: number, fill: string) => {
      ctx.beginPath();
      if (hasRoundRect) {
        ctx.roundRect(x - size / 2, y - size / 2, size, size, Math.min(1.2, size * 0.22));
      } else {
        ctx.rect(x - size / 2, y - size / 2, size, size);
      }
      ctx.fillStyle = fill;
      ctx.fill();
    };

    // Квантование альфы: ячейки одного уровня собираются в общий Path2D,
    // чтобы вместо ~3000 заливок на кадр делать ~50 (иначе проседает FPS).
    const LEVELS = 28;
    const ALPHA_MAX = 0.8;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = now * 0.001;

      // плавно ведём «присутствие» и позицию курсора
      influence += ((mouse.active ? 1 : 0) - influence) * 0.06;
      if (mouse.active) {
        mx += (mouse.x - mx) * 0.14;
        my += (mouse.y - my) * 0.14;
      }
      const active = influence > 0.01;

      const inkBuckets: (Path2D | undefined)[] = new Array(LEVELS);
      const greenBuckets: (Path2D | undefined)[] = new Array(LEVELS);

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const cx = i * GRID + GRID / 2;
          const cy = j * GRID + GRID / 2;

          // волна яркости бежит вдоль местного направления поля
          const a = fieldAngle(cx, cy, t);
          const wave =
            0.5 +
            0.5 *
              Math.sin(
                (cx * Math.cos(a) + cy * Math.sin(a)) * WAVE_LEN - t * WAVE_SPEED
              );

          const accent = cellHash(i, j) > 0.93; // редкие изумрудные ячейки
          let alpha = accent ? 0.1 + wave * 0.4 : 0.045 + wave * 0.16;
          let size = 3.2 + wave * 2;
          let green = accent;
          let boosted = false;

          if (active) {
            const dx = cx - mx;
            const dy = cy - my;
            const dm = Math.hypot(dx, dy);
            if (dm < MOUSE_DIST) {
              const near = 1 - dm / MOUSE_DIST;
              const k = near * near * influence; // квадратичное затухание
              alpha += k * 0.5;
              size += k * 3.5;
              if (k > 0.12) green = true;
              boosted = k > 0.01;
            }
          }

          if (boosted) {
            // укрупнённые ячейки у курсора — индивидуально, со скруглением
            cell(cx, cy, size, `${green ? GREEN : INK}${Math.min(alpha, ALPHA_MAX)})`);
            continue;
          }

          const level = Math.min(
            LEVELS - 1,
            Math.round((alpha / ALPHA_MAX) * (LEVELS - 1))
          );
          const buckets = green ? greenBuckets : inkBuckets;
          let path = buckets[level];
          if (!path) {
            path = new Path2D();
            buckets[level] = path;
          }
          path.rect(cx - size / 2, cy - size / 2, size, size);
        }
      }

      for (let l = 0; l < LEVELS; l++) {
        const a = (l / (LEVELS - 1)) * ALPHA_MAX;
        const ink = inkBuckets[l];
        if (ink) {
          ctx.fillStyle = `${INK}${a})`;
          ctx.fill(ink);
        }
        const green = greenBuckets[l];
        if (green) {
          ctx.fillStyle = `${GREEN}${a})`;
          ctx.fill(green);
        }
      }

      // мягкое ядро под курсором
      if (active) {
        const coreR = 110;
        const core = ctx.createRadialGradient(mx, my, 0, mx, my, coreR);
        core.addColorStop(0, `${GREEN}${0.07 * influence})`);
        core.addColorStop(1, `${GREEN}0)`);
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(mx, my, coreR, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let rafId = 0;
    const loop = (now: number) => {
      draw(now);
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
      draw(0); // один статичный кадр
    } else {
      window.addEventListener('mousemove', onMouse);
      canvas.parentElement?.addEventListener('mouseleave', onLeave);
      rafId = requestAnimationFrame(loop);
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
