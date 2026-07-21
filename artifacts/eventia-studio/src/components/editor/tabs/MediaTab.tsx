import { useRef } from 'react';
import type { Block } from '@/types';

interface Props {
  block: Block;
  onUpdate: (updater: (b: Block) => Block) => void;
}

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const MUTED = 'rgba(42,31,24,0.45)';
const BORDER = 'rgba(42,31,24,0.12)';
const sans = "'Jost', sans-serif";

function readFile(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result as string);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

function UploadZone({ label, accept, icon, onFiles, multiple }: {
  label: string; accept: string; icon: string; multiple?: boolean;
  onFiles: (items: { url: string; name: string }[]) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const results = await Promise.all(files.map(async f => ({ url: await readFile(f), name: f.name })));
    onFiles(results);
    e.target.value = '';
  };
  return (
    <>
      <input ref={ref} type="file" accept={accept} multiple={multiple} onChange={handleChange} style={{ display: 'none' }} />
      <div className="upload-zone" onClick={() => ref.current?.click()}>
        <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
        <div style={{ fontSize: 11, color: MUTED, letterSpacing: 0.5 }}>{label}</div>
        <div style={{ fontSize: 10, color: 'rgba(42,31,24,0.3)', marginTop: 3 }}>
          {multiple ? 'Sélection multiple possible' : 'Cliquer pour choisir'}
        </div>
      </div>
    </>
  );
}

function ImageGrid({ urls, onRemove, size = 'medium' }: { urls: string[]; onRemove: (i: number) => void; size?: 'small' | 'medium' }) {
  if (urls.length === 0) return null;
  const cols = size === 'small' ? 4 : 3;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 4, marginTop: 8 }}>
      {urls.map((url, i) => (
        <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 4, overflow: 'hidden', background: '#f0ebe4' }}>
          <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <button onClick={() => onRemove(i)} style={{
            position: 'absolute', top: 2, right: 2, background: 'rgba(255,255,255,0.9)',
            border: 'none', color: TEXT, width: 18, height: 18, cursor: 'pointer',
            fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 3,
          }}>✕</button>
        </div>
      ))}
    </div>
  );
}

export default function MediaTab({ block, onUpdate }: Props) {
  const { type, media } = block;

  const addImages = (items: { url: string }[]) =>
    onUpdate(b => ({ ...b, media: { ...b.media, images: [...b.media.images, ...items.map(i => i.url)] } }));
  const removeImage = (i: number) =>
    onUpdate(b => ({ ...b, media: { ...b.media, images: b.media.images.filter((_, idx) => idx !== i) } }));
  const addIcons = (items: { url: string }[]) =>
    onUpdate(b => ({ ...b, media: { ...b.media, icons: [...(b.media.icons ?? []), ...items.map(i => i.url)] } }));
  const removeIcon = (i: number) =>
    onUpdate(b => ({ ...b, media: { ...b.media, icons: (b.media.icons ?? []).filter((_, idx) => idx !== i) } }));
  const addAudio = (items: { url: string }[]) =>
    onUpdate(b => ({ ...b, media: { ...b.media, audio: items[0]?.url } }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Photos (not for video_intro) */}
      {type !== 'video_intro' && (
        <div>
          <label className="field-label">Photos ({media.images.length})</label>
          <UploadZone
            label="Charger des photos"
            accept="image/jpeg,image/png,image/webp"
            icon="🖼️"
            multiple
            onFiles={addImages}
          />
          <ImageGrid urls={media.images} onRemove={removeImage} />
        </div>
      )}

      {/* Video intro hint */}
      {type === 'video_intro' && (
        <div style={{ padding: 14, background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)', borderRadius: 8 }}>
          <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.6, marginBottom: 8 }}>
            Pour la vidéo d'intro, renseignez l'URL Cloudinary dans l'onglet <strong style={{ color: GOLD }}>Contenu</strong>.
          </div>
          {media.video && (
            <div style={{ fontSize: 10, color: MUTED, wordBreak: 'break-all' }}>
              ✓ Vidéo : {media.video.slice(0, 50)}…
            </div>
          )}
        </div>
      )}

      {/* Icons / frames */}
      <div>
        <label className="field-label">Icônes & cadres ({(media.icons ?? []).length})</label>
        <UploadZone
          label="Charger des icônes / cadres (PNG, SVG)"
          accept="image/png,image/svg+xml,image/webp"
          icon="◆"
          multiple
          onFiles={addIcons}
        />
        <ImageGrid urls={media.icons ?? []} onRemove={removeIcon} size="small" />
      </div>

      {/* Audio — only for audio_book */}
      {type === 'audio_book' && (
        <div>
          <label className="field-label">Fichier audio (MP3, AAC)</label>
          <UploadZone
            label="Charger un fichier audio"
            accept="audio/mpeg,audio/mp4,audio/aac,audio/wav"
            icon="🎙️"
            onFiles={addAudio}
          />
          {media.audio && (
            <div style={{ marginTop: 8 }}>
              <audio controls src={media.audio} style={{ width: '100%', height: 34 }} />
              <button onClick={() => onUpdate(b => ({ ...b, media: { ...b.media, audio: undefined } }))} style={{ marginTop: 6, background: 'none', border: 'none', color: MUTED, cursor: 'pointer', fontSize: 11, fontFamily: sans }}>
                Supprimer l'audio
              </button>
            </div>
          )}
        </div>
      )}

      {/* Storage note */}
      <div style={{ padding: 12, background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 8 }}>
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: GOLD, marginBottom: 6 }}>ℹ Stockage</div>
        <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.6 }}>
          Les médias sont chargés en mémoire pour l'aperçu. La connexion à Supabase Storage sera configurée pour la persistance complète.
        </div>
      </div>
    </div>
  );
}
