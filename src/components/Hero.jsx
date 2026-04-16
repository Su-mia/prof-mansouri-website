import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
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
          <span className="eyebrow hero__eyebrow">Architecture · Research · Education</span>
          <h1 className="hero__name">
            Ahmed<br />Mansouri
          </h1>
          <p className="hero__role">Doctor of Engineering in Architecture</p>
          <div className="hero__line" ref={lineRef} />
          <p className="hero__bio">
            Architect, researcher, and educator dedicated to the intersection
            of spatial theory, sustainable design, and architectural pedagogy.
          </p>
          <div className="hero__actions">
            <a href="#research" className="hero__btn hero__btn--primary">
              View Research
            </a>
            <a href="#contact" className="hero__btn hero__btn--ghost">
              Get in Touch
            </a>
          </div>
        </div>

        <div className="hero__aside">
          <div className="hero__stat-list">
            {[
              { num: '20+', label: 'Years of Practice' },
              { num: '40+', label: 'Publications' },
              { num: '15+', label: 'Design Projects' },
              { num: '500+', label: 'Students Mentored' },
            ].map((s) => (
              <div key={s.label} className="hero__stat">
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
