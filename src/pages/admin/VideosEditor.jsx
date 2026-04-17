import { useState } from 'react';
import { useData } from '../../context/DataContext';
import './EditorShared.css';

const BLANK = { id: 0, title: '', duration: '', type: '', year: '', venue: '', desc: '' };

export default function VideosEditor() {
  const { data, update } = useData();
  const [videos, setVideos] = useState(data.videos);
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState({});
  const [saved, setSaved] = useState(false);

  function startEdit(v) { setEditId(v.id); setDraft({ ...v }); }

  function startAdd() {
    const id = Date.now();
    setDraft({ ...BLANK, id });
    setEditId(id); setSaved(false);
  }

  function saveDraft() {
    const exists = videos.some((v) => v.id === draft.id);
    const next = exists ? videos.map((v) => (v.id === draft.id ? draft : v)) : [...videos, draft];
    setVideos(next);
    update({ videos: next });
    setEditId(null); setSaved(true);
  }

  function remove(id) {
    const next = videos.filter((v) => v.id !== id);
    setVideos(next);
    update({ videos: next });
    setSaved(true);
  }

  function set(k, v) { setDraft((d) => ({ ...d, [k]: v })); }

  return (
    <div className="editor">
      <p className="editor__title">Videos</p>
      <p className="editor__subtitle">Lectures, workshops, and recorded media.</p>

      <div className="item-list">
        {videos.map((v) =>
          editId === v.id ? (
            <div key={v.id} className="inline-form">
              <div className="form-grid">
                <div className="field form-grid--full">
                  <label>Title</label>
                  <input value={draft.title} onChange={(e) => set('title', e.target.value)} placeholder="Video title" />
                </div>
                <div className="field">
                  <label>Type</label>
                  <input value={draft.type} onChange={(e) => set('type', e.target.value)} placeholder="Lecture, Workshop…" />
                </div>
                <div className="field">
                  <label>Year</label>
                  <input value={draft.year} onChange={(e) => set('year', e.target.value)} placeholder="2024" />
                </div>
                <div className="field">
                  <label>Duration</label>
                  <input value={draft.duration} onChange={(e) => set('duration', e.target.value)} placeholder="52:14" />
                </div>
                <div className="field">
                  <label>Venue / Platform</label>
                  <input value={draft.venue} onChange={(e) => set('venue', e.target.value)} placeholder="Institution or event" />
                </div>
                <div className="field form-grid--full">
                  <label>Description</label>
                  <textarea rows={3} value={draft.desc} onChange={(e) => set('desc', e.target.value)} />
                </div>
              </div>
              <div className="inline-form__actions">
                <button className="btn btn--primary btn--sm" onClick={saveDraft}>Save</button>
                <button className="btn btn--ghost btn--sm" onClick={() => setEditId(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div key={v.id} className="item-row">
              <div className="item-row__body">
                <span className="item-row__primary">{v.title}</span>
                <span className="item-row__secondary">{v.type} · {v.year} · {v.duration}</span>
              </div>
              <div className="item-row__actions">
                <button className="btn btn--ghost btn--sm" onClick={() => startEdit(v)}>Edit</button>
                <button className="btn btn--danger btn--sm" onClick={() => remove(v.id)}>Remove</button>
              </div>
            </div>
          )
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
        <button className="btn btn--ghost btn--sm" onClick={startAdd}>+ Add Video</button>
        {saved && <span className="editor__saved">✓ Saved</span>}
      </div>
    </div>
  );
}
