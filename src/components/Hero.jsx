import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import './Hero.css';

function HeroBtn({ href, className, children }) {
  if (href && href.startsWith('/')) return <Link to={href} className={className}>{children}</Link>;
  return <a href={href} className={className}>{children}</a>;
}

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
      <div className="hero__content container">

        {/* Left: text */}
        <div className="hero__text">
          <span className="eyebrow hero__eyebrow">{h.eyebrow}</span>
          <h1 className="hero__name">
            {h.nameFirst}<br />{h.nameLast}
          </h1>
          <p className="hero__role">{h.role}</p>
          <div className="hero__line" ref={lineRef} />
          <p className="hero__bio">{h.bio}</p>
          <div className="hero__actions">
            <HeroBtn href={h.primaryBtn.href} className="hero__btn hero__btn--primary">
              {h.primaryBtn.text}
            </HeroBtn>
            <HeroBtn href={h.ghostBtn.href} className="hero__btn hero__btn--ghost">
              {h.ghostBtn.text}
            </HeroBtn>
          </div>
        </div>

        {/* Right: portrait + stats */}
        <div className="hero__aside">
          <div className="hero__portrait">
            <img
              src={h.photo || '/mansouri.webp'}
              alt={`${h.nameFirst} ${h.nameLast}`}
            />
          </div>
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

    </section>
  );
}
