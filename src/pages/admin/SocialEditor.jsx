import { useState } from 'react';
import { useData } from '../../context/DataContext';
import './EditorShared.css';

const PLATFORMS = ['YouTube', 'Facebook', 'X', 'ResearchGate', 'Academia', 'Email', 'ORCID', 'LinkedIn', 'Instagram', 'Other'];

const BLANK = { id: 0, platform: 'YouTube', label: '', url: '' };

export default function SocialEditor() {
  const { data, update } = useData();
  const [links, setLinks] = useState(data.social || []);
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
    const exists = links.some((s) => s.id === draft.id);
    const next = exists
      ? links.map((s) => (s.id === draft.id ? draft : s))
      : [...links, draft];
    setLinks(next);
    update({ social: next });
    setEditId(null);
    setSaved(true);
  }

  function remove(id) {
    const next = links.filter((s) => s.id !== id);
    setLinks(next);
    update({ social: next });
    setSaved(true);
  }

  function set(k, v) { setDraft((d) => ({ ...d, [k]: v })); }

  return (
    <div className="editor">
      <p className="editor__title">Social Links</p>
      <p className="editor__subtitle">Links appear as icons in the sidebar navigation.</p>

      <div className="item-list">
        {links.map((s) =>
          editId === s.id ? (
            <div key={s.id} className="inline-form">
              <div className="form-grid">
                <div className="field">
                  <label>Platform</label>
                  <select value={draft.platform} onChange={(e) => set('platform', e.target.value)}>
                    {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Label</label>
                  <input value={draft.label} onChange={(e) => set('label', e.target.value)} placeholder="e.g. YouTube Channel 1" />
                </div>
                <div className="field form-grid--full">
                  <label>URL {draft.platform === 'Email' && '(address only)'}</label>
                  <input
                    value={draft.url}
                    onChange={(e) => set('url', e.target.value)}
                    placeholder={draft.platform === 'Email' ? 'name@example.com' : 'https://…'}
                    type={draft.platform === 'Email' ? 'email' : 'url'}
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
                <span className="item-row__primary">{s.label || s.platform}</span>
                <span className="item-row__secondary">
                  {s.platform}{s.url ? ` · ${s.url.replace(/^mailto:/, '')}` : ' · no URL set'}
                </span>
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
        <button className="btn btn--ghost btn--sm" onClick={startAdd}>+ Add Link</button>
        {saved && <span className="editor__saved">✓ Saved</span>}
      </div>
    </div>
  );
}
