import { useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import './Hero.css';

export default function Hero() {
  const { data } = useData();
  const h = data.hero;
  const lineRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (lineRef.current) lineRef.current.classList.add('visible');
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__content container">
        <div className="hero__text">
          <span className="eyebrow hero__eyebrow">{h.eyebrow}</span>
          <h1 className="hero__name">
            {h.nameFirst}<br />{h.nameLast}
          </h1>
          <p className="hero__role">{h.role}</p>
          <div className="hero__line" ref={lineRef} />
          <p className="hero__bio">{h.bio}</p>
          <div className="hero__actions">
            <a href={h.primaryBtn.href} className="hero__btn hero__btn--primary">
              {h.primaryBtn.text}
            </a>
            <a href={h.ghostBtn.href} className="hero__btn hero__btn--ghost">
              {h.ghostBtn.text}
            </a>
          </div>
        </div>

        <div className="hero__aside">
          <div className="hero__stat-list">
            {h.stats.map((s) => (
              <div key={s.id} className="hero__stat">
                <span className="hero__stat-num">{s.num}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator" aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </div>
    </section>
  );
}
