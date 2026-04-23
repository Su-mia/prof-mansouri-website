import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';
import './Research.css';

export default function Research() {
  const { data } = useData();
  const { t } = useLang();
  const PAPERS = data.research;
  const TAGS = Array.from(new Set(PAPERS.flatMap((p) => p.tags)));

  const [activeTag, setActiveTag] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const ref = useReveal();

  const filtered = activeTag ? PAPERS.filter((p) => p.tags.includes(activeTag)) : PAPERS;

  return (
    <section id="research" className="section research" ref={ref}>
      <div className="container">
        <div className="research__header reveal">
          <span className="eyebrow">{t.research.eyebrow}</span>
          <h2 className="section-title">{t.research.title}</h2>
          <div className="divider" />
          <p className="section-desc">{t.research.desc}</p>
        </div>

        <div className="research__filters reveal reveal-delay-1">
          <button
            className={`research__filter-btn ${activeTag === null ? 'active' : ''}`}
            onClick={() => setActiveTag(null)}
          >
            {t.research.all}
          </button>
          {TAGS.map((tag) => (
            <button
              key={tag}
              className={`research__filter-btn ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="research__list">
          {filtered.map((paper, i) => (
            <div
              key={paper.id}
              className={`research__item reveal reveal-delay-${(i % 4) + 1}`}
            >
              <div
                className="research__item-header"
                onClick={() => setExpanded(expanded === paper.id ? null : paper.id)}
              >
                <div className="research__item-meta">
                  <span className="research__year">{paper.year}</span>
                  <div className="research__tags">
                    {paper.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </div>
                <div className="research__item-main">
                  <h3 className="research__title">{paper.title}</h3>
                  <p className="research__journal">{paper.journal}</p>
                </div>
                <button className="research__toggle" aria-label="Expand">
                  <svg
                    width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="1.5"
                    style={{ transform: expanded === paper.id ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s ease' }}
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>

              {expanded === paper.id && (
                <div className="research__item-body">
                  <p className="research__abstract">{paper.abstract}</p>
                  <a href={paper.doi} className="research__doi">{t.research.viewPub}</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
