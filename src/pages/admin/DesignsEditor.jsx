import { useState } from 'react';
import { useData } from '../../context/DataContext';
import ImageUpload from './ImageUpload';
import './EditorShared.css';

const BLANK = { id: 0, title: '', type: '', year: '', area: '', status: '', desc: '', aspect: 'normal', image: null };

export default function DesignsEditor() {
  const { data, update } = useData();
  const [projects, setProjects] = useState(data.designs);
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState({});
  const [saved, setSaved] = useState(false);

  function startEdit(p) { setEditId(p.id); setDraft({ ...p }); }

  function startAdd() {
    const id = Date.now();
    setDraft({ ...BLANK, id });
    setEditId(id); setSaved(false);
  }

  function saveDraft() {
    const exists = projects.some((p) => p.id === draft.id);
    const next = exists ? projects.map((p) => (p.id === draft.id ? draft : p)) : [...projects, draft];
    setProjects(next);
    update({ designs: next });
    setEditId(null); setSaved(true);
  }

  function remove(id) {
    const next = projects.filter((p) => p.id !== id);
    setProjects(next);
    update({ designs: next });
    setSaved(true);
  }

  function set(k, v) { setDraft((d) => ({ ...d, [k]: v })); }

  return (
    <div className="editor">
      <p className="editor__title">Architectural Designs</p>
      <p className="editor__subtitle">Portfolio projects — title, type, year, description.</p>

      <div className="item-list">
        {projects.map((p) =>
          editId === p.id ? (
            <div key={p.id} className="inline-form">
              <div className="form-grid">
                <div className="field form-grid--full">
                  <label>Title</label>
                  <input value={draft.title} onChange={(e) => set('title', e.target.value)} placeholder="Project title" />
                </div>
                <div className="field">
                  <label>Type</label>
                  <input value={draft.type} onChange={(e) => set('type', e.target.value)} placeholder="Cultural, Urban…" />
                </div>
                <div className="field">
                  <label>Year</label>
                  <input value={draft.year} onChange={(e) => set('year', e.target.value)} placeholder="2022" />
                </div>
                <div className="field">
                  <label>Area</label>
                  <input value={draft.area} onChange={(e) => set('area', e.target.value)} placeholder="12,400 m² or —" />
                </div>
                <div className="field">
                  <label>Status</label>
                  <input value={draft.status} onChange={(e) => set('status', e.target.value)} placeholder="Built, Competition…" />
                </div>
                <div className="field">
                  <label>Card Aspect</label>
                  <select value={draft.aspect} onChange={(e) => set('aspect', e.target.value)}>
                    <option value="normal">Normal</option>
                    <option value="wide">Wide (spans 2 cols)</option>
                    <option value="tall">Tall</option>
                  </select>
                </div>
                <div className="field form-grid--full">
                  <label>Description</label>
                  <textarea rows={3} value={draft.desc} onChange={(e) => set('desc', e.target.value)} />
                </div>
                <div className="form-grid--full">
                  <ImageUpload
                    value={draft.image || null}
                    onChange={(val) => set('image', val)}
                    label="Project image"
                    aspectHint="shown as card background"
                  />
                </div>
              </div>
              <div className="inline-form__actions">
                <button className="btn btn--primary btn--sm" onClick={saveDraft}>Save</button>
                <button className="btn btn--ghost btn--sm" onClick={() => setEditId(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div key={p.id} className="item-row">
              <div className="item-row__body">
                <span className="item-row__primary">{p.title}</span>
                <span className="item-row__secondary">{p.type} · {p.year} · {p.status}</span>
              </div>
              <div className="item-row__actions">
                <button className="btn btn--ghost btn--sm" onClick={() => startEdit(p)}>Edit</button>
                <button className="btn btn--danger btn--sm" onClick={() => remove(p.id)}>Remove</button>
              </div>
            </div>
          )
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
        <button className="btn btn--ghost btn--sm" onClick={startAdd}>+ Add Project</button>
        {saved && <span className="editor__saved">✓ Saved</span>}
      </div>
    </div>
  );
}
