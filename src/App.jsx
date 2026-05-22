import { useState, useEffect, useRef, useMemo } from 'react';

/* ---------- DATA ---------- */
const PROFILE = {
  name: "Ansari Usaid Anzer",
  shortName: "Ansari U. Anzer",
  role: "Computer Science Engineer",
  bio: "3rd-year B.Tech CSE at VIT Vellore. I build at the intersection of artificial intelligence, full-stack systems, and cloud infrastructure — turning research-grade ideas into things people actually use.",
  longBio: [
    "I'm an aspiring IT professional and 3rd-year B.Tech Computer Science student at VIT Vellore (CGPA 8.72), drawn to the messy intersection where machine learning meets product. I like problems that need both a model and a UI.",
    "My toolbelt spans deep learning with TensorFlow & PyTorch, full-stack work with React and FastAPI, and cloud deployments on AWS. I'm Oracle-certified in Generative AI and AI Foundations, and I read papers the way other people read novels.",
    "Currently looking for internships and collaborations in AI/ML, full-stack engineering, and cloud — particularly anything that has to ship to real users."
  ],
  location: "Vellore, Tamil Nadu — IN",
  email: "ansariusaid2005@gmail.com",
  phone: "+91 90225 43814",
  cgpa: "8.72 / 10",
  status: "Available for Summer '26",
  socials: [
    { label: "GitHub",    handle: "AnsariUsaid",    href: "https://github.com/AnsariUsaid" },
    { label: "LinkedIn",  handle: "in/ansariusaid", href: "https://www.linkedin.com/in/ansariusaid/" },
    { label: "Instagram", handle: "ansari_usaid_",  href: "https://www.instagram.com/ansari_usaid_/" },
  ],
};

const SKILLS = [
  {
    group: "Languages", n: "01",
    items: [
      { name: "Python",     level: 5, since: 2021, note: "Daily driver — ML, scripts, FastAPI.", usedIn: ["01","02","03","04","05"] },
      { name: "C++",        level: 4, since: 2020, note: "Comfort zone for systems & DSA.",       usedIn: ["06"] },
      { name: "TypeScript", level: 4, since: 2023, note: "Strict mode or it didn't happen.",      usedIn: ["02","03"] },
      { name: "JavaScript", level: 4, since: 2022, note: "Glue, prototypes, browser everything.",  usedIn: ["02","03","05"] },
      { name: "C",          level: 4, since: 2020, note: "Where the abstractions stop lying.",    usedIn: [] },
      { name: "Java",       level: 3, since: 2022, note: "OOP coursework + Android dabbling.",    usedIn: [] },
    ],
  },
  {
    group: "Frontend", n: "02",
    items: [
      { name: "React",         level: 5, since: 2023, note: "Hooks-first, component-thinking.",     usedIn: ["02","03"] },
      { name: "Tailwind",      level: 5, since: 2024, note: "Utility-first, with restraint.",       usedIn: ["02","03"] },
      { name: "Redux Toolkit", level: 4, since: 2024, note: "Slices, RTK Query, no boilerplate.",   usedIn: ["02"] },
      { name: "shadcn/ui",     level: 4, since: 2024, note: "Composable primitives done right.",    usedIn: ["02"] },
      { name: "Next.js",       level: 3, since: 2024, note: "App router, RSCs, server actions.",    usedIn: [] },
      { name: "Figma",         level: 3, since: 2023, note: "Wireframe → high-fidelity flow.",      usedIn: ["05"] },
    ],
  },
  {
    group: "Backend & Data", n: "03",
    items: [
      { name: "FastAPI",  level: 5, since: 2023, note: "Async, typed, ships in a weekend.",          usedIn: ["02","03","05"] },
      { name: "REST",     level: 5, since: 2022, note: "Versioned routes, sensible status codes.",   usedIn: ["02","03","05"] },
      { name: "JWT Auth", level: 4, since: 2023, note: "Refresh tokens, role-based access.",         usedIn: ["03","05"] },
      { name: "MySQL",    level: 4, since: 2022, note: "Schemas, joins, indexes that matter.",       usedIn: ["04"] },
      { name: "PL/SQL",   level: 3, since: 2024, note: "Stored procedures for healthcare data.",     usedIn: ["04"] },
      { name: "Node.js",  level: 3, since: 2023, note: "Express + tooling scripts.",                 usedIn: [] },
    ],
  },
  {
    group: "AI / ML", n: "04",
    items: [
      { name: "PyTorch",       level: 5, since: 2024, note: "Trained the Chess CNN end-to-end.",         usedIn: ["01"] },
      { name: "LLM APIs",      level: 5, since: 2024, note: "OpenAI / Anthropic — prompting, eval.",     usedIn: ["02"] },
      { name: "Deep Learning", level: 4, since: 2024, note: "CNNs, transformers, training loops.",       usedIn: ["01","02"] },
      { name: "TensorFlow",    level: 3, since: 2024, note: "Keras for quick model iteration.",          usedIn: [] },
      { name: "CNNs",          level: 4, since: 2024, note: "Board encoding → move probabilities.",      usedIn: ["01"] },
      { name: "RAG",           level: 3, since: 2025, note: "Embedding pipelines + vector retrieval.",   usedIn: ["02"] },
    ],
  },
  {
    group: "Cloud & Infra", n: "05",
    items: [
      { name: "AWS S3",     level: 4, since: 2024, note: "Pre-signed URLs, lifecycle rules.",  usedIn: ["03"] },
      { name: "OCI",        level: 4, since: 2025, note: "Oracle-certified, Gen-AI services.", usedIn: [] },
      { name: "Git/GitHub", level: 5, since: 2021, note: "Rebase, squash, no broken main.",    usedIn: ["01","02","03","04","05"] },
      { name: "Linux",      level: 4, since: 2021, note: "tmux, vim, the usual suspects.",     usedIn: [] },
    ],
  },
  {
    group: "Embedded", n: "06",
    items: [
      { name: "Verilog",   level: 3, since: 2024, note: "ALU + sequential circuit design.",   usedIn: [] },
      { name: "Arduino",   level: 4, since: 2022, note: "Sensor fusion for the maze bot.",     usedIn: ["06"] },
      { name: "Assembly",  level: 3, since: 2024, note: "MIPS coursework — reg by reg.",       usedIn: [] },
      { name: "Sensors",   level: 4, since: 2022, note: "IR + ultrasonic, filtered noise.",    usedIn: ["06"] },
    ],
  },
];

