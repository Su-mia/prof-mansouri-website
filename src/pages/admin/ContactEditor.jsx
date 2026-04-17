import { useState } from 'react';
import { useData } from '../../context/DataContext';
import './EditorShared.css';

const BLANK = { id: 0, label: '', value: '' };

export default function ContactEditor() {
  const { data, update } = useData();
  const [items, setItems] = useState(data.contact.items);
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState({});
  const [saved, setSaved] = useState(false);

  function persist(next) {
    setItems(next);
    update({ contact: { items: next } });
    setSaved(true);
  }

  function startEdit(item) { setEditId(item.id); setDraft({ ...item }); }

  function startAdd() {
    const id = Date.now();
    setDraft({ ...BLANK, id });
    setEditId(id); setSaved(false);
  }

  function saveDraft() {
    const exists = items.some((i) => i.id === draft.id);
    const next = exists ? items.map((i) => (i.id === draft.id ? draft : i)) : [...items, draft];
    persist(next);
    setEditId(null);
  }

  function remove(id) { persist(items.filter((i) => i.id !== id)); }

  return (
    <div className="editor">
      <p className="editor__title">Contact Information</p>
      <p className="editor__subtitle">Contact details displayed on the public contact section.</p>

      <div className="item-list">
        {items.map((item) =>
          editId === item.id ? (
            <div key={item.id} className="inline-form">
              <div className="form-grid">
                <div className="field">
                  <label>Label</label>
                  <input value={draft.label} onChange={(e) => setDraft((d) => ({ ...d, label: e.target.value }))} placeholder="Email, Office…" />
                </div>
                <div className="field">
                  <label>Value</label>
                  <input value={draft.value} onChange={(e) => setDraft((d) => ({ ...d, value: e.target.value }))} placeholder="a.mansouri@university.dz" />
                </div>
              </div>
              <div className="inline-form__actions">
                <button className="btn btn--primary btn--sm" onClick={saveDraft}>Save</button>
                <button className="btn btn--ghost btn--sm" onClick={() => setEditId(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div key={item.id} className="item-row">
              <div className="item-row__body">
                <span className="item-row__primary">{item.label}</span>
                <span className="item-row__secondary">{item.value}</span>
              </div>
              <div className="item-row__actions">
                <button className="btn btn--ghost btn--sm" onClick={() => startEdit(item)}>Edit</button>
                <button className="btn btn--danger btn--sm" onClick={() => remove(item.id)}>Remove</button>
              </div>
            </div>
          )
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
        <button className="btn btn--ghost btn--sm" onClick={startAdd}>+ Add Item</button>
        {saved && <span className="editor__saved">✓ Saved</span>}
      </div>
    </div>
  );
}
