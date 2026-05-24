import { useState, useEffect, useRef } from 'react';
import { JOURNEY } from '../data/journey';
import { Section } from './ui/Section';

function RoadBanner({ item }) {
  return (
    <div className={`road-banner road-banner-${item.variant}`}>
      <span className="mono road-km">{item.km}</span>
      <div className="banner-plate">
        <span className="mono banner-label">{item.label}</span>
        <span className="serif italic banner-year">{item.year}</span>
      </div>
    </div>
  );
}

function RoadStop({ item }) {
  return (
    <div className={`road-stop road-stop-${item.side} ${item.featured ? "is-featured" : ""}`}>
      <div className="stop-marker">
        <span className="marker-pin" aria-hidden="true"><span className="marker-inner" /></span>
        <span className="mono stop-km">{item.km}</span>
      </div>
      <div className="stop-leader" aria-hidden="true" />
      <div className="stop-card">
        <span className="mono stop-when">{item.when}</span>
        <h4 className="stop-title">{item.title}</h4>
        <p className="stop-sub serif italic">{item.sub}</p>
        <ul className="stop-notes">
          {item.notes.map((n) => <li key={n}>{n}</li>)}
        </ul>
      </div>
    </div>
  );
}

function RoadSign({ item }) {
  return (
    <div className={`road-sign road-sign-${item.side}`}>
      <div className="stop-marker">
        <span className="marker-pin marker-pin-sm" aria-hidden="true"><span className="marker-inner" /></span>
        <span className="mono stop-km">{item.km}</span>
      </div>
      <div className="stop-leader stop-leader-sm" aria-hidden="true" />
      <div className="sign-board">
        <div className="sign-seal" aria-hidden="true">
          <svg viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="21" fill="none" strokeWidth="1.2" />
            <circle cx="24" cy="24" r="14" fill="none" strokeWidth="0.6" />
            <text x="24" y="22" textAnchor="middle" fontSize="5" fontFamily="JetBrains Mono">CERTIFIED</text>
            <text x="24" y="33" textAnchor="middle" fontSize="11" fontFamily="Instrument Serif" fontStyle="italic">★</text>
          </svg>
        </div>
        <div className="sign-text">
          <span className="mono">{item.year}</span>
          <h5 className="sign-title">{item.title}</h5>
          <p className="sign-sub mono">{item.sub}</p>
        </div>
      </div>
    </div>
  );
}

export function Education() {
  const roadRef = useRef(null);
  const [trip, setTrip] = useState(0);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    let current = 0, target = 0, raf = null;
    let lastT = performance.now(), lastP = 0;

    const calc = () => {
      if (!roadRef.current) return;
      const r = roadRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      target = Math.max(0, Math.min(1, (vh - r.top) / (r.height + vh)));
    };

    const frame = (now) => {
      const dt = Math.max(now - lastT, 8);
      const diff = target - current;
      if (Math.abs(diff) > 0.0003) {
        current += diff * 0.12;
        roadRef.current?.style.setProperty("--p", current);
        const dp = Math.abs(current - lastP);
        setSpeed((v) => Math.round(v * 0.7 + Math.min(140, (dp / dt) * 120000) * 0.3));
        setTrip(Math.round(current * 94));
        lastP = current;
        lastT = now;
        raf = requestAnimationFrame(frame);
      } else {
        current = target;
        roadRef.current?.style.setProperty("--p", current);
        setSpeed(0);
        setTrip(Math.round(current * 94));
        raf = null;
      }
    };

    const onScroll = () => {
      calc();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    calc();
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Section id="education" n="04" label="Education">
      <div className="edu-head">
        <div>
          <h2 className="h2">
            School, papers, and{" "}
            <span className="serif italic">the certificates that paid for themselves.</span>
          </h2>
          <p className="edu-tag mono">
            Route 23 · A six-year drive from higher secondary to <span className="serif italic">graduation</span>.
          </p>
        </div>
        <div className="dash mono">
          <div className="dash-cell">
            <span className="dash-k">Trip</span>
            <span className="dash-v">{trip} <small>/ 94 KM</small></span>
          </div>
          <div className="dash-cell">
            <span className="dash-k">Speed</span>
            <span className="dash-v">{speed} <small>KM/H</small></span>
          </div>
          <div className="dash-cell">
            <span className="dash-k">Heading</span>
            <span className="dash-v">N · 2027</span>
          </div>
        </div>
      </div>

      <div ref={roadRef} className="road">
        <div className="road-asphalt" aria-hidden="true">
          <span className="road-edge road-edge-l" />
          <span className="road-edge road-edge-r" />
          <span className="road-dashes" />
          <span className="road-trail" />
        </div>

        <div className="road-vehicle" aria-hidden="true">
          <svg viewBox="0 0 60 90">
            <rect x="14" y="10" width="32" height="70" rx="8" fill="currentColor" />
            <rect x="18" y="18" width="24" height="22" rx="3" fill="rgba(255,255,255,0.85)" />
            <rect x="18" y="50" width="24" height="22" rx="3" fill="rgba(255,255,255,0.7)" />
            <circle cx="18" cy="14" r="2" fill="#fff" />
            <circle cx="42" cy="14" r="2" fill="#fff" />
            <rect x="10" y="20" width="4" height="14" rx="1" fill="currentColor" />
            <rect x="46" y="20" width="4" height="14" rx="1" fill="currentColor" />
            <rect x="10" y="56" width="4" height="14" rx="1" fill="currentColor" />
            <rect x="46" y="56" width="4" height="14" rx="1" fill="currentColor" />
          </svg>
        </div>

        <ol className="road-stops">
          {JOURNEY.map((item, i) => (
            <li key={i} className="road-row">
              {item.kind === "banner" && <RoadBanner item={item} />}
              {item.kind === "stop"   && <RoadStop   item={item} />}
              {item.kind === "sign"   && <RoadSign   item={item} />}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
