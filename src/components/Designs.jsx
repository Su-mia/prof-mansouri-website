import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Designs.css';

const PROJECTS = [
  {
    id: 1,
    title: 'Cultural Center — Algiers',
    type: 'Cultural',
    year: '2022',
    area: '12,400 m²',
    status: 'Built',
    desc: 'A monolithic concrete structure articulated by light wells and vaulted promenades, set against the Mediterranean hillside.',
    aspect: 'wide',
  },
  {
    id: 2,
    title: 'Desert Research Station — Tamanrasset',
    type: 'Research',
    year: '2021',
    area: '3,200 m²',
    status: 'Built',
    desc: 'Low-profile rammed-earth compound integrating passive ventilation and solar shading derived from Saharan vernacular models.',
    aspect: 'tall',
  },
  {
    id: 3,
    title: 'Waterfront Promenade — Annaba',
    type: 'Urban',
    year: '2020',
    area: '—',
    status: 'Realized',
    desc: 'An urban edge redefined by canopy structures, reflecting pools, and granite paving that mediates between the city grid and sea.',
    aspect: 'wide',
  },
  {
    id: 4,
    title: 'School of Architecture — Tlemcen',
    type: 'Educational',
    year: '2018',
    area: '8,600 m²',
    status: 'Built',
    desc: 'Layered terraced volumes carved from the hillside topography; studios oriented toward the Medina skyline.',
    aspect: 'normal',
  },
  {
    id: 5,
    title: 'Memorial Garden — Constantine',
    type: 'Cultural',
    year: '2017',
    area: '—',
    status: 'Competition',
    desc: 'A landscaped void carved into rocky terrain, where silence, erosion, and inscription form the material language of commemoration.',
    aspect: 'normal',
  },
  {
    id: 6,
    title: 'Eco-Housing Prototype',
    type: 'Residential',
    year: '2016',
    area: '180 m²',
    status: 'Prototype',
    desc: 'A net-zero dwelling demonstrating bioclimatic principles through earthen walls, green roof, and roof-integrated water harvesting.',
    aspect: 'normal',
  },
];

export default function Designs() {
  const [active, setActive] = useState(null);
  const ref = useReveal();

  return (
    <section id="designs" className="section designs" ref={ref}>
      <div className="container">
        <div className="designs__header reveal">
          <span className="eyebrow">03 — Architectural Designs</span>
          <h2 className="section-title">Selected<br />Projects</h2>
          <div className="divider" />
          <p className="section-desc">
            A curated portfolio of completed buildings, urban interventions, and
            competition entries spanning cultural, civic, and residential typologies.
          </p>
        </div>
      </div>

      {/* Full-width grid */}
      <div className="designs__grid">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className={`designs__card reveal reveal-delay-${(i % 3) + 1} aspect-${p.aspect} ${active === p.id ? 'active' : ''}`}
            onClick={() => setActive(active === p.id ? null : p.id)}
          >
            {/* Placeholder visual */}
            <div className="designs__card-visual">
              <div className="designs__card-pattern" aria-hidden="true" />
            </div>

            <div className="designs__card-overlay">
              <div className="designs__card-info">
                <span className="designs__card-type">{p.type} · {p.year}</span>
                <h3 className="designs__card-title">{p.title}</h3>
                {active === p.id && (
                  <div className="designs__card-expanded">
                    <p className="designs__card-desc">{p.desc}</p>
                    <div className="designs__card-meta">
                      {p.area !== '—' && <span><em>Area:</em> {p.area}</span>}
                      <span><em>Status:</em> {p.status}</span>
                    </div>
                  </div>
                )}
              </div>
              <span className="designs__card-icon">
                {active === p.id ? '−' : '+'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="container">
        <p className="designs__note reveal">
          Click any project to expand details. Full drawings and models available upon request.
        </p>
      </div>
    </section>
  );
}
