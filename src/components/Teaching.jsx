import { useReveal } from '../hooks/useReveal';
import './Teaching.css';

const COURSES = [
  {
    code: 'ARCH 301',
    title: 'Architectural Theory & Criticism',
    level: 'Undergraduate · Year 3',
    semester: 'Both semesters',
    desc: 'Survey of architectural thought from the Enlightenment to contemporary discourse. Emphasis on close reading and critical writing.',
    materials: ['Lecture slides', 'Reading list', 'Essay prompts'],
  },
  {
    code: 'ARCH 502',
    title: 'Advanced Design Studio',
    level: 'Graduate · Year 1',
    semester: 'Autumn',
    desc: 'Complex mixed-use design project integrating urban context, programmatic innovation, and tectonic expression. Individual and team work.',
    materials: ['Studio briefs', 'Reference sheets', 'Assessment criteria'],
  },
  {
    code: 'ARCH 410',
    title: 'Sustainable & Bioclimatic Design',
    level: 'Undergraduate · Year 4',
    semester: 'Spring',
    desc: 'Passive design strategies, energy simulation methods, and daylighting analysis applied to Mediterranean and arid climatic zones.',
    materials: ['Technical handouts', 'Simulation tutorials', 'Case studies'],
  },
  {
    code: 'ARCH 610',
    title: 'Heritage Conservation & Adaptive Reuse',
    level: 'Graduate · Year 2',
    semester: 'Spring',
    desc: 'Principles of heritage conservation, survey methods, and design approaches for adapting historic structures to contemporary use.',
    materials: ['Lecture notes', 'Survey manual', 'Design guidelines'],
  },
  {
    code: 'ARCH 220',
    title: 'Architectural History I',
    level: 'Undergraduate · Year 2',
    semester: 'Autumn',
    desc: 'From ancient civilizations through the Renaissance: building technology, spatial concepts, and cultural context across traditions.',
    materials: ['Image bank', 'Timeline', 'Exam guides'],
  },
  {
    code: 'ARCH 705',
    title: 'Research Methods in Architecture',
    level: 'Graduate · Doctoral',
    semester: 'Autumn',
    desc: 'Qualitative and quantitative methodologies for architectural research, including case study design, ethnography, and simulation.',
    materials: ['Methodology guide', 'Academic writing workshop', 'Bibliography templates'],
  },
];

const THESES = [
  { title: 'Thermal Performance of Earth Architecture in Semi-Arid Zones', student: 'M. Benali', year: '2024', level: 'PhD' },
  { title: 'Urban Vacancy as Resource: Regeneration of Post-Industrial Sites', student: 'L. Hamdane', year: '2023', level: 'PhD' },
  { title: 'Spatial Narratives in Children\'s Educational Environments', student: 'S. Ferhat', year: '2023', level: 'Master' },
  { title: 'Computational Form-Finding for Shell Structures', student: 'R. Bouzid', year: '2022', level: 'Master' },
];

export default function Teaching() {
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
            <div key={c.code} className={`teaching__course reveal reveal-delay-${(i % 4) + 1}`}>
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
              <div key={t.title} className="teaching__thesis">
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
