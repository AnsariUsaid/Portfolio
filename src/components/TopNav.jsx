import { useClock } from '../hooks/useClock';
import { PROFILE, NAV } from '../data/profile';

export function TopNav({ active, onJump }) {
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
