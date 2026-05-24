export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-mega serif italic">Ansari Usaid Anzer</div>
      <div className="footer-row mono">
        <span>© {new Date().getFullYear()} — All rights reserved</span>
        <span>Designed &amp; built with care in Vellore</span>
        <button
          className="footer-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-cursor="hover"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
