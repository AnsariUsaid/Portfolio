export function Section({ id, n, label, children, divider = true }) {
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
