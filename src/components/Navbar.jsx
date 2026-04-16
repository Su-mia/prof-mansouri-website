import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Designs', href: '#designs' },
  { label: 'Videos', href: '#videos' },
  { label: 'Teaching', href: '#teaching' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#hero" className="navbar__brand">
          <span className="navbar__name">Ahmed Mansouri</span>
          <span className="navbar__title">Dr.Eng · Architecture</span>
        </a>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="navbar__link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="navbar__burger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>
    </header>
  );
}
