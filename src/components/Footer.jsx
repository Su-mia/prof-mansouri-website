import { useData } from '../context/DataContext';
import './Footer.css';

export default function Footer() {
  const { data } = useData();
  const { name, role } = data.footer;
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__name">{name}</span>
          <span className="footer__role">{role}</span>
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
