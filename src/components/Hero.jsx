import { PROFILE } from '../data/profile';
import { Section } from './ui/Section';

function StatViz({ type, total = 0, filled = 0, ratio = 0 }) {
  if (type === "arc") {
    const r = 11, c = 2 * Math.PI * r;
    return (
      <svg className="viz viz-arc" viewBox="0 0 28 28" aria-hidden="true">
        <circle cx="14" cy="14" r={r} fill="none" strokeWidth="2.5" stroke="var(--line)" />
        <circle cx="14" cy="14" r={r} fill="none" strokeWidth="2.5" stroke="var(--accent)"
          strokeDasharray={`${c * ratio} ${c}`} strokeLinecap="round" transform="rotate(-90 14 14)" />
      </svg>
    );
  }
  if (type === "dots") {
    return (
      <span className="viz viz-dots" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={`viz-dot ${i < filled ? "is-on" : ""}`} />
        ))}
      </span>
    );
  }
  if (type === "squares") {
    return (
      <span className="viz viz-squares" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={`viz-sq ${i < filled ? "is-on" : ""}`} />
        ))}
      </span>
    );
  }
  if (type === "seal") {
    return (
      <span className="viz viz-seal" aria-hidden="true">
        <svg viewBox="0 0 28 28">
          <circle cx="14" cy="14" r="11" fill="none" strokeWidth="1" />
          <circle cx="14" cy="14" r="7" fill="none" strokeWidth="0.5" />
          <text x="14" y="17.5" textAnchor="middle" fontSize="10" fontFamily="Instrument Serif" fontStyle="italic">★</text>
        </svg>
      </span>
    );
  }
  return null;
}

function Stat({ k, v, suffix, viz, vizProps, tilt = 0 }) {
  return (
    <div className="stat" style={{ "--tilt": `${tilt}deg` }}>
      <div className="stat-row">
        <span className="mono stat-k">{k}</span>
        {viz && <StatViz type={viz} {...vizProps} />}
      </div>
      <div className="stat-v">
        <span className="serif italic stat-num">{v}</span>
        {suffix && <span className="mono stat-suffix">{suffix}</span>}
      </div>
    </div>
  );
}

export function Hero({ onJump }) {
  return (
    <Section id="intro" n="00" label="Index" divider={false}>
      <div className="hero">
        <div className="hero-meta mono">
          <span>↳ Portfolio · v2.0 · 2026</span>
          <span className="hero-loc">{PROFILE.location}</span>
        </div>

        <h1 className="display">
          <span className="display-row">
            <span className="serif italic">Hello,</span>
            <span className="hero-aside mono">
              <span className="aside-dot" /> {PROFILE.status}
            </span>
          </span>
          <span className="display-row">I'm Ansari</span>
          <span className="display-row">Usaid <span className="serif italic amp">&amp;</span></span>
          <span className="display-row">a builder of</span>
          <span className="display-row">
            <span className="serif italic">intelligent</span> things.
          </span>
        </h1>

        <div className="hero-foot">
          <p className="hero-bio">{PROFILE.bio}</p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => onJump("work")} data-cursor="hover">
              <span>Selected Work</span>
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn btn-ghost" onClick={() => onJump("contact")} data-cursor="hover">
              <span>Get in touch</span>
            </button>
          </div>
        </div>

        <div className="hero-stats">
          <Stat k="CGPA"     v="8.86" suffix="/ 10"    viz="arc"     vizProps={{ ratio: 0.886 }}        tilt={-1.2} />
          <Stat k="Year"     v="3rd"  suffix="of 4"    viz="dots"    vizProps={{ total: 4, filled: 3 }} tilt={0.8}  />
          <Stat k="Projects" v="06"   suffix="shipped" viz="squares" vizProps={{ total: 6, filled: 6 }} tilt={-0.6} />
          <Stat k="Certs"    v="02"   suffix="Oracle"  viz="seal"                                        tilt={1.4}  />
        </div>
      </div>
    </Section>
  );
}
