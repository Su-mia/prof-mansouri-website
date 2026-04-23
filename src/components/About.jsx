import { useReveal } from '../hooks/useReveal';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';
import './About.css';

export default function About() {
  const { data } = useData();
  const { t } = useLang();
  const { education: EDUCATION, positions: POSITIONS, skills: SKILLS } = data.about;
  const ref = useReveal();

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <div className="about__header reveal">
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2 className="section-title">{t.about.title}</h2>
          <div className="divider" />
          <p className="section-desc">{t.about.desc}</p>
          <a href="#" className="about__download reveal reveal-delay-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {t.about.downloadCV}
          </a>
        </div>

        <div className="about__body">
          <div className="about__block reveal reveal-delay-1">
            <h3 className="about__block-title">{t.about.education}</h3>
            <div className="about__timeline">
              {EDUCATION.map((e) => (
                <div key={e.id} className="about__timeline-item">
                  <span className="about__timeline-year">{e.year}</span>
                  <div className="about__timeline-content">
                    <p className="about__timeline-degree">{e.degree}</p>
                    <p className="about__timeline-field">{e.field}</p>
                    <p className="about__timeline-org">{e.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about__block reveal reveal-delay-2">
            <h3 className="about__block-title">{t.about.positions}</h3>
            <div className="about__timeline">
              {POSITIONS.map((p) => (
                <div key={p.id} className="about__timeline-item">
                  <span className="about__timeline-year">{p.period}</span>
                  <div className="about__timeline-content">
                    <p className="about__timeline-degree">{p.role}</p>
                    <p className="about__timeline-org">{p.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about__block reveal reveal-delay-3">
            <h3 className="about__block-title">{t.about.expertise}</h3>
            <div className="about__skills">
              {SKILLS.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
