export function Footer() {
  return (
    <footer className="site-footer wrap">
      <span className="exit">
        echo $? <span className="z">0</span> · © {new Date().getFullYear()} Alberto Pertusi
      </span>
      <span>no cookies · no tracking · 100% organic bugs</span>
    </footer>
  );
}
