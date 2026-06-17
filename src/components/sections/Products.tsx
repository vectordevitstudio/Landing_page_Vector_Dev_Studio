import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { PRODUCTS } from '../../data/content';
import { ANIMATIONS } from '../../lib/animations';

const TILE: Record<string, string> = {
  violet: 'border-[rgba(74,64,201,0.3)] bg-[rgba(74,64,201,0.07)] text-accent-violet',
  cyan: 'border-[rgba(28,126,146,0.3)] bg-[rgba(28,126,146,0.07)] text-accent-cyan',
  green: 'border-[rgba(15,165,108,0.32)] bg-[rgba(15,165,108,0.08)] text-accent-green',
  amber: 'border-[rgba(178,107,42,0.3)] bg-[rgba(178,107,42,0.07)] text-accent-amber',
};

export const Products = () => {
  const [active, setActive] = useState(0);
  const product = PRODUCTS[active];
  const Icon = product.icon;

  return (
    <section id="products" className="relative bg-bg-secondary py-24 md:py-32">
      <div className="section-shell">
        <SectionHeader
          number="02 — Продукты"
          ghost="02"
          title="Наши собственные продукты"
          subtitle="Готовые AI-решения, которые можно внедрить уже сейчас"
        />

        {/* Табы */}
        <div
          role="tablist"
          aria-label="Продукты"
          className="no-scrollbar -mx-6 mb-10 flex gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0"
        >
          {PRODUCTS.map((p, i) => {
            const TabIcon = p.icon;
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`relative shrink-0 rounded-[6px] border px-5 py-2.5 text-sm font-medium transition-colors ${
                  active === i
                    ? 'border-ink text-[#F5F3EC]'
                    : 'border-[var(--border-medium)] text-text-secondary hover:border-ink hover:text-ink'
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="product-pill"
                    className="absolute inset-0 rounded-[6px] bg-ink"
                    transition={ANIMATIONS.springFast}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <TabIcon className="h-4 w-4" strokeWidth={1.6} />
                  {p.tab}
                </span>
              </button>
            );
          })}
        </div>

        {/* Контент продукта */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Левая панель */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.35, ease: ANIMATIONS.easeOut }}
              className="lg:col-span-1"
            >
              <div className="mb-5 flex items-center gap-3">
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-[6px] border ${TILE[product.accent]}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <h3 className="font-display text-[22px] font-medium leading-tight text-ink md:text-[26px]">
                  {product.name}
                </h3>
              </div>
              <div className="mb-5 flex flex-wrap gap-2">
                {product.badges.map((b) => (
                  <Badge key={b} color={b === 'NEW' ? 'green' : product.accent}>
                    {b}
                  </Badge>
                ))}
              </div>
              <p className="mb-7 text-base leading-relaxed text-text-secondary">
                {product.pitch}
              </p>
              <Button href="#cta">
                {product.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {/* Правая панель — возможности */}
            <motion.div
              key={`${product.id}-detail`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: ANIMATIONS.easeOut }}
              className="relative rounded-[8px] border border-[var(--border-medium)] bg-bg-card p-6 md:p-8 lg:col-span-2"
            >
              <span className="plus-mark absolute right-4 top-4" aria-hidden />
              <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
                {product.groups.map((group) => (
                  <div key={group.heading}>
                    <h4 className="eyebrow mb-4 text-ink-muted">{group.heading}</h4>
                    <ul className="space-y-3">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-text-primary"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-accent-green"
                            strokeWidth={2.4}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
