import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { PRODUCTS } from '../../data/content';
import { ANIMATIONS } from '../../lib/animations';

export const Products = () => {
  const [active, setActive] = useState(0);
  const product = PRODUCTS[active];

  return (
    <section id="products" className="relative bg-bg-secondary py-24 md:py-32">
      <div className="section-shell">
        <SectionHeader
          number="02"
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
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                active === i
                  ? 'text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="product-pill"
                  className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(109,86,250,0.25),rgba(0,212,255,0.18))] ring-1 ring-[var(--border-accent)]"
                  transition={ANIMATIONS.springFast}
                />
              )}
              <span className="relative flex items-center gap-2">
                <span aria-hidden>{p.emoji}</span>
                {p.tab}
              </span>
            </button>
          ))}
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
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl" aria-hidden>
                  {product.emoji}
                </span>
                <h3 className="text-2xl font-extrabold text-text-primary">
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
              <p className="mb-6 text-base leading-relaxed text-text-secondary">
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
              className="rounded-[20px] border border-[var(--border-subtle)] bg-bg-card p-6 md:p-8 lg:col-span-2"
            >
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {product.groups.map((group) => (
                  <div key={group.heading}>
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-secondary/80">
                      {group.heading}
                    </h4>
                    <ul className="space-y-2.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-text-primary/90"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
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
