import { useEffect, useState } from 'react';
import type { Shot } from '../data';

interface Props {
  title: string;
  shots: Shot[];
  start?: number;
  onClose: () => void;
}

export function Lightbox({ title, shots, start = 0, onClose }: Props) {
  const [index, setIndex] = useState(start);
  const count = shots.length;
  const shot = shots[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % count);
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [count, onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} screenshots`} onClick={onClose}>
      <figure onClick={e => e.stopPropagation()}>
        <img src={shot.src} alt={shot.alt} />
        <figcaption>
          <span>{title}{count > 1 ? ` · ${index + 1} of ${count}` : ''}</span>
          <span className="lightbox-actions">
            {count > 1 && (
              <>
                <button type="button" onClick={() => setIndex(i => (i - 1 + count) % count)} aria-label="Previous screenshot">←</button>
                <button type="button" onClick={() => setIndex(i => (i + 1) % count)} aria-label="Next screenshot">→</button>
              </>
            )}
            <button type="button" onClick={onClose} aria-label="Close" autoFocus>Close</button>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
