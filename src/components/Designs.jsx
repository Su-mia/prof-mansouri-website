import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';
import './Designs.css';

export default function Designs() {
  const { data } = useData();
  const { t } = useLang();
  const PROJECTS = data.designs;
  const [active, setActive] = useState(null);
  const ref = useReveal();

  return (
    <section id="designs" className="section designs" ref={ref}>
      <div className="container">
        <div className="designs__header reveal">
          <span className="eyebrow">{t.designs.eyebrow}</span>
          <h2 className="section-title">{t.designs.title}</h2>
          <div className="divider" />
          <p className="section-desc">{t.designs.desc}</p>
        </div>
      </div>

      <div className="designs__grid">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className={`designs__card reveal reveal-delay-${(i % 3) + 1} aspect-${p.aspect} ${active === p.id ? 'active' : ''}`}
            onClick={() => setActive(active === p.id ? null : p.id)}
          >
            <div
              className="designs__card-visual"
              style={p.image ? { backgroundImage: `url(${p.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            >
              {!p.image && <div className="designs__card-pattern" aria-hidden="true" />}
            </div>

            <div className="designs__card-overlay">
              <div className="designs__card-info">
                <span className="designs__card-type">{p.type} · {p.year}</span>
                <h3 className="designs__card-title">{p.title}</h3>
                {active === p.id && (
                  <div className="designs__card-expanded">
                    <p className="designs__card-desc">{p.desc}</p>
                    <div className="designs__card-meta">
                      {p.area !== '—' && <span><em>{t.designs.area}:</em> {p.area}</span>}
                      <span><em>{t.designs.status}:</em> {p.status}</span>
                    </div>
                  </div>
                )}
              </div>
              <span className="designs__card-icon">{active === p.id ? '−' : '+'}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="container">
        <p className="designs__note reveal">{t.designs.note}</p>
      </div>
    </section>
  );
}
