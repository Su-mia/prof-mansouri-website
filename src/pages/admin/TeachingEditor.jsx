import { useState } from 'react';
import { useData } from '../../context/DataContext';
import './EditorShared.css';

const BLANK_COURSE = { id: 0, code: '', title: '', level: '', semester: '', desc: '', materials: [] };
const BLANK_THESIS = { id: 0, title: '', student: '', year: '', level: 'Master' };

export default function TeachingEditor() {
  const { data, update } = useData();
  const [teaching, setTeaching] = useState(data.teaching);
  const [editCourseId, setEditCourseId] = useState(null);
  const [courseDraft, setCourseDraft] = useState({});
  const [materialsStr, setMaterialsStr] = useState('');
  const [editThesisId, setEditThesisId] = useState(null);
  const [thesisDraft, setThesisDraft] = useState({});
  const [saved, setSaved] = useState(false);

  function persist(next) { setTeaching(next); update({ teaching: next }); setSaved(true); }

  /* Courses */
  function startEditCourse(c) { setEditCourseId(c.id); setCourseDraft({ ...c }); setMaterialsStr(c.materials.join(', ')); }
  function startAddCourse() {
    const id = Date.now();
    setCourseDraft({ ...BLANK_COURSE, id });
    setMaterialsStr(''); setEditCourseId(id); setSaved(false);
  }
  function saveCourse() {
    const parsed = { ...courseDraft, materials: materialsStr.split(',').map((m) => m.trim()).filter(Boolean) };
    const exists = teaching.courses.some((c) => c.id === parsed.id);
    const courses = exists ? teaching.courses.map((c) => (c.id === parsed.id ? parsed : c)) : [...teaching.courses, parsed];
    persist({ ...teaching, courses });
    setEditCourseId(null);
  }
  function removeCourse(id) { persist({ ...teaching, courses: teaching.courses.filter((c) => c.id !== id) }); }

  /* Theses */
  function startEditThesis(t) { setEditThesisId(t.id); setThesisDraft({ ...t }); }
  function startAddThesis() {
    const id = Date.now();
    setThesisDraft({ ...BLANK_THESIS, id });
    setEditThesisId(id); setSaved(false);
  }
  function saveThesis() {
    const exists = teaching.theses.some((t) => t.id === thesisDraft.id);
    const theses = exists ? teaching.theses.map((t) => (t.id === thesisDraft.id ? thesisDraft : t)) : [...teaching.theses, thesisDraft];
    persist({ ...teaching, theses });
    setEditThesisId(null);
  }
  function removeThesis(id) { persist({ ...teaching, theses: teaching.theses.filter((t) => t.id !== id) }); }

  const setC = (k, v) => setCourseDraft((d) => ({ ...d, [k]: v }));
  const setT = (k, v) => setThesisDraft((d) => ({ ...d, [k]: v }));

  return (
    <div className="editor">
      <p className="editor__title">Teaching Materials</p>
      <p className="editor__subtitle">Courses and supervised theses.</p>

      {/* Courses */}
      <div className="editor-section" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
        <span className="editor-section__label">Courses</span>
        <div className="item-list">
          {teaching.courses.map((c) =>
            editCourseId === c.id ? (
              <div key={c.id} className="inline-form">
                <div className="form-grid">
                  <div className="field">
                    <label>Code</label>
                    <input value={courseDraft.code} onChange={(e) => setC('code', e.target.value)} placeholder="ARCH 301" />
                  </div>
                  <div className="field">
                    <label>Semester</label>
                    <input value={courseDraft.semester} onChange={(e) => setC('semester', e.target.value)} placeholder="Autumn" />
                  </div>
                  <div className="field form-grid--full">
                    <label>Title</label>
                    <input value={courseDraft.title} onChange={(e) => setC('title', e.target.value)} placeholder="Course title" />
                  </div>
                  <div className="field">
                    <label>Level</label>
                    <input value={courseDraft.level} onChange={(e) => setC('level', e.target.value)} placeholder="Undergraduate · Year 3" />
                  </div>
                  <div className="field">
                    <label>Materials (comma-separated)</label>
                    <input value={materialsStr} onChange={(e) => setMaterialsStr(e.target.value)} placeholder="Slides, Reading list…" />
                  </div>
                  <div className="field form-grid--full">
                    <label>Description</label>
                    <textarea rows={3} value={courseDraft.desc} onChange={(e) => setC('desc', e.target.value)} />
                  </div>
                </div>
                <div className="inline-form__actions">
                  <button className="btn btn--primary btn--sm" onClick={saveCourse}>Save</button>
                  <button className="btn btn--ghost btn--sm" onClick={() => setEditCourseId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div key={c.id} className="item-row">
                <div className="item-row__body">
                  <span className="item-row__primary">{c.code} — {c.title}</span>
                  <span className="item-row__secondary">{c.level} · {c.semester}</span>
                </div>
                <div className="item-row__actions">
                  <button className="btn btn--ghost btn--sm" onClick={() => startEditCourse(c)}>Edit</button>
                  <button className="btn btn--danger btn--sm" onClick={() => removeCourse(c.id)}>Remove</button>
                </div>
              </div>
            )
          )}
        </div>
        <button className="btn btn--ghost btn--sm" onClick={startAddCourse}>+ Add Course</button>
      </div>

      {/* Theses */}
      <div className="editor-section">
        <span className="editor-section__label">Supervised Theses</span>
        <div className="item-list">
          {teaching.theses.map((t) =>
            editThesisId === t.id ? (
              <div key={t.id} className="inline-form">
                <div className="form-grid">
                  <div className="field form-grid--full">
                    <label>Thesis Title</label>
                    <input value={thesisDraft.title} onChange={(e) => setT('title', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Student</label>
                    <input value={thesisDraft.student} onChange={(e) => setT('student', e.target.value)} placeholder="M. Benali" />
                  </div>
                  <div className="field">
                    <label>Year</label>
                    <input value={thesisDraft.year} onChange={(e) => setT('year', e.target.value)} placeholder="2024" />
                  </div>
                  <div className="field">
                    <label>Level</label>
                    <select value={thesisDraft.level} onChange={(e) => setT('level', e.target.value)}>
                      <option value="Master">Master</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                </div>
                <div className="inline-form__actions">
                  <button className="btn btn--primary btn--sm" onClick={saveThesis}>Save</button>
                  <button className="btn btn--ghost btn--sm" onClick={() => setEditThesisId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div key={t.id} className="item-row">
                <div className="item-row__body">
                  <span className="item-row__primary">{t.title}</span>
                  <span className="item-row__secondary">{t.level} · {t.student} · {t.year}</span>
                </div>
                <div className="item-row__actions">
                  <button className="btn btn--ghost btn--sm" onClick={() => startEditThesis(t)}>Edit</button>
                  <button className="btn btn--danger btn--sm" onClick={() => removeThesis(t.id)}>Remove</button>
                </div>
              </div>
            )
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
          <button className="btn btn--ghost btn--sm" onClick={startAddThesis}>+ Add Thesis</button>
          {saved && <span className="editor__saved">✓ Saved</span>}
        </div>
      </div>
    </div>
  );
}
