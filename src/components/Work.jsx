import { useState, useEffect, useRef } from 'react';
import { PROJECTS, OTHER_PROJECTS } from '../data/projects';
import { Section } from './ui/Section';
import { Placeholder } from './ui/Placeholder';

function ProjectCard({ p, i, total }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const visual = el.querySelector(".pcard-visual");
    const onScroll = () => {
      if (!visual) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = (r.top + r.height / 2 - vh / 2) / (vh / 2);
      visual.style.setProperty("--py", `${Math.max(-1, Math.min(1, center)) * -28}px`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const side = i % 2 === 0 ? "left" : "right";

  return (
    <article
      ref={ref}
      className={`pcard pcard-${side}`}
      style={{ "--i": i, "--top-offset": `${90 + i * 14}px`, "--scale": 1 - (total - 1 - i) * 0.012 }}
    >
      <div className="pcard-frame">
        <span className="pcard-bignum" aria-hidden="true">{p.n}</span>

        <div className="pcard-grid">
          <div className="pcard-visual">
            <Placeholder label={p.placeholder} accent={p.accent} ratio="4 / 3" />
            <div className="pcard-tag">
              <span className="mono">{p.year}</span>
              <span className="pcard-tag-sep">/</span>
              <span className="mono">{p.role}</span>
            </div>
          </div>

          <div className="pcard-body">
            <div className="pcard-meta-top">
              <span className="mono pcard-n">PROJECT · {p.n}</span>
              <span className="mono pcard-of">{p.n} / {String(total).padStart(2, "0")}</span>
            </div>
            <h3 className="pcard-title">{p.title}</h3>
            <p className="pcard-blurb">{p.blurb}</p>
            <p className="pcard-detail">{p.detail}</p>
            <ul className="pcard-stack">
              {p.stack.map((s) => <li key={s} className="mono">{s}</li>)}
            </ul>
            <a className="pcard-cta" href={p.link} target="_blank" rel="noreferrer" data-cursor="hover">
              <span>Open repo on GitHub</span>
              <span className="pcard-cta-arrow">↗</span>
            </a>
          </div>
        </div>

        <span className="pcard-corner pcard-corner-tl" aria-hidden="true" />
        <span className="pcard-corner pcard-corner-tr" aria-hidden="true" />
        <span className="pcard-corner pcard-corner-bl" aria-hidden="true" />
        <span className="pcard-corner pcard-corner-br" aria-hidden="true" />
      </div>
    </article>
  );
}

function OtherProjects() {
  const [open, setOpen] = useState(false);
  return (
    <div className="others-wrap">
      <button
        className={`others-toggle mono ${open ? "is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        data-cursor="hover"
      >
        <span className="others-toggle-rule" />
        <span className="others-toggle-label">
          {open ? "− hide other projects" : `+ ${OTHER_PROJECTS.length} more projects`}
        </span>
        <span className="others-toggle-rule" />
      </button>

      {open && (
        <div className="others-grid">
          {OTHER_PROJECTS.map((p, i) => (
            <div key={i} className="ocard">
              <div className="ocard-head">
                <span className="mono ocard-role">{p.role} · {p.year}</span>
                {p.link
                  ? <a href={p.link} target="_blank" rel="noreferrer" className="ocard-link mono" data-cursor="hover">↗</a>
                  : <span className="mono ocard-link ocard-local">local</span>
                }
              </div>
              <h4 className="ocard-title">{p.title}</h4>
              <p className="ocard-blurb">{p.blurb}</p>
              <ul className="ocard-stack">
                {p.stack.map((s) => <li key={s} className="mono">{s}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Work() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sect = document.getElementById("work");
    if (!sect) return;

    // Cards are position:sticky — once stacked they all remain in the viewport
    // simultaneously, making IntersectionObserver unreliable.
    // Instead: the card "on top" is the highest-indexed one whose rect.top has
    // reached (or passed) its own sticky threshold.
    const cards = [...sect.querySelectorAll(".pcard")];

    const onScroll = () => {
      let newActive = 0;
      cards.forEach((card, i) => {
        const threshold = parseFloat(card.style.getPropertyValue("--top-offset")) || 90 + i * 14;
        if (card.getBoundingClientRect().top <= threshold + 1) newActive = i;
      });
      setActive(newActive);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Section id="work" n="02" label="Selected Work">
      <div className="work-head">
        <h2 className="h2">
          Six projects, one through-line:{" "}
          <span className="serif italic">ship the thing.</span>
        </h2>
        <span className="mono work-count">
          <span className="wc-now">{String(active + 1).padStart(2, "0")}</span>
          <span className="wc-sep">/</span>
          <span>{String(PROJECTS.length).padStart(2, "0")} · scroll to deal</span>
        </span>
      </div>

      <div className="pstack">
        <aside className="prail">
          <div className="prail-track">
            {PROJECTS.map((p, i) => (
              <a
                key={p.n}
                href={`#proj-${p.n}`}
                className={`prail-pip ${active === i ? "is-active" : ""}`}
                data-cursor="hover"
                onClick={(e) => {
                  e.preventDefault();
                  const card = document.querySelectorAll(".pcard")[i];
                  if (card) window.scrollTo({
                    top: card.getBoundingClientRect().top + window.pageYOffset - 80,
                    behavior: "smooth",
                  });
                }}
              >
                <span className="mono prail-n">{p.n}</span>
                <span className="prail-bar" />
                <span className="prail-title">{p.title}</span>
              </a>
            ))}
          </div>
        </aside>

        <div className="pdeck">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.n} p={p} i={i} total={PROJECTS.length} />
          ))}
        </div>
      </div>

      <OtherProjects />
    </Section>
  );
}
