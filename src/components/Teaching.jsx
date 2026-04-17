import { useReveal } from '../hooks/useReveal';
import { useData } from '../context/DataContext';
import './Teaching.css';

export default function Teaching() {
  const { data } = useData();
  const { courses: COURSES, theses: THESES } = data.teaching;
  const ref = useReveal();

  return (
    <section id="teaching" className="section teaching" ref={ref}>
      <div className="container">
        <div className="teaching__header reveal">
          <span className="eyebrow">05 — Teaching</span>
          <h2 className="section-title">Courses &<br />Materials</h2>
          <div className="divider" />
          <p className="section-desc">
            Course syllabi, lecture resources, studio briefs, and supervised
            thesis projects available for download.
          </p>
        </div>

        <div className="teaching__courses">
          {COURSES.map((c, i) => (
            <div key={c.id} className={`teaching__course reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="teaching__course-left">
                <span className="teaching__code">{c.code}</span>
                <h3 className="teaching__course-title">{c.title}</h3>
                <div className="teaching__course-meta">
                  <span>{c.level}</span>
                  <span className="teaching__dot" aria-hidden="true">·</span>
                  <span>{c.semester}</span>
                </div>
              </div>

              <div className="teaching__course-right">
                <p className="teaching__course-desc">{c.desc}</p>
                <div className="teaching__materials">
                  {c.materials.map((m) => (
                    <a key={m} href="#" className="teaching__material-link">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      {m}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Supervised theses */}
        <div className="teaching__theses reveal">
          <h3 className="teaching__sub-title">Supervised Theses (Recent)</h3>
          <div className="teaching__thesis-list">
            {THESES.map((t) => (
              <div key={t.id} className="teaching__thesis">
                <span className="teaching__thesis-level tag">{t.level}</span>
                <div className="teaching__thesis-info">
                  <p className="teaching__thesis-title">{t.title}</p>
                  <p className="teaching__thesis-student">{t.student} · {t.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
