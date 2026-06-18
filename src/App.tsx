import { useEffect, useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { Preloader } from './components/ui/Preloader';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Hero } from './components/sections/Hero';
import { Stats } from './components/sections/Stats';
import { Services } from './components/sections/Services';
import { Products } from './components/sections/Products';
import { Cases } from './components/sections/Cases';
import { Process } from './components/sections/Process';
import { TechStack } from './components/sections/TechStack';
import { Testimonials } from './components/sections/Testimonials';
import { CTA } from './components/sections/CTA';

// Прелоадер показываем один раз за сессию и пропускаем при reduced-motion
const shouldSkipIntro = () => {
  if (typeof window === 'undefined') return true;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const played = window.sessionStorage.getItem('vds-intro') === '1';
  return reduced || played;
};

function App() {
  useSmoothScroll();

  const [showPreloader, setShowPreloader] = useState(() => !shouldSkipIntro());
  const [ready, setReady] = useState(() => shouldSkipIntro());

  // блокируем скролл, пока идёт интро
  useEffect(() => {
    document.body.style.overflow = showPreloader ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreloader]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <CustomCursor />

      {showPreloader && (
        <Preloader
          onReveal={() => setReady(true)}
          onComplete={() => {
            window.sessionStorage.setItem('vds-intro', '1');
            setShowPreloader(false);
          }}
        />
      )}

      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-lg focus:bg-accent-violet focus:px-4 focus:py-2 focus:text-white"
      >
        Перейти к контенту
      </a>
      <Navbar />
      <ScrollProgress />
      <main>
        <Hero ready={ready} />
        <Stats />
        <Services />
        <Products />
        <Cases />
        <Process />
        <TechStack />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
