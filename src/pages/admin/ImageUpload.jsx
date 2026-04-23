import { useRef, useState } from 'react';
import './ImageUpload.css';

/* Resize + compress an image file to a JPEG of at most maxW×maxH at the given quality (0–1). */
function compress(file, maxW = 900, maxH = 900, quality = 0.72) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      const ratio = Math.min(maxW / width, maxH / height, 1);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = url;
  });
}

export default function ImageUpload({ value, onChange, label = 'Image', aspectHint = '', maxW = 900, maxH = 900 }) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const compressed = await compress(file, maxW, maxH, 0.72);
      onChange(compressed);
    } finally {
      setLoading(false);
    }
    e.target.value = '';
  }

  return (
    <div className="img-upload">
      <span className="img-upload__label">{label}{aspectHint && <em> — {aspectHint}</em>}</span>
      <div className="img-upload__row">
        {value ? (
          <div className="img-upload__preview">
            <img src={value} alt="preview" />
            <button
              type="button"
              className="img-upload__remove"
              onClick={() => onChange(null)}
              aria-label="Remove image"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="img-upload__empty" onClick={() => !loading && inputRef.current?.click()}>
            {loading ? (
              <span className="img-upload__spinner" />
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="1" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>Click to upload</span>
              </>
            )}
          </div>
        )}
        <button
          type="button"
          className="img-upload__btn"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
        >
          {loading ? 'Compressing…' : value ? 'Replace' : 'Upload'}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFile}
      />
    </div>
  );
}
