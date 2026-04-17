import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useData } from '../context/DataContext';
import './Contact.css';

export default function Contact() {
  const { data } = useData();
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
            <span className="eyebrow">06 — Contact</span>
            <h2 className="section-title">Get in<br />Touch</h2>
            <div className="divider" />
            <p className="section-desc">
              Open to research collaboration, invited lectures, design consultancy,
              and student supervision inquiries.
            </p>

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
                <p>Message received. I will respond within a few days.</p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" name="subject" value={form.subject} onChange={handleChange} required>
                    <option value="" disabled>Select a topic</option>
                    <option value="research">Research Collaboration</option>
                    <option value="lecture">Invited Lecture</option>
                    <option value="consultation">Design Consultation</option>
                    <option value="supervision">Thesis Supervision</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="contact__field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your inquiry…"
                  />
                </div>

                <button type="submit" className="contact__submit">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
