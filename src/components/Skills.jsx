import { useState, useMemo } from 'react';
import { SKILLS } from '../data/skills';
import { PROJECTS } from '../data/projects';
import { Section } from './ui/Section';

function LevelMeter({ level }) {
  return (
    <span className="meter" aria-label={`${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`meter-dot ${i <= level ? "is-on" : ""}`} />
      ))}
    </span>
  );
}

function ProjectChip({ id }) {
  const p = PROJECTS.find((pp) => pp.n === id);
  if (!p) return null;
  return (
    <a className="usedin-chip" href={p.link} target="_blank" rel="noreferrer" data-cursor="hover">
      <span className="usedin-n mono">{p.n}</span>
      <span className="usedin-title">{p.title}</span>
      <span className="usedin-arrow">↗</span>
    </a>
  );
}

export function Skills() {
  const [cat, setCat] = useState(0);
  const [pick, setPick] = useState(0);
  const group = SKILLS[cat];

  // Reset pick when category changes
  const handleCat = (i) => { setCat(i); setPick(0); };

  const featured = group.items[pick];

  const totals = useMemo(() => {
    const all = SKILLS.flatMap((g) => g.items);
    const avg = all.reduce((a, b) => a + b.level, 0) / all.length;
    const since = Math.min(...all.map((s) => s.since));
    return { count: all.length, avg, since };
  }, []);

  const yrs = new Date().getFullYear() - featured.since;

  return (
    <Section id="skills" n="03" label="Toolbelt">
      <div className="skills">
        <div className="skills-head">
          <h2 className="h2">
            A pragmatic stack, sharpened on{" "}
            <span className="serif italic">real projects.</span>
          </h2>
          <div className="skills-totals mono">
            <span><b>{totals.count}</b> tools</span>
            <span className="sep">·</span>
            <span>since <b>{totals.since}</b></span>
            <span className="sep">·</span>
            <span>avg <b>{totals.avg.toFixed(1)}</b>/5</span>
          </div>
        </div>

        <div className="cat-tabs" role="tablist">
          {SKILLS.map((g, i) => (
            <button
              key={g.group}
              role="tab"
              aria-selected={cat === i}
              className={`cat-tab ${cat === i ? "is-active" : ""}`}
              onClick={() => handleCat(i)}
              data-cursor="hover"
            >
              <span className="mono cat-n">{g.n}</span>
              <span className="cat-name">{g.group}</span>
              <span className="mono cat-count">{String(g.items.length).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <div className="stack">
          <div className="stack-feature" key={`${cat}-${pick}`}>
            <div className="feature-head mono">
              <span>{group.n} · {group.group}</span>
              <span className="rule" />
              <span>{String(pick + 1).padStart(2, "0")} / {String(group.items.length).padStart(2, "0")}</span>
            </div>
            <h3 className="feature-name">{featured.name}</h3>
            <p className="feature-note">{featured.note}</p>
            <div className="feature-meta">
              <div className="meta-cell">
                <span className="mono meta-k">Proficiency</span>
                <div className="meta-v meta-prof">
                  <LevelMeter level={featured.level} />
                  <span className="mono">{featured.level}/5</span>
                </div>
              </div>
              <div className="meta-cell">
                <span className="mono meta-k">Experience</span>
                <span className="meta-v serif">{yrs ? `${yrs} yr${yrs > 1 ? "s" : ""}` : "< 1 yr"}</span>
              </div>
              <div className="meta-cell">
                <span className="mono meta-k">Since</span>
                <span className="meta-v serif">{featured.since}</span>
              </div>
            </div>
            {featured.usedIn.length > 0 ? (
              <div className="usedin">
                <span className="mono usedin-k">Used in</span>
                <div className="usedin-list">
                  {featured.usedIn.map((id) => <ProjectChip key={id} id={id} />)}
                </div>
              </div>
            ) : (
              <div className="usedin">
                <span className="mono usedin-k">Coursework / personal study</span>
              </div>
            )}
          </div>

          <ol className="stack-rail">
            {group.items.map((it, i) => (
              <li key={it.name}>
                <button
                  className={`rail-row ${pick === i ? "is-active" : ""}`}
                  onMouseEnter={() => setPick(i)}
                  onClick={() => setPick(i)}
                  data-cursor="hover"
                >
                  <span className="mono rail-i">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rail-name">{it.name}</span>
                  <LevelMeter level={it.level} />
                  <span className="rail-arrow">→</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
