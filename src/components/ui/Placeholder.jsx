export function Placeholder({ label, accent = "neutral", ratio = "4 / 3" }) {
  return (
    <div className={`ph ph-${accent}`} style={{ aspectRatio: ratio }}>
      <svg className="ph-stripes" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <pattern
            id={`stripes-${accent}`}
            width="6" height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
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
