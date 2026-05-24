import { useState } from 'react';
import { PROFILE } from '../data/profile';
import { Section } from './ui/Section';

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

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const today = new Date()
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();

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
              <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M2 5l20 7-20 7 4-7-4-7zm5.5 5.5L20 12 7.5 13.5l1.5-1.5-1.5-1.5z" />
              </svg>
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
