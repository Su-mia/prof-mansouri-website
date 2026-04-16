import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__name">Ahmed Mansouri</span>
          <span className="footer__role">Dr.Eng · Architecture</span>
        </div>

        <nav className="footer__nav">
          {['About', 'Research', 'Designs', 'Videos', 'Teaching', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="footer__link">
              {item}
            </a>
          ))}
        </nav>

        <p className="footer__copy">
          © {new Date().getFullYear()} Ahmed Mansouri. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
