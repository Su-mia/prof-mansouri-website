import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HeroEditor from './admin/HeroEditor';
import AboutEditor from './admin/AboutEditor';
import ResearchEditor from './admin/ResearchEditor';
import DesignsEditor from './admin/DesignsEditor';
import VideosEditor from './admin/VideosEditor';
import TeachingEditor from './admin/TeachingEditor';
import ContactEditor from './admin/ContactEditor';
import FooterEditor from './admin/FooterEditor';
import './AdminPage.css';

const SECTIONS = [
  { id: 'hero',     label: 'Hero',      icon: '◆' },
  { id: 'about',    label: 'About / CV', icon: '◇' },
  { id: 'research', label: 'Research',  icon: '◇' },
  { id: 'designs',  label: 'Designs',   icon: '◇' },
  { id: 'videos',   label: 'Videos',    icon: '◇' },
  { id: 'teaching', label: 'Teaching',  icon: '◇' },
  { id: 'contact',  label: 'Contact',   icon: '◇' },
  { id: 'footer',   label: 'Footer',    icon: '◇' },
];

const EDITORS = {
  hero:     <HeroEditor />,
  about:    <AboutEditor />,
  research: <ResearchEditor />,
  designs:  <DesignsEditor />,
  videos:   <VideosEditor />,
  teaching: <TeachingEditor />,
  contact:  <ContactEditor />,
  footer:   <FooterEditor />,
};

export default function AdminPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('hero');

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="admin">
      {/* Top bar */}
      <header className="admin__topbar">
        <div className="admin__topbar-brand">
          <span className="admin__topbar-name">Ahmed Mansouri</span>
          <span className="admin__topbar-badge">Admin</span>
        </div>
        <div className="admin__topbar-right">
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin__topbar-link">
            View Site ↗
          </a>
          <button className="admin__topbar-logout" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </header>

      <div className="admin__body">
        {/* Sidebar */}
        <aside className="admin__sidebar">
          <nav className="admin__nav">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`admin__nav-item ${active === s.id ? 'active' : ''}`}
                onClick={() => setActive(s.id)}
              >
                <span className="admin__nav-icon">{active === s.id ? '◆' : '◇'}</span>
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="admin__content">
          {EDITORS[active]}
        </main>
      </div>
    </div>
  );
}
