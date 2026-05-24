import { useState, useEffect } from 'react';

import { NAV } from './data/profile';
import { useCursor } from './hooks/useCursor';
import { useScrollProgress } from './hooks/useScrollProgress';

import { TopNav } from './components/TopNav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Work } from './components/Work';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Marquee } from './components/ui/Marquee';

export default function App() {
  const [active, setActive] = useState("intro");
  const cursor = useCursor();
  const progress = useScrollProgress();

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const onJump = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
  };

  return (
    <>
      <div ref={cursor.ref} className={`cursor ${cursor.hover ? "is-hover" : ""}`} aria-hidden="true" />
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <TopNav active={active} onJump={onJump} />

      <main className="main">
        <Hero onJump={onJump} />
        <Marquee items={[
          "Artificial Intelligence",
          "Full-stack Engineering",
          "Cloud Infrastructure",
          "Deep Learning",
          "Product Thinking",
          "Open Source",
        ]} />
        <About />
        <Work />
        <Skills />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
