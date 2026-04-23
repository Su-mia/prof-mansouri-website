import { useState } from 'react';
import { useData } from '../../context/DataContext';
import ImageUpload from './ImageUpload';
import './EditorShared.css';

const BLANK = { id: 0, name: '', role: '', since: '', country: '', logo: null };

export default function SocietiesEditor() {
  const { data, update } = useData();
  const [societies, setSocieties] = useState(data.societies || []);
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState({});
  const [saved, setSaved] = useState(false);

  function startEdit(s) { setEditId(s.id); setDraft({ ...s }); }

  function startAdd() {
    const id = Date.now();
    setDraft({ ...BLANK, id });
    setEditId(id);
    setSaved(false);
  }

  function saveDraft() {
    const exists = societies.some((s) => s.id === draft.id);
    const next = exists
      ? societies.map((s) => (s.id === draft.id ? draft : s))
      : [...societies, draft];
    setSocieties(next);
    update({ societies: next });
    setEditId(null);
    setSaved(true);
  }

  function remove(id) {
    const next = societies.filter((s) => s.id !== id);
    setSocieties(next);
    update({ societies: next });
    setSaved(true);
  }

  function set(k, v) { setDraft((d) => ({ ...d, [k]: v })); }

  return (
    <div className="editor">
      <p className="editor__title">Scientific Societies</p>
      <p className="editor__subtitle">Professional and academic affiliations.</p>

      <div className="item-list">
        {societies.map((s) =>
          editId === s.id ? (
            <div key={s.id} className="inline-form">
              <div className="form-grid">
                <div className="field form-grid--full">
                  <label>Society Name</label>
                  <input value={draft.name} onChange={(e) => set('name', e.target.value)} placeholder="Full society name" />
                </div>
                <div className="field">
                  <label>Role / Membership</label>
                  <input value={draft.role} onChange={(e) => set('role', e.target.value)} placeholder="Member, Fellow…" />
                </div>
                <div className="field">
                  <label>Since (year)</label>
                  <input value={draft.since} onChange={(e) => set('since', e.target.value)} placeholder="2010" />
                </div>
                <div className="field">
                  <label>Country / Scope</label>
                  <input value={draft.country} onChange={(e) => set('country', e.target.value)} placeholder="Algeria, International…" />
                </div>
                <div className="form-grid--full">
                  <ImageUpload
                    value={draft.logo}
                    onChange={(val) => set('logo', val)}
                    label="Logo"
                    aspectHint="square preferred"
                    maxW={200}
                    maxH={200}
                  />
                </div>
              </div>
              <div className="inline-form__actions">
                <button className="btn btn--primary btn--sm" onClick={saveDraft}>Save</button>
                <button className="btn btn--ghost btn--sm" onClick={() => setEditId(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div key={s.id} className="item-row">
              <div className="item-row__body">
                <span className="item-row__primary">{s.name}</span>
                <span className="item-row__secondary">{s.role}{s.since ? ` · Since ${s.since}` : ''}{s.country ? ` · ${s.country}` : ''}</span>
              </div>
              <div className="item-row__actions">
                <button className="btn btn--ghost btn--sm" onClick={() => startEdit(s)}>Edit</button>
                <button className="btn btn--danger btn--sm" onClick={() => remove(s.id)}>Remove</button>
              </div>
            </div>
          )
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
        <button className="btn btn--ghost btn--sm" onClick={startAdd}>+ Add Society</button>
        {saved && <span className="editor__saved">✓ Saved</span>}
      </div>
    </div>
  );
}
