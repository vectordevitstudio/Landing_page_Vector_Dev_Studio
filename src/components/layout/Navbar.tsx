import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { NAV_LINKS } from '../../data/content';
import { ANIMATIONS } from '../../lib/animations';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // блокируем скролл body при открытом drawer
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: ANIMATIONS.easeOut }}
      className="fixed inset-x-0 top-0 z-[9999] transition-[background-color,backdrop-filter,border-color] duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(4,4,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid transparent',
      }}
    >
      <nav className="section-shell flex h-[72px] items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#cta"
          className="group hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-text-primary transition-all duration-300 hover:scale-[1.03] hover:text-white md:inline-flex"
          style={{
            background:
              'linear-gradient(var(--bg-primary),var(--bg-primary)) padding-box, linear-gradient(135deg,#6D56FA,#00D4FF) border-box',
            border: '1px solid transparent',
          }}
        >
          Обсудить проект
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-text-primary md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: ANIMATIONS.easeOut }}
            className="md:hidden"
            style={{
              background: 'rgba(8,11,20,0.96)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              className="section-shell flex flex-col gap-1 py-4"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="mt-2"
              >
                <a
                  href="#cta"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#6D56FA,#00D4FF)] px-5 py-3 text-base font-semibold text-white"
                >
                  Обсудить проект <ArrowRight className="h-4 w-4" />
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
