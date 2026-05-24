import { PROFILE, LANG_DETAIL, NOW_PLAYING } from '../data/profile';
import { useTick } from '../hooks/useTick';
import { Section } from './ui/Section';
import { Placeholder } from './ui/Placeholder';

/* ---- NOW PLAYING visualisations ---- */
function NowViz({ type, data }) {
  if (type === "progress") {
    return (
      <div className="now-viz now-viz-progress">
        <div className="np-bar">
          <span className="np-bar-fill" style={{ width: `${data.value}%` }} />
          <span className="np-bar-ticks" aria-hidden="true">
            {Array.from({ length: 20 }).map((_, i) => <span key={i} />)}
          </span>
        </div>
        <div className="np-bar-row">
          <span>{data.value}% {data.label}</span>
          <span>ETA · Q3'26</span>
        </div>
      </div>
    );
  }
  if (type === "pages") {
    return (
      <div className="now-viz now-viz-pages">
        {Array.from({ length: data.total }).map((_, i) => (
          <span key={i} className={`np-page ${i < data.current ? "is-read" : ""} ${i === data.current ? "is-current" : ""}`} />
        ))}
        <span className="np-pages-label">
          CH. {String(data.current).padStart(2, "0")} / {String(data.total).padStart(2, "0")}
        </span>
      </div>
    );
  }
  if (type === "streak") {
    const labels = ["M","T","W","T","F","S","S"];
    return (
      <div className="now-viz now-viz-streak">
        <div className="np-streak-row">
          {data.week.map((on, i) => (
            <span key={i} className={`np-cell ${on ? "is-on" : ""}`}>
              <span className="np-cell-l">{labels[i]}</span>
            </span>
          ))}
        </div>
        <div className="np-streak-num">
          <span className="np-streak-big">{data.days}</span>
          <span className="np-streak-cap">day streak</span>
        </div>
      </div>
    );
  }
  if (type === "spark") {
    const pts = data.points;
    const max = Math.max(...pts);
    const w = 180, h = 44, step = w / (pts.length - 1);
    const path = pts
      .map((v, i) => `${i ? "L" : "M"} ${(i * step).toFixed(1)} ${(h - (v / max) * (h - 4) - 2).toFixed(1)}`)
      .join(" ");
    const area = `${path} L ${w} ${h} L 0 ${h} Z`;
    return (
      <div className="now-viz now-viz-spark">
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
          <path d={area} className="np-spark-area" />
          <path d={path} className="np-spark-line" />
          {pts.map((v, i) => (
            <circle
              key={i}
              cx={i * step}
              cy={h - (v / max) * (h - 4) - 2}
              r="1.5"
              className={i === pts.length - 1 ? "np-spark-dot is-tip" : "np-spark-dot"}
            />
          ))}
        </svg>
        <div className="np-spark-label">
          <span>↑ {pts[pts.length - 1]}</span>
          <span>last 14d</span>
        </div>
      </div>
    );
  }
  return null;
}

function NowPlayingPanel() {
  useTick(1000);
  const t = new Date();
  const stamp = t.toLocaleTimeString("en-IN", { hour12: false, timeZone: "Asia/Kolkata" });
  return (
    <section className="now-panel" aria-label="Currently">
      <header className="now-head">
        <span className="mono now-head-k"><span className="now-dot" />NOW · LIVE</span>
        <span className="rule" />
        <span className="mono now-head-meta">
          <span>{stamp} IST</span>
          <span className="now-sep">·</span>
          <span>4 / 4 active</span>
        </span>
      </header>

      <ol className="now-rows">
        {NOW_PLAYING.map((row, i) => (
          <li key={row.k} className="now-row">
            <div className="now-row-l">
              <span className={`now-status now-status-${row.status}`} aria-hidden="true">
                <span className="now-status-led" />
                <span className="now-status-led" />
                <span className="now-status-led" />
              </span>
              <span className="mono now-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="mono now-k">{row.k}</span>
            </div>
            <div className="now-row-m">
              <h4 className="now-title">{row.title}</h4>
              <p className="mono now-meta">{row.meta}</p>
            </div>
            <div className="now-row-r">
              <NowViz type={row.viz} data={row.vizData} />
            </div>
          </li>
        ))}
      </ol>

      <footer className="now-foot mono">
        <span><span className="now-dot" />tail -f /life/now.log</span>
        <span className="rule" />
        <span>auto-refresh · 1Hz</span>
      </footer>
    </section>
  );
}

/* ---- About section ---- */
export function About() {
  return (
    <Section id="about" n="01" label="About">
      <div className="about-spread">
        <aside className="about-left">
          <div className="portrait">
            <Placeholder label="portrait · self" accent="warm" ratio="4 / 5" />
            <div className="portrait-tag mono">
              <span className="aside-dot" />
              <span>VELLORE · 2026</span>
            </div>
            <div className="portrait-corner mono">No. 01 / 01</div>
          </div>

          <div className="vcard">
            <div className="vcard-head mono">
              <span>Personnel file</span>
              <span className="rule" />
              <span>v2.6</span>
            </div>
            <div className="vcard-name">
              <span className="vc-first serif italic">Ansari</span>
              <span className="vc-last">Usaid Anzer</span>
            </div>
            <ul className="vcard-meta">
              <li><span className="mono vc-k">Role</span><span className="vc-v">3rd-yr B.Tech, CSE</span></li>
              <li><span className="mono vc-k">School</span><span className="vc-v">VIT Vellore · <i className="serif">CGPA 8.72</i></span></li>
              <li><span className="mono vc-k">Based</span><span className="vc-v">Tamil Nadu, India</span></li>
              <li><span className="mono vc-k">Born</span><span className="vc-v">2005</span></li>
              <li>
                <span className="mono vc-k">Status</span>
                <span className="vc-v vc-status"><span className="aside-dot" />Available · Summer '26</span>
              </li>
            </ul>
          </div>
        </aside>

        <div className="about-right">
          <blockquote className="pullquote">
            <span className="pq-mark" aria-hidden="true">"</span>
            I like problems that need <span className="serif italic">both a model and a UI</span>.
            <footer className="pq-cite mono">— philosophy, in nine words</footer>
          </blockquote>

          <div className="about-bio">
            {PROFILE.longBio.map((p, i) => (
              <p key={i} className={i === 0 ? "lede" : ""}>
                {i === 0 ? <span className="dropcap serif italic">{p[0]}</span> : null}
                {i === 0 ? p.slice(1) : p}
              </p>
            ))}
          </div>

          <NowPlayingPanel />

          <div className="langs">
            <div className="langs-head mono">
              <span>Spoken languages</span>
              <span className="rule" />
              <span>{LANG_DETAIL.length} on the tongue</span>
            </div>
            <ul className="langs-list">
              {LANG_DETAIL.map((l) => (
                <li key={l.code} className={`lang-pill is-${l.level}`} data-cursor="hover">
                  <span className="mono lang-code">{l.code}</span>
                  <span className="lang-name serif italic">{l.name}</span>
                  <span className="mono lang-level">{l.display || l.level}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-sign">
            <span className="serif italic">— Ansari,</span>
            <span className="mono">Vellore · {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
