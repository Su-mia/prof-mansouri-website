import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';
import './Navbar.css';

function PlatformIcon({ platform }) {
  switch (platform) {
    case 'YouTube':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="2" y="6" width="20" height="14" rx="2" />
          <polygon fill="currentColor" stroke="none" points="10,9 10,17 17,13" />
        </svg>
      );
    case 'Facebook':
      return <span className="sidenav__soc-text">f</span>;
    case 'X':
      return <span className="sidenav__soc-text">𝕏</span>;
    case 'ResearchGate':
      return <span className="sidenav__soc-text sidenav__soc-text--sm">RG</span>;
    case 'Academia':
      return <span className="sidenav__soc-text sidenav__soc-text--sm">Ac</span>;
    case 'Email':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="2" y="4" width="20" height="16" rx="1" />
          <polyline points="2,4 12,13 22,4" />
        </svg>
      );
    case 'ORCID':
      return <span className="sidenav__soc-text sidenav__soc-text--sm">iD</span>;
    default:
      return <span className="sidenav__soc-text sidenav__soc-text--sm">{platform.slice(0, 2)}</span>;
  }
}

const LANGS = ['en', 'fr', 'ar', 'ja'];

export default function Navbar() {
  const { data } = useData();
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const activeSocial = (data.social || []).filter((s) => s.url);

  const hrefFor = (s) =>
    s.platform === 'Email' && !s.url.startsWith('mailto:') ? `mailto:${s.url}` : s.url;

  const NAV = [
    { label: t.nav.home,      to: '/' },
    { label: t.nav.about,     to: '/about' },
    { label: t.nav.research,  to: '/research' },
    { label: t.nav.designs,   to: '/designs' },
    { label: t.nav.videos,    to: '/videos' },
    { label: t.nav.teaching,  to: '/teaching' },
    { label: t.nav.societies, to: '/societies' },
    { label: t.nav.contact,   to: '/contact' },
  ];

  return (
    <>
      {/* Mobile top bar */}
      <div className="sidenav__topbar">
        <NavLink to="/" className="sidenav__brand-link" onClick={() => setOpen(false)}>
          <span className="sidenav__name">{data.hero?.nameFirst} {data.hero?.nameLast}</span>
        </NavLink>
        <div className="sidenav__topbar-right">
          <div className="sidenav__langs sidenav__langs--inline">
            {LANGS.map((l) => (
              <button
                key={l}
                className={`sidenav__lang-btn ${lang === l ? 'active' : ''}`}
                onClick={() => setLang(l)}
              >
                {t.langLabel[l]}
              </button>
            ))}
          </div>
          <button
            className="sidenav__burger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={open ? 'open' : ''} />
            <span className={open ? 'open' : ''} />
            <span className={open ? 'open' : ''} />
          </button>
        </div>
      </div>

      {open && <div className="sidenav__backdrop" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidenav ${open ? 'sidenav--open' : ''}`}>
        <div className="sidenav__brand">
          <NavLink to="/" className="sidenav__brand-link" onClick={() => setOpen(false)}>
            <span className="sidenav__name">{data.hero?.nameFirst} {data.hero?.nameLast}</span>
            <span className="sidenav__title">{data.footer?.role || 'Dr.Eng · Architecture'}</span>
          </NavLink>
        </div>

        {/* Language switcher */}
        <div className="sidenav__langs">
          {LANGS.map((l) => (
            <button
              key={l}
              className={`sidenav__lang-btn ${lang === l ? 'active' : ''}`}
              onClick={() => setLang(l)}
            >
              {t.langLabel[l]}
            </button>
          ))}
        </div>

        <nav className="sidenav__nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `sidenav__link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {activeSocial.length > 0 && (
          <div className="sidenav__social">
            {activeSocial.map((s) => (
              <a
                key={s.id}
                href={hrefFor(s)}
                target={s.platform !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="sidenav__soc-link"
                title={s.label}
              >
                <PlatformIcon platform={s.platform} />
              </a>
            ))}
          </div>
        )}
      </aside>
    </>
  );
}
