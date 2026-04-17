import { useReveal } from '../hooks/useReveal';
import { useData } from '../context/DataContext';
import './Videos.css';

export default function Videos() {
  const { data } = useData();
  const VIDEOS = data.videos;
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
