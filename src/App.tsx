import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Stats } from './components/sections/Stats';
import { Services } from './components/sections/Services';
import { Products } from './components/sections/Products';
import { Cases } from './components/sections/Cases';
import { Process } from './components/sections/Process';
import { TechStack } from './components/sections/TechStack';
import { Testimonials } from './components/sections/Testimonials';
import { CTA } from './components/sections/CTA';

function App() {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-bg-primary">
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-lg focus:bg-accent-violet focus:px-4 focus:py-2 focus:text-white"
      >
        Перейти к контенту
      </a>
      <Navbar />
      <main>
        <Hero />
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
