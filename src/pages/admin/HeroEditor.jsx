import { useState } from 'react';
import { useData } from '../../context/DataContext';
import './EditorShared.css';

export default function HeroEditor() {
  const { data, update } = useData();
  const [form, setForm] = useState(data.hero);
  const [saved, setSaved] = useState(false);
  const [editStatId, setEditStatId] = useState(null);
  const [statDraft, setStatDraft] = useState({});

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
    setSaved(false);
  }

  function setBtn(btn, key, val) {
    setForm((f) => ({ ...f, [btn]: { ...f[btn], [key]: val } }));
    setSaved(false);
  }

  function save() {
    update({ hero: form });
    setSaved(true);
  }

  /* Stats */
  function startEditStat(s) {
    setEditStatId(s.id);
    setStatDraft({ ...s });
  }

  function saveStat() {
    const stats = form.stats.map((s) => (s.id === editStatId ? { ...statDraft } : s));
    setForm((f) => ({ ...f, stats }));
    setEditStatId(null);
    setSaved(false);
  }

  function removeStat(id) {
    setForm((f) => ({ ...f, stats: f.stats.filter((s) => s.id !== id) }));
    setSaved(false);
  }

  function addStat() {
    const newId = Date.now();
    setForm((f) => ({ ...f, stats: [...f.stats, { id: newId, num: '', label: '' }] }));
    setEditStatId(newId);
    setStatDraft({ id: newId, num: '', label: '' });
    setSaved(false);
  }

  return (
    <div className="editor">
      <p className="editor__title">Hero Section</p>
      <p className="editor__subtitle">Landing page — name, bio, stats and call-to-action buttons.</p>

      <div className="form-grid" style={{ gap: 16 }}>
        <div className="field">
          <label>First Name</label>
          <input value={form.nameFirst} onChange={(e) => set('nameFirst', e.target.value)} />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input value={form.nameLast} onChange={(e) => set('nameLast', e.target.value)} />
        </div>
        <div className="field form-grid--full">
          <label>Eyebrow (disciplines line)</label>
          <input value={form.eyebrow} onChange={(e) => set('eyebrow', e.target.value)} />
        </div>
        <div className="field form-grid--full">
          <label>Role / Title</label>
          <input value={form.role} onChange={(e) => set('role', e.target.value)} />
        </div>
        <div className="field form-grid--full">
          <label>Bio</label>
          <textarea rows={3} value={form.bio} onChange={(e) => set('bio', e.target.value)} />
        </div>
      </div>

      {/* Buttons */}
      <div className="editor-section">
        <span className="editor-section__label">CTA Buttons</span>
        <div className="form-grid">
          <div className="field">
            <label>Primary Button — Text</label>
            <input value={form.primaryBtn.text} onChange={(e) => setBtn('primaryBtn', 'text', e.target.value)} />
          </div>
          <div className="field">
            <label>Primary Button — Link</label>
            <input value={form.primaryBtn.href} onChange={(e) => setBtn('primaryBtn', 'href', e.target.value)} />
          </div>
          <div className="field">
            <label>Ghost Button — Text</label>
            <input value={form.ghostBtn.text} onChange={(e) => setBtn('ghostBtn', 'text', e.target.value)} />
          </div>
          <div className="field">
            <label>Ghost Button — Link</label>
            <input value={form.ghostBtn.href} onChange={(e) => setBtn('ghostBtn', 'href', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="editor-section">
        <span className="editor-section__label">Stats</span>
        <div className="item-list">
          {form.stats.map((s) =>
            editStatId === s.id ? (
              <div key={s.id} className="inline-form">
                <div className="form-grid">
                  <div className="field">
                    <label>Number / Value</label>
                    <input value={statDraft.num} onChange={(e) => setStatDraft((d) => ({ ...d, num: e.target.value }))} placeholder="e.g. 20+" />
                  </div>
                  <div className="field">
                    <label>Label</label>
                    <input value={statDraft.label} onChange={(e) => setStatDraft((d) => ({ ...d, label: e.target.value }))} placeholder="e.g. Years of Practice" />
                  </div>
                </div>
                <div className="inline-form__actions">
                  <button className="btn btn--primary btn--sm" onClick={saveStat}>Save</button>
                  <button className="btn btn--ghost btn--sm" onClick={() => setEditStatId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div key={s.id} className="item-row">
                <div className="item-row__body">
                  <span className="item-row__primary">{s.num}</span>
                  <span className="item-row__secondary">{s.label}</span>
                </div>
                <div className="item-row__actions">
                  <button className="btn btn--ghost btn--sm" onClick={() => startEditStat(s)}>Edit</button>
                  <button className="btn btn--danger btn--sm" onClick={() => removeStat(s.id)}>Remove</button>
                </div>
              </div>
            )
          )}
        </div>
        <button className="btn btn--ghost btn--sm" onClick={addStat}>+ Add Stat</button>
      </div>

      <div style={{ marginTop: 32, display: 'flex', alignItems: 'center' }}>
        <button className="btn btn--primary" onClick={save}>Save Hero</button>
        {saved && <span className="editor__saved">✓ Saved</span>}
      </div>
    </div>
  );
}