const PROJECTS = [
  {
    n: "01",
    title: "AI Chess Bot with Human-like Play",
    blurb: "Deep-learning engine that plays chess like a human — not an engine.",
    detail: "Trained a CNN on thousands of human PGN games to predict natural, imperfect moves. Built the encoding pipeline, the position-to-label mapping, and an interactive board so you can play against the model. Tuned to feel like a mid-level human, not Stockfish.",
    stack: ["Python", "PyTorch", "CNNs", "NumPy"],
    role: "Solo", year: "2025",
    link: "https://github.com/AnsariUsaid/ML_Chess_project",
    accent: "warm", placeholder: "AI · Board states → move probabilities",
  },
  {
    n: "02",
    title: "AI Interview Application",
    blurb: "Full-stack platform that parses resumes, runs LLM interviews, and scores you.",
    detail: "End-to-end AI interview platform: resume parsing, dynamic question generation, response evaluation, and automated feedback. Redux Toolkit for state, FastAPI for the backend, shadcn + Tailwind for the UI. Persistent sessions, modular scoring, LLM-powered everything.",
    stack: ["React", "TypeScript", "FastAPI", "Redux", "Tailwind"],
    role: "Full-stack", year: "2025",
    link: "https://github.com/AnsariUsaid/ai-interview-application",
    accent: "neutral", placeholder: "Product · Live interview UI",
  },
  {
    n: "03",
    title: "Educational Assignment Portal",
    blurb: "Multi-role academic platform with cloud-backed file storage.",
    detail: "Students upload assignments, teachers organise and download. AWS S3 for scalable file storage, FastAPI for auth/JWT, React + TypeScript dashboards. Designed around real academic workflows — bulk download, deadline tracking, role-based permissions.",
    stack: ["FastAPI", "React", "TypeScript", "AWS S3"],
    role: "Full-stack", year: "2025",
    link: "https://github.com/AnsariUsaid/Education_portal_using-s3",
    accent: "warm", placeholder: "Dashboard · Submissions table",
  },
  {
    n: "04",
    title: "Healthcare Interoperability System",
    blurb: "FHIR-based data exchange between hospitals and emergency units.",
    detail: "Built on FHIR standards for structured, secure cross-institution data flow. Wrote the patient-matching logic that identifies the same person across mismatched databases, plus the SQL/PLSQL plumbing for emergency data access.",
    stack: ["Python", "JavaScript", "SQL", "PL/SQL"],
    role: "Backend", year: "2024",
    link: "https://github.com/Ibrubicks/healthcare-interoperability-system",
    accent: "neutral", placeholder: "Systems · Patient-record graph",
  },
  {
    n: "05",
    title: "Secure To-Do API",
    blurb: "JWT-auth task manager with server-rendered Jinja pages.",
    detail: "Full CRUD with protected endpoints, session logic, and validation. Jinja templates for clean SSR, vanilla JS for interactivity. Small, but every layer is wired by hand — exactly what you want from a learning project.",
    stack: ["FastAPI", "Jinja", "JWT", "JS"],
    role: "Solo", year: "2024",
    link: "https://github.com/AnsariUsaid",
    accent: "neutral", placeholder: "API · Task list view",
  },
  {
    n: "06",
    title: "Maze Solver Bot",
    blurb: "Autonomous bot that maps and solves a maze using IR + ultrasonic.",
    detail: "Academic robotics project — Arduino-controlled bot with IR and ultrasonic sensors. Implemented wall-following and a flood-fill solver. The kind of project that teaches you what 'noise' actually means.",
    stack: ["Arduino", "C++", "Sensors"],
    role: "Hardware", year: "2024",
    link: "#",
    accent: "warm", placeholder: "Hardware · Bot top-down",
  },
];

