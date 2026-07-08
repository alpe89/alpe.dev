import { Link } from '@tanstack/react-router';

export function Nav() {
  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link to="/" className="logo">
          alpe.dev
        </Link>
        <ul>
          <li>
            <Link to="/blog">blog</Link>
          </li>
          <li>
            <Link to="/contacts">contacts</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
