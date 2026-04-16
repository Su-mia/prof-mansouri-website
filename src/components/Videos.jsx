import { useReveal } from '../hooks/useReveal';
import './Videos.css';

const VIDEOS = [
  {
    id: 1,
    title: 'Architecture as Memory: A Public Lecture',
    duration: '52:14',
    type: 'Lecture',
    year: '2024',
    venue: 'National School of Architecture',
    desc: 'Keynote address exploring how architecture encodes collective and individual memory through spatial organization and material choice.',
    thumb: null,
  },
  {
    id: 2,
    title: 'Sustainable Design in the Maghreb Context',
    duration: '38:40',
    type: 'Conference',
    year: '2023',
    venue: 'EARC Symposium, Tunis',
    desc: 'Paper presentation at the Euro-African Regional Conference on climate-responsive architecture informed by vernacular tradition.',
    thumb: null,
  },
  {
    id: 3,
    title: 'Parametric Tools in Studio Education',
    duration: '44:20',
    type: 'Workshop',
    year: '2023',
    venue: 'Department of Architecture',
    desc: 'A recorded workshop introducing Grasshopper and Rhino to third-year architecture students, with live modeling exercises.',
    thumb: null,
  },
  {
    id: 4,
    title: 'Desert Vernacular: Field Recording',
    duration: '18:05',
    type: 'Documentary',
    year: '2022',
    venue: 'Tamanrasset, Algeria',
    desc: 'A short documentary following a research field trip documenting Saharan ksour architecture and earthen construction techniques.',
    thumb: null,
  },
  {
    id: 5,
    title: 'Heritage and Modernity: Panel Discussion',
    duration: '1:24:10',
    type: 'Panel',
    year: '2022',
    venue: 'University of Architecture — International Forum',
    desc: 'A moderated panel addressing the tension between heritage conservation and the imperatives of contemporary urban development.',
    thumb: null,
  },
  {
    id: 6,
    title: 'Tectonic Ethics in the Post-Digital Age',
    duration: '29:55',
    type: 'Lecture',
    year: '2021',
    venue: 'Architecture Review Podcast',
    desc: 'A recorded podcast episode discussing material authenticity, craft, and the ethical dimensions of computational design.',
    thumb: null,
  },
];

export default function Videos() {
  const ref = useReveal();

  return (
    <section id="videos" className="section videos" ref={ref}>
      <div className="container">
        <div className="videos__header reveal">
          <span className="eyebrow">04 — Videos</span>
          <h2 className="section-title">Lectures &<br />Media</h2>
          <div className="divider" />
          <p className="section-desc">
            Recorded public lectures, conference presentations, workshops,
            and documentary content.
          </p>
        </div>

        <div className="videos__grid">
          {VIDEOS.map((v, i) => (
            <div key={v.id} className={`videos__card reveal reveal-delay-${(i % 4) + 1}`}>
              {/* Thumbnail placeholder */}
              <div className="videos__thumb">
                <div className="videos__thumb-bg" aria-hidden="true" />
                <button className="videos__play" aria-label="Play video">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
                <span className="videos__duration">{v.duration}</span>
              </div>

              <div className="videos__info">
                <div className="videos__meta">
                  <span className="tag">{v.type}</span>
                  <span className="videos__year">{v.year}</span>
                </div>
                <h3 className="videos__title">{v.title}</h3>
                <p className="videos__venue">{v.venue}</p>
                <p className="videos__desc">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
