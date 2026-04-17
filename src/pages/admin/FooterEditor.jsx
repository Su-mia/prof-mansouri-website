import { useState } from 'react';
import { useData } from '../../context/DataContext';
import './EditorShared.css';

export default function FooterEditor() {
  const { data, update, reset } = useData();
  const [form, setForm] = useState(data.footer);
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  function save() {
    update({ footer: form });
    setSaved(true);
  }

  function handleReset() {
    if (confirmReset) {
      reset();
      setConfirmReset(false);
      setSaved(false);
      setForm({ name: 'Ahmed Mansouri', role: 'Dr.Eng · Architecture' });
    } else {
      setConfirmReset(true);
    }
  }

  return (
    <div className="editor">
      <p className="editor__title">Footer</p>
      <p className="editor__subtitle">Footer name, role line, and site-wide data reset.</p>

      <div className="form-grid">
        <div className="field">
          <label>Display Name</label>
          <input
            value={form.name}
            onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setSaved(false); }}
            placeholder="Ahmed Mansouri"
          />
        </div>
        <div className="field">
          <label>Role / Subtitle</label>
          <input
            value={form.role}
            onChange={(e) => { setForm((f) => ({ ...f, role: e.target.value })); setSaved(false); }}
            placeholder="Dr.Eng · Architecture"
          />
        </div>
      </div>

      <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="btn btn--primary" onClick={save}>Save Footer</button>
        {saved && <span className="editor__saved">✓ Saved</span>}
      </div>

      {/* Danger zone */}
      <div className="editor-section">
        <span className="editor-section__label">Danger Zone</span>
        <div style={{
          border: '1px solid #fcc', padding: '20px 24px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', gap: 16
        }}>
          <div>
            <p style={{ fontSize: '0.85rem', color: '#333', marginBottom: 4 }}>Reset all site data</p>
            <p style={{ fontSize: '0.75rem', color: '#aaa' }}>
              Restores every section to its original default content. This cannot be undone.
            </p>
          </div>
          <button
            className={`btn btn--danger${confirmReset ? '' : ''}`}
            onClick={handleReset}
            style={confirmReset ? { background: '#c0392b', color: '#fff', borderColor: '#c0392b' } : {}}
          >
            {confirmReset ? 'Confirm Reset' : 'Reset All Data'}
          </button>
        </div>
        {confirmReset && (
          <p style={{ fontSize: '0.72rem', color: '#c0392b', marginTop: 8 }}>
            Click "Confirm Reset" again to proceed, or{' '}
            <button
              onClick={() => setConfirmReset(false)}
              style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: 'inherit', textDecoration: 'underline' }}
            >
              cancel
            </button>.
          </p>
        )}
      </div>
    </div>
  );
}
