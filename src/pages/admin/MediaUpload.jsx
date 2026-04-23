import { useRef, useState } from 'react';
import { saveBlob, deleteBlob } from '../../utils/mediaDB';
import './ImageUpload.css';
import './MediaUpload.css';

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

export default function MediaUpload({ thumb, videoKey, onThumbChange, onVideoChange }) {
  const imgRef = useRef(null);
  const vidRef = useRef(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [vidLoading, setVidLoading] = useState(false);
  const [vidName, setVidName] = useState('');

  async function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImgLoading(true);
    try {
      const compressed = await compress(file);
      onThumbChange(compressed);
    } finally {
      setImgLoading(false);
    }
    e.target.value = '';
  }

  async function handleVideo(e) {
    const file = e.target.files[0];
    if (!file) return;
    setVidLoading(true);
    try {
      if (videoKey) await deleteBlob(videoKey);
      const key = `vid_${Date.now()}`;
      await saveBlob(key, file);
      setVidName(file.name);
      onVideoChange(key);
    } finally {
      setVidLoading(false);
    }
    e.target.value = '';
  }

  async function removeVideo() {
    if (videoKey) await deleteBlob(videoKey);
    setVidName('');
    onVideoChange(null);
  }

  return (
    <div className="media-upload">
      {/* Thumbnail */}
      <div className="img-upload">
        <span className="img-upload__label">Thumbnail <em>— 16:9 recommended</em></span>
        <div className="img-upload__row">
          {thumb ? (
            <div className="img-upload__preview">
              <img src={thumb} alt="preview" />
              <button type="button" className="img-upload__remove" onClick={() => onThumbChange(null)} aria-label="Remove thumbnail">✕</button>
            </div>
          ) : (
            <div className="img-upload__empty" onClick={() => !imgLoading && imgRef.current?.click()}>
              {imgLoading ? <span className="img-upload__spinner" /> : (
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
          <button type="button" className="img-upload__btn" onClick={() => imgRef.current?.click()} disabled={imgLoading}>
            {imgLoading ? 'Compressing…' : thumb ? 'Replace' : 'Upload'}
          </button>
        </div>
        <input ref={imgRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImage} />
      </div>

      {/* Video file */}
      <div className="media-upload__video">
        <span className="img-upload__label">Video File <em>— mp4, webm, mov…</em></span>
        <div className="img-upload__row">
          {videoKey ? (
            <div className="media-upload__vid-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>{vidName || 'Video uploaded'}</span>
              <button type="button" className="img-upload__remove" style={{ position: 'static', marginLeft: 4 }} onClick={removeVideo} aria-label="Remove video">✕</button>
            </div>
          ) : (
            <div className="img-upload__empty" style={{ width: 140 }} onClick={() => !vidLoading && vidRef.current?.click()}>
              {vidLoading ? <span className="img-upload__spinner" /> : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Click to upload</span>
                </>
              )}
            </div>
          )}
          <button type="button" className="img-upload__btn" onClick={() => vidRef.current?.click()} disabled={vidLoading}>
            {vidLoading ? 'Saving…' : videoKey ? 'Replace' : 'Upload'}
          </button>
        </div>
        <input ref={vidRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={handleVideo} />
      </div>
    </div>
  );
}
