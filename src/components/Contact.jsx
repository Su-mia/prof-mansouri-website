import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';
import './Contact.css';

export default function Contact() {
  const { data } = useData();
  const { t } = useLang();
  const contactItems = data.contact.items;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const ref = useReveal();

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <div className="contact__grid">
          <div className="contact__left reveal">
            <span className="eyebrow">{t.contact.eyebrow}</span>
            <h2 className="section-title">{t.contact.title}</h2>
            <div className="divider" />
            <p className="section-desc">{t.contact.desc}</p>

            <div className="contact__info">
              {contactItems.map((item) => (
                <div key={item.id} className="contact__info-item">
                  <span className="contact__info-label">{item.label}</span>
                  <span className="contact__info-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="contact__right reveal reveal-delay-2">
            {sent ? (
              <div className="contact__success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p>{t.contact.sent}</p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__field">
                  <label htmlFor="name">{t.contact.name}</label>
                  <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder={t.contact.namePh} />
                </div>

                <div className="contact__field">
                  <label htmlFor="email">{t.contact.email}</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder={t.contact.emailPh} />
                </div>

                <div className="contact__field">
                  <label htmlFor="subject">{t.contact.subject}</label>
                  <select id="subject" name="subject" value={form.subject} onChange={handleChange} required>
                    <option value="" disabled>{t.contact.selectTopic}</option>
                    <option value="research">{t.contact.subjects.research}</option>
                    <option value="lecture">{t.contact.subjects.lecture}</option>
                    <option value="consultation">{t.contact.subjects.consultation}</option>
                    <option value="supervision">{t.contact.subjects.supervision}</option>
                    <option value="other">{t.contact.subjects.other}</option>
                  </select>
                </div>

                <div className="contact__field">
                  <label htmlFor="message">{t.contact.message}</label>
                  <textarea id="message" name="message" rows="5" required value={form.message} onChange={handleChange} placeholder={t.contact.messagePh} />
                </div>

                <button type="submit" className="contact__submit">{t.contact.submit}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