const JOURNEY = [
  { kind: "banner", variant: "depart", km: "KM 000", year: "2021", label: "Departed" },
  {
    kind: "stop", side: "left", km: "KM 014",
    when: "2021 — 2023", title: "GMVV School",
    sub: "Higher Secondary · PCM + CS",
    notes: ["75% aggregate", "Math · Physics · Computer Science"],
  },
  {
    kind: "stop", side: "right", km: "KM 042", featured: true,
    when: "2023 — 2027", title: "Vellore Institute of Technology",
    sub: "B.Tech · Computer Science & Engineering",
    notes: ["CGPA 8.72 / 10", "DSA · OOP · System Design · Computer Architecture", "Projects: ALU Design, Maze Solver Bot, this portfolio"],
  },
  { kind: "sign", side: "left",  km: "KM 058", year: "2025", title: "OCI · Generative AI Professional", sub: "Oracle — Certification" },
  { kind: "sign", side: "right", km: "KM 061", year: "2025", title: "OCI · AI Foundations Associate",   sub: "Oracle — Certification" },
  { kind: "banner", variant: "here",    km: "KM 076", year: "2026", label: "You are here" },
  { kind: "banner", variant: "arrival", km: "KM 094", year: "2027", label: "Graduation · expected" },
];

const LANG_DETAIL = [
  { code: "EN", name: "English",  level: "fluent"   },
  { code: "HI", name: "Hindi",    level: "native"   },
  { code: "MR", name: "Marathi",  level: "native"   },
  { code: "UR", name: "Urdu",     level: "fluent"   },
  { code: "TR", name: "Turkish",  level: "learning" },
  { code: "JP", name: "Japanese", level: "learning" },
];

const NOW_PLAYING = [
  {
    k: "Building", title: "AI Interview Platform", meta: "Sprint 04 · v0.6.2",
    status: "active", viz: "progress", vizData: { value: 68, total: 100, label: "complete" },
  },
  {
    k: "Reading", title: "Designing ML Systems", meta: "Chip Huyen · Ch. 6 / 10",
    status: "pinned", viz: "pages", vizData: { current: 6, total: 10 },
  },
  {
    k: "Learning", title: "Distributed Training", meta: "+ Turkish · + how to nap",
    status: "looping", viz: "streak", vizData: { days: 23, week: [1,1,1,0,1,1,1] },
  },
  {
    k: "Obsessed", title: "LLM evaluation harnesses", meta: "Art > science, allegedly",
    status: "spiking", viz: "spark", vizData: { points: [2, 5, 3, 7, 4, 9, 6, 11, 8, 14, 12, 18, 15, 22] },
  },
];

