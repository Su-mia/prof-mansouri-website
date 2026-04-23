import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';
import { getBlob } from '../utils/mediaDB';
import './Videos.css';

function getYtbEmbed(url) {
  if (!url) return null;
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}?autoplay=1` : null;
}

function VideoModal({ video, onClose, t }) {
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const embedUrl = getYtbEmbed(video.ytbLink);

  useState(() => {
    if (embedUrl || !video.videoKey) return;
    setLoading(true);
    getBlob(video.videoKey).then((blob) => {
      if (blob) setSrc(URL.createObjectURL(blob));
      setLoading(false);
    });
  }, [video.videoKey, embedUrl]);

  return (
    <div className="vid-modal" onClick={onClose}>
      <div className="vid-modal__box" onClick={(e) => e.stopPropagation()}>
        <button className="vid-modal__close" onClick={onClose} aria-label="Close">✕</button>

        {embedUrl && (
          <iframe
            className="vid-modal__iframe"
            src={embedUrl}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            title={video.title}
          />
        )}
        {!embedUrl && loading && <div className="vid-modal__loading">{t.videos.loading}</div>}
        {!embedUrl && !loading && src && (
          <video className="vid-modal__video" src={src} controls autoPlay />
        )}
        {!embedUrl && !loading && !src && video.thumb && (
          <img className="vid-modal__fallback" src={video.thumb} alt={video.title} />
        )}
        {!embedUrl && !loading && !src && !video.thumb && (
          <div className="vid-modal__empty">{t.videos.noVideo}</div>
        )}

        <div className="vid-modal__info">
          <p className="vid-modal__title">{video.title}</p>
          <p className="vid-modal__meta">{video.venue} · {video.year}</p>
        </div>
      </div>
    </div>
  );
}

export default function Videos() {
  const { data } = useData();
  const { t } = useLang();
  const VIDEOS = data.videos;
  const ref = useReveal();
  const [active, setActive] = useState(null);

  return (
    <section id="videos" className="section videos" ref={ref}>
      <div className="container">
        <div className="videos__header reveal">
          <span className="eyebrow">{t.videos.eyebrow}</span>
          <h2 className="section-title">{t.videos.title}</h2>
          <div className="divider" />
          <p className="section-desc">{t.videos.desc}</p>
        </div>

        <div className="videos__grid">
          {VIDEOS.map((v, i) => (
            <div key={v.id} className={`videos__card reveal reveal-delay-${(i % 4) + 1}`}>
              <div
                className="videos__thumb"
                style={v.thumb ? { backgroundImage: `url(${v.thumb})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              >
                {!v.thumb && <div className="videos__thumb-bg" aria-hidden="true" />}
                <button className="videos__play" aria-label="Play video" onClick={() => setActive(v)}>
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

      {active && <VideoModal video={active} onClose={() => setActive(null)} t={t} />}
    </section>
  );
}
