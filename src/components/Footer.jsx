import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';
import './Footer.css';

export default function Footer() {
  const { data } = useData();
  const { t } = useLang();
  const { name, role } = data.footer;

  const LINKS = [
    { label: t.nav.about,     to: '/about' },
    { label: t.nav.research,  to: '/research' },
    { label: t.nav.designs,   to: '/designs' },
    { label: t.nav.videos,    to: '/videos' },
    { label: t.nav.teaching,  to: '/teaching' },
    { label: t.nav.societies, to: '/societies' },
    { label: t.nav.contact,   to: '/contact' },
  ];

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__name">{name}</span>
          <span className="footer__role">{role}</span>
        </div>

        <nav className="footer__nav">
          {LINKS.map((item) => (
            <Link key={item.to} to={item.to} className="footer__link">
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="footer__copy">
          {t.footer.copy.replace('{year}', new Date().getFullYear())}
        </p>
      </div>
    </footer>
  );
}
