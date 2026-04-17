import { useState } from 'react';
import { useData } from '../../context/DataContext';
import './EditorShared.css';

const BLANK_EDU = { id: 0, degree: '', field: '', institution: '', year: '' };
const BLANK_POS = { id: 0, role: '', org: '', period: '' };

function ArraySection({ label, items, editId, setEditId, draft, setDraft, blankDraft, fields, onSave, onRemove, onAdd }) {
  return (
    <div className="editor-section">
      <span className="editor-section__label">{label}</span>
      <div className="item-list">
        {items.map((item) =>
          editId === item.id ? (
            <div key={item.id} className="inline-form">
              <div className="form-grid">
                {fields.map((f) => (
                  <div key={f.key} className={`field${f.full ? ' form-grid--full' : ''}`}>
                    <label>{f.label}</label>
                    <input value={draft[f.key] || ''} onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))} placeholder={f.placeholder || ''} />
                  </div>
                ))}
              </div>
              <div className="inline-form__actions">
                <button className="btn btn--primary btn--sm" onClick={onSave}>Save</button>
                <button className="btn btn--ghost btn--sm" onClick={() => setEditId(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div key={item.id} className="item-row">
              <div className="item-row__body">
                <span className="item-row__primary">{item[fields[0].key]}</span>
                <span className="item-row__secondary">{fields.slice(1).map((f) => item[f.key]).filter(Boolean).join(' · ')}</span>
              </div>
              <div className="item-row__actions">
                <button className="btn btn--ghost btn--sm" onClick={() => { setEditId(item.id); setDraft({ ...item }); }}>Edit</button>
                <button className="btn btn--danger btn--sm" onClick={() => onRemove(item.id)}>Remove</button>
              </div>
            </div>
          )
        )}
      </div>
      <button className="btn btn--ghost btn--sm" onClick={onAdd}>+ Add</button>
    </div>
  );
}

export default function AboutEditor() {
  const { data, update } = useData();
  const [about, setAbout] = useState(data.about);
  const [saved, setSaved] = useState(false);

  const [editEduId, setEditEduId] = useState(null);
  const [eduDraft, setEduDraft] = useState({});
  const [editPosId, setEditPosId] = useState(null);
  const [posDraft, setPosDraft] = useState({});
  const [skillsStr, setSkillsStr] = useState(data.about.skills.join(', '));

  function save() {
    const parsed = skillsStr.split(',').map((s) => s.trim()).filter(Boolean);
    const next = { ...about, skills: parsed };
    update({ about: next });
    setSaved(true);
  }

  /* Education */
  function saveEdu() {
    const list = about.education.some((e) => e.id === eduDraft.id)
      ? about.education.map((e) => (e.id === eduDraft.id ? eduDraft : e))
      : [...about.education, eduDraft];
    setAbout((a) => ({ ...a, education: list }));
    setEditEduId(null); setSaved(false);
  }

  function removeEdu(id) {
    setAbout((a) => ({ ...a, education: a.education.filter((e) => e.id !== id) }));
    setSaved(false);
  }

  function addEdu() {
    const id = Date.now();
    setEduDraft({ ...BLANK_EDU, id });
    setEditEduId(id); setSaved(false);
  }

  /* Positions */
  function savePos() {
    const list = about.positions.some((p) => p.id === posDraft.id)
      ? about.positions.map((p) => (p.id === posDraft.id ? posDraft : p))
      : [...about.positions, posDraft];
    setAbout((a) => ({ ...a, positions: list }));
    setEditPosId(null); setSaved(false);
  }

  function removePos(id) {
    setAbout((a) => ({ ...a, positions: a.positions.filter((p) => p.id !== id) }));
    setSaved(false);
  }

  function addPos() {
    const id = Date.now();
    setPosDraft({ ...BLANK_POS, id });
    setEditPosId(id); setSaved(false);
  }

  return (
    <div className="editor">
      <p className="editor__title">About / CV</p>
      <p className="editor__subtitle">Education history, academic positions, and skills.</p>

      <ArraySection
        label="Education"
        items={about.education}
        editId={editEduId} setEditId={setEditEduId}
        draft={eduDraft} setDraft={setEduDraft}
        blankDraft={BLANK_EDU}
        fields={[
          { key: 'degree', label: 'Degree', placeholder: 'e.g. Doctor of Engineering' },
          { key: 'year', label: 'Year', placeholder: '2005' },
          { key: 'field', label: 'Field', placeholder: 'Architecture' },
          { key: 'institution', label: 'Institution', placeholder: 'University name' },
        ]}
        onSave={saveEdu} onRemove={removeEdu} onAdd={addEdu}
      />

      <ArraySection
        label="Academic Positions"
        items={about.positions}
        editId={editPosId} setEditId={setEditPosId}
        draft={posDraft} setDraft={setPosDraft}
        blankDraft={BLANK_POS}
        fields={[
          { key: 'role', label: 'Role', placeholder: 'e.g. Full Professor' },
          { key: 'period', label: 'Period', placeholder: '2015 – Present' },
          { key: 'org', label: 'Organisation', placeholder: 'Department / Institute', full: true },
        ]}
        onSave={savePos} onRemove={removePos} onAdd={addPos}
      />

      <div className="editor-section">
        <span className="editor-section__label">Skills / Expertise (comma-separated)</span>
        <div className="field">
          <textarea
            rows={3}
            value={skillsStr}
            onChange={(e) => { setSkillsStr(e.target.value); setSaved(false); }}
            placeholder="Architectural Theory, Sustainable Design, …"
          />
        </div>
      </div>

      <div style={{ marginTop: 32, display: 'flex', alignItems: 'center' }}>
        <button className="btn btn--primary" onClick={save}>Save About</button>
        {saved && <span className="editor__saved">✓ Saved</span>}
      </div>
    </div>
  );
}