const NAV = [
  { id: "intro",     label: "Index",         n: "00" },
  { id: "about",     label: "About",         n: "01" },
  { id: "work",      label: "Selected Work", n: "02" },
  { id: "skills",    label: "Toolbelt",      n: "03" },
  { id: "education", label: "Education",     n: "04" },
  { id: "contact",   label: "Contact",       n: "05" },
];

/* ---------- HOOKS ---------- */
function useClock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return t.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }) + " IST";
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

function useSectionProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const traveled = vh - r.top;
      const total = r.height + vh;
      setP(Math.max(0, Math.min(1, traveled / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return p;
}

function useCursor() {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const over = (e) => setHover(!!e.target.closest("a, button, [data-cursor='hover']"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);
  return { ref, hover };
}

function useTick(ms = 1000) {
  const [, force] = useState(0);
  useEffect(() => {
    const id = setInterval(() => force((n) => n + 1), ms);
    return () => clearInterval(id);
  }, [ms]);
}

/* ---------- PRIMITIVES ---------- */
function Section({ id, n, label, children, divider = true }) {
  return (
    <section id={id} className="section">
      {divider && (
        <div className="section-head">
          <span className="mono">{n}</span>
          <span className="mono section-label">{label}</span>
          <span className="rule" />
        </div>
      )}
      {children}
    </section>
  );
}

function Placeholder({ label, accent = "neutral", ratio = "4 / 3" }) {
  return (
    <div className={`ph ph-${accent}`} style={{ aspectRatio: ratio }}>
      <svg className="ph-stripes" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <pattern id={`stripes-${accent}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" strokeWidth="1.4" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#stripes-${accent})`} />
      </svg>
      <span className="mono ph-label">{label}</span>
      <span className="mono ph-corner">DROP IMG</span>
    </div>
  );
}

/* ---------- NAV ---------- */
function TopNav({ active, onJump }) {
  const time = useClock();
  return (
    <header className="topnav">
      <button className="brand" onClick={() => onJump("intro")} data-cursor="hover">
        <span className="brand-mark">A.</span>
        <span className="brand-name">{PROFILE.shortName}</span>
      </button>
      <nav className="nav-links">
        {NAV.slice(1).map((n) => (
          <button
            key={n.id}
            className={`nav-link mono ${active === n.id ? "is-active" : ""}`}
            onClick={() => onJump(n.id)}
            data-cursor="hover"
          >
            <span className="nav-n">{n.n}</span>
            <span>{n.label}</span>
          </button>
        ))}
      </nav>
      <div className="nav-meta mono">
        <span className="dot" />
        <span>{time}</span>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
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

function Hero({ onJump }) {
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
          <Stat k="CGPA"     v="8.72" suffix="/ 10"    viz="arc"     vizProps={{ ratio: 0.872 }}        tilt={-1.2} />
          <Stat k="Year"     v="3rd"  suffix="of 4"    viz="dots"    vizProps={{ total: 4, filled: 3 }} tilt={0.8}  />
          <Stat k="Projects" v="06"   suffix="shipped" viz="squares" vizProps={{ total: 6, filled: 6 }} tilt={-0.6} />
          <Stat k="Certs"    v="02"   suffix="Oracle"  viz="seal"                                        tilt={1.4}  />
        </div>
      </div>
    </Section>
  );
}

/* ---------- MARQUEE ---------- */
function Marquee({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <span className="marquee-item" key={i}>
            <span className="serif italic">{t}</span>
            <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- ABOUT ---------- */
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
        <span className="np-pages-label">CH. {String(data.current).padStart(2, "0")} / {String(data.total).padStart(2, "0")}</span>
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
    const path = pts.map((v, i) => `${i ? "L" : "M"} ${(i * step).toFixed(1)} ${(h - (v / max) * (h - 4) - 2).toFixed(1)}`).join(" ");
    const area = `${path} L ${w} ${h} L 0 ${h} Z`;
    return (
      <div className="now-viz now-viz-spark">
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
          <path d={area} className="np-spark-area" />
          <path d={path} className="np-spark-line" />
          {pts.map((v, i) => (
            <circle key={i} cx={i * step} cy={h - (v / max) * (h - 4) - 2} r="1.5"
              className={i === pts.length - 1 ? "np-spark-dot is-tip" : "np-spark-dot"} />
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

function About() {
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
                  <span className="mono lang-level">{l.level}</span>
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

/* ---------- WORK ---------- */
function ProjectCard({ p, i, total }) {
  const ref = useRef(null);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = (r.top + r.height / 2 - vh / 2) / (vh / 2);
      setParallax(Math.max(-1, Math.min(1, center)));
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
          <div className="pcard-visual" style={{ "--py": `${parallax * -28}px` }}>
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

function Work() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sect = document.getElementById("work");
    if (!sect) return;
    const cards = sect.querySelectorAll(".pcard");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.4) {
            const idx = Number(e.target.style.getPropertyValue("--i"));
            setActive(idx);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.4, 0.6, 0.8] }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
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
                  if (card) window.scrollTo({ top: card.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
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
    </Section>
  );
}

/* ---------- SKILLS ---------- */
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

function Skills() {
  const [cat, setCat] = useState(0);
  const [pick, setPick] = useState(0);
  const group = SKILLS[cat];
  useEffect(() => { setPick(0); }, [cat]);
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
              onClick={() => setCat(i)}
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

/* ---------- EDUCATION ---------- */
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

function Education() {
  const roadRef = useRef(null);
  const progress = useSectionProgress(roadRef);
  const [speed, setSpeed] = useState(0);
  const lastRef = useRef({ t: performance.now(), p: 0 });
  useEffect(() => {
    const now = performance.now();
    const dt = Math.max(now - lastRef.current.t, 16);
    const dp = Math.abs(progress - lastRef.current.p);
    const v = Math.min(140, Math.round((dp / dt) * 120000));
    setSpeed((prev) => Math.round(prev * 0.6 + v * 0.4));
    lastRef.current = { t: now, p: progress };
  }, [progress]);

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
            <span className="dash-v">{Math.round(progress * 94)} <small>/ 94 KM</small></span>
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

      <div ref={roadRef} className="road" style={{ "--p": progress }}>
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

/* ---------- CONTACT ---------- */
function Stamp() {
  return (
    <div className="stamp" aria-hidden="true">
      <div className="stamp-inner">
        <svg className="stamp-portrait" viewBox="0 0 60 60">
          <circle cx="30" cy="22" r="10" fill="none" strokeWidth="1.5" stroke="currentColor" />
          <path d="M 12 50 Q 30 32 48 50 L 48 56 L 12 56 Z" fill="none" strokeWidth="1.5" stroke="currentColor" />
          <text x="30" y="44" textAnchor="middle" fontSize="9" fontStyle="italic" fontFamily="Instrument Serif" fill="currentColor">A.U.A.</text>
        </svg>
        <span className="mono stamp-top">AVAILABLE</span>
        <span className="stamp-big serif italic">'26</span>
        <span className="mono stamp-bot">INDIA · SUMMER</span>
      </div>
    </div>
  );
}

function Postmark({ date, city = "VELLORE · INDIA" }) {
  return (
    <div className="postmark" aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <defs>
          <path id="pm-top" d="M 60 60 m -46 0 a 46 46 0 0 1 92 0" fill="none" />
          <path id="pm-bot" d="M 60 60 m -38 0 a 38 38 0 1 0 76 0" fill="none" />
        </defs>
        <circle cx="60" cy="60" r="54" fill="none" strokeWidth="1.4" />
        <circle cx="60" cy="60" r="42" fill="none" strokeWidth="0.8" />
        <text fontSize="9" fontFamily="JetBrains Mono" letterSpacing="2">
          <textPath href="#pm-top" startOffset="50%" textAnchor="middle">{city}</textPath>
        </text>
        <text fontSize="7" fontFamily="JetBrains Mono" letterSpacing="1.5">
          <textPath href="#pm-bot" startOffset="50%" textAnchor="middle">{date}</textPath>
        </text>
        <text x="60" y="58" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="1.5">POSTED</text>
        <line x1="22" y1="66" x2="98" y2="66" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4500);
  };
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <Section id="contact" n="05" label="Contact">
      <div className="contact-head">
        <h2 className="display-2">
          Drop me a <span className="serif italic">line</span>{" "}
          <span className="contact-stamp mono">— I reply fast.</span>
        </h2>
      </div>

      <form className={`envelope ${sent ? "is-sent" : ""}`} onSubmit={onSubmit}>
        <div className="envelope-border" aria-hidden="true" />
        <div className="envelope-grid">
          <header className="postal-row">
            <Postmark date={today} />
            <div className="par-avion mono">
              <span className="par-avion-title">PAR AVION</span>
              <span className="par-avion-sub">via airmail · priority</span>
              <span className="par-avion-arrow">→ → →</span>
            </div>
            <Stamp />
          </header>

          <div className="addr addr-from">
            <span className="mono addr-k">From</span>
            <label className="addr-line">
              <span className="mono addr-hint">Name</span>
              <input required value={form.name} onChange={upd("name")} placeholder="Ada Lovelace" />
            </label>
            <label className="addr-line">
              <span className="mono addr-hint">Email</span>
              <input required type="email" value={form.email} onChange={upd("email")} placeholder="ada@analytical.engine" />
            </label>
          </div>

          <div className="addr addr-to">
            <span className="mono addr-k">To</span>
            <p className="addr-line is-readonly">
              <span className="addr-name serif italic">Ansari Usaid Anzer</span>
            </p>
            <p className="addr-line is-readonly mono">
              <a href={`mailto:${PROFILE.email}`} data-cursor="hover">{PROFILE.email}</a>
            </p>
            <p className="addr-line is-readonly mono">{PROFILE.location}</p>
          </div>

          <div className="letter">
            <p className="letter-greeting serif italic">Dear Ansari,</p>
            <textarea
              required rows={4}
              value={form.message}
              onChange={upd("message")}
              placeholder="Tell me what you're building — or what you'd like to build together."
            />
            <div className="letter-sign">
              <span className="serif italic">Sincerely yours,</span>
              <span className="letter-sign-name serif italic">— {form.name || "______________"}</span>
            </div>
          </div>

          <button type="submit" className="post-btn" data-cursor="hover">
            <span className="post-btn-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path fill="currentColor" d="M2 5l20 7-20 7 4-7-4-7zm5.5 5.5L20 12 7.5 13.5l1.5-1.5-1.5-1.5z"/></svg>
            </span>
            <span>{sent ? "Letter posted — talk soon." : "Post the letter"}</span>
            <span className="post-btn-arrow">{sent ? "✓" : "→"}</span>
          </button>
        </div>
      </form>

      <div className="ps-row">
        <span className="ps-label serif italic">P.S.</span>
        <p className="ps-intro">— find me elsewhere:</p>
        <ul className="ps-list">
          {PROFILE.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" data-cursor="hover">
                <span className="mono ps-key">{s.label}</span>
                <span className="ps-val">{s.handle}</span>
                <span className="ps-arrow">↗</span>
              </a>
            </li>
          ))}
          <li>
            <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} data-cursor="hover">
              <span className="mono ps-key">Phone</span>
              <span className="ps-val">{PROFILE.phone}</span>
              <span className="ps-arrow">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </Section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-mega serif italic">Ansari Usaid Anzer</div>
      <div className="footer-row mono">
        <span>© {new Date().getFullYear()} — All rights reserved</span>
        <span>Designed &amp; built with care in Vellore</span>
        <button className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-cursor="hover">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

/* ---------- APP ---------- */
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
        <Marquee items={["Artificial Intelligence", "Full-stack Engineering", "Cloud Infrastructure", "Deep Learning", "Product Thinking", "Open Source"]} />
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
