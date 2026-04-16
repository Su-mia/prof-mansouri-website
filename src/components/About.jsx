import { useReveal } from '../hooks/useReveal';
import './About.css';

const EDUCATION = [
  { degree: 'Doctor of Engineering', field: 'Architecture', institution: 'University of Architecture', year: '2005' },
  { degree: 'Master of Science', field: 'Architectural Design', institution: 'National School of Architecture', year: '2001' },
  { degree: 'Bachelor of Architecture', field: 'Architecture', institution: 'National School of Architecture', year: '1999' },
];

const POSITIONS = [
  { role: 'Full Professor', org: 'Department of Architecture', period: '2015 – Present' },
  { role: 'Associate Professor', org: 'Department of Architecture', period: '2010 – 2015' },
  { role: 'Assistant Professor', org: 'Department of Architecture', period: '2006 – 2010' },
  { role: 'Visiting Researcher', org: 'European Institute of Urbanism', period: '2008 – 2009' },
];

const SKILLS = [
  'Architectural Theory', 'Sustainable Design', 'Urban Planning',
  'BIM / Revit', 'AutoCAD', 'Rhino 3D', 'Parametric Design',
  'Research Methodology', 'Academic Writing', 'Studio Pedagogy',
];

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <div className="about__header reveal">
          <span className="eyebrow">01 — About</span>
          <h2 className="section-title">Curriculum<br />Vitae</h2>
          <div className="divider" />
          <p className="section-desc">
            An architect with over two decades of experience bridging academic research,
            design practice, and architectural education.
          </p>
          <a href="#" className="about__download reveal reveal-delay-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Full CV
          </a>
        </div>

        <div className="about__body">
          {/* Education */}
          <div className="about__block reveal reveal-delay-1">
            <h3 className="about__block-title">Education</h3>
            <div className="about__timeline">
              {EDUCATION.map((e) => (
                <div key={e.degree} className="about__timeline-item">
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

          {/* Positions */}
          <div className="about__block reveal reveal-delay-2">
            <h3 className="about__block-title">Academic Positions</h3>
            <div className="about__timeline">
              {POSITIONS.map((p) => (
                <div key={p.role + p.period} className="about__timeline-item">
                  <span className="about__timeline-year">{p.period}</span>
                  <div className="about__timeline-content">
                    <p className="about__timeline-degree">{p.role}</p>
                    <p className="about__timeline-org">{p.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="about__block reveal reveal-delay-3">
            <h3 className="about__block-title">Expertise</h3>
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
