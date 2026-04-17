import { useState } from 'react';
import { useData } from '../../context/DataContext';
import './EditorShared.css';

const BLANK = { id: 0, year: '', title: '', journal: '', tags: [], abstract: '', doi: '' };

export default function ResearchEditor() {
  const { data, update } = useData();
  const [papers, setPapers] = useState(data.research);
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState({});
  const [tagsStr, setTagsStr] = useState('');
  const [saved, setSaved] = useState(false);

  function startEdit(p) {
    setEditId(p.id);
    setDraft({ ...p });
    setTagsStr(p.tags.join(', '));
  }

  function startAdd() {
    const id = Date.now();
    setDraft({ ...BLANK, id });
    setTagsStr('');
    setEditId(id);
    setSaved(false);
  }

  function saveDraft() {
    const parsed = { ...draft, tags: tagsStr.split(',').map((t) => t.trim()).filter(Boolean) };
    const exists = papers.some((p) => p.id === parsed.id);
    const next = exists ? papers.map((p) => (p.id === parsed.id ? parsed : p)) : [...papers, parsed];
    setPapers(next);
    update({ research: next });
    setEditId(null);
    setSaved(true);
  }

  function remove(id) {
    const next = papers.filter((p) => p.id !== id);
    setPapers(next);
    update({ research: next });
    setSaved(true);
  }

  function set(k, v) { setDraft((d) => ({ ...d, [k]: v })); }

  return (
    <div className="editor">
      <p className="editor__title">Research & Papers</p>
      <p className="editor__subtitle">Add, edit, or remove publications.</p>

      <div className="item-list">
        {papers.map((p) =>
          editId === p.id ? (
            <div key={p.id} className="inline-form">
              <div className="form-grid">
                <div className="field">
                  <label>Year</label>
                  <input value={draft.year} onChange={(e) => set('year', e.target.value)} placeholder="2024" />
                </div>
                <div className="field">
                  <label>Tags (comma-separated)</label>
                  <input value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} placeholder="Theory, Phenomenology" />
                </div>
                <div className="field form-grid--full">
                  <label>Title</label>
                  <input value={draft.title} onChange={(e) => set('title', e.target.value)} placeholder="Paper title" />
                </div>
                <div className="field form-grid--full">
                  <label>Journal / Conference</label>
                  <input value={draft.journal} onChange={(e) => set('journal', e.target.value)} placeholder="Journal name" />
                </div>
                <div className="field form-grid--full">
                  <label>Abstract</label>
                  <textarea rows={4} value={draft.abstract} onChange={(e) => set('abstract', e.target.value)} />
                </div>
                <div className="field form-grid--full">
                  <label>DOI / URL</label>
                  <input value={draft.doi} onChange={(e) => set('doi', e.target.value)} placeholder="https://doi.org/…" />
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
                <span className="item-row__primary" style={{ whiteSpace: 'normal' }}>{p.title}</span>
                <span className="item-row__secondary">{p.year} · {p.journal}</span>
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
        <button className="btn btn--ghost btn--sm" onClick={startAdd}>+ Add Paper</button>
        {saved && <span className="editor__saved">✓ Saved</span>}
      </div>
    </div>
  );
}
