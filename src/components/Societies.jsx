import { useReveal } from '../hooks/useReveal';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';
import './Societies.css';

export default function Societies() {
  const { data } = useData();
  const { t } = useLang();
  const societies = data.societies || [];
  const ref = useReveal();

  return (
    <section id="societies" className="section societies" ref={ref}>
      <div className="container">
        <div className="societies__header reveal">
          <span className="eyebrow">{t.societies.eyebrow}</span>
          <h2 className="section-title">{t.societies.title}</h2>
          <div className="divider" />
          <p className="section-desc">{t.societies.desc}</p>
        </div>

        <div className="societies__grid">
          {societies.map((s, i) => (
            <div key={s.id} className={`societies__card reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="societies__logo">
                {s.logo
                  ? <img src={s.logo} alt={s.name} />
                  : <span className="societies__abbr">{s.name.split(' ').map((w) => w[0]).slice(0, 3).join('')}</span>
                }
              </div>
              <div className="societies__info">
                <p className="societies__name">{s.name}</p>
                <p className="societies__role">{s.role}</p>
                <p className="societies__meta">
                  {s.country}{s.since ? ` · ${t.societies.since} ${s.since}` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
