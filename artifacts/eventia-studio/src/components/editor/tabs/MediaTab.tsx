import { useRef } from 'react';
import type { Block, BlockType } from '@/types';

interface Props {
  block: Block;
  onUpdate: (updater: (b: Block) => Block) => void;
}

const GOLD = '#C9A96E';
const sans = "'Jost', sans-serif";
const serif = "'Cormorant Garamond', serif";

function readFile(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result as string);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

function UploadButton({ label, accept, onFile, icon }: {
  label: string; accept: string; icon: string;
  onFile: (dataUrl: string, name: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await readFile(file);
    onFile(url, file.name);
    e.target.value = '';
  };
  return (
    <>
      <input ref={ref} type="file" accept={accept} onChange={handleChange} style={{ display: 'none' }} />
      <div className="upload-zone" onClick={() => ref.current?.click()}>
        <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
        <div style={{ fontSize: 11, color: 'rgba(249,246,241,0.5)', letterSpacing: 1 }}>{label}</div>
        <div style={{ fontSize: 10, color: 'rgba(249,246,241,0.25)', marginTop: 4 }}>Cliquez pour choisir</div>
      </div>
    </>
  );
}

function MultiUploadButton({ label, accept, onFiles, icon }: {
  label: string; accept: string; icon: string;
  onFiles: (dataUrls: { url: string; name: string }[]) => void;
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
      <input ref={ref} type="file" accept={accept} multiple onChange={handleChange} style={{ display: 'none' }} />
      <div className="upload-zone" onClick={() => ref.current?.click()}>
        <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
        <div style={{ fontSize: 11, color: 'rgba(249,246,241,0.5)', letterSpacing: 1 }}>{label}</div>
        <div style={{ fontSize: 10, color: 'rgba(249,246,241,0.25)', marginTop: 4 }}>Sélection multiple possible</div>
      </div>
    </>
  );
}

function ImageGrid({ urls, onRemove }: { urls: string[]; onRemove: (i: number) => void }) {
  if (urls.length === 0) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, marginTop: 10 }}>
      {urls.map((url, i) => (
        <div key={i} style={{ position: 'relative', aspectRatio: '1' }}>
          <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <button
            onClick={() => onRemove(i)}
            style={{
              position: 'absolute', top: 2, right: 2,
              background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff',
              width: 18, height: 18, cursor: 'pointer', fontSize: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
        </div>
      ))}
    </div>
  );
}

export default function MediaTab({ block, onUpdate }: Props) {
  const { type, media } = block;
  const isVideoBlock = type === 'video_intro';

  const setVideo = (url: string) =>
    onUpdate(b => ({ ...b, media: { ...b.media, video: url } }));

  const addImages = (items: { url: string }[]) =>
    onUpdate(b => ({ ...b, media: { ...b.media, images: [...b.media.images, ...items.map(i => i.url)] } }));

  const removeImage = (i: number) =>
    onUpdate(b => ({ ...b, media: { ...b.media, images: b.media.images.filter((_, idx) => idx !== i) } }));

  const addIcons = (items: { url: string }[]) =>
    onUpdate(b => ({ ...b, media: { ...b.media, icons: [...(b.media.icons ?? []), ...items.map(i => i.url)] } }));

  const removeIcon = (i: number) =>
    onUpdate(b => ({ ...b, media: { ...b.media, icons: (b.media.icons ?? []).filter((_, idx) => idx !== i) } }));

  const addAudio = (url: string) =>
    onUpdate(b => ({ ...b, media: { ...b.media, audio: url } }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Video — only for video_intro */}
      {isVideoBlock && (
        <div>
          <label className="field-label">Vidéo de collection (URL Cloudinary)</label>
          <p style={{ fontSize: 11, color: 'rgba(249,246,241,0.35)', marginBottom: 8, lineHeight: 1.5 }}>
            Seul l'onglet <strong style={{ color: GOLD }}>Contenu</strong> permet de définir l'URL Cloudinary de la vidéo d'intro.
            Pour les autres blocs, uploadez vos médias ci-dessous.
          </p>
          {media.video && (
            <div style={{ background: '#0E0E0E', padding: 10, borderRadius: 2, marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: GOLD, letterSpacing: 1, marginBottom: 4 }}>Vidéo configurée :</div>
              <div style={{ fontSize: 11, color: 'rgba(249,246,241,0.5)', wordBreak: 'break-all' }}>{media.video.slice(0, 60)}…</div>
            </div>
          )}
        </div>
      )}

      {/* Photos */}
      {type !== 'video_intro' && (
        <div>
          <label className="field-label">Photos ({media.images.length})</label>
          <MultiUploadButton
            label="Charger des photos"
            accept="image/jpeg,image/png,image/webp"
            icon="🖼️"
            onFiles={addImages}
          />
          <ImageGrid urls={media.images} onRemove={removeImage} />
        </div>
      )}

      {/* Icons / frames */}
      <div>
        <label className="field-label">Icônes & cadres ({(media.icons ?? []).length})</label>
        <MultiUploadButton
          label="Charger des icônes / cadres (PNG, SVG)"
          accept="image/png,image/svg+xml,image/webp"
          icon="◆"
          onFiles={addIcons}
        />
        {(media.icons ?? []).length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginTop: 8 }}>
            {(media.icons ?? []).map((url, i) => (
              <div key={i} style={{ position: 'relative', aspectRatio: '1', background: '#1A1110' }}>
                <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
                <button
                  onClick={() => removeIcon(i)}
                  style={{
                    position: 'absolute', top: 2, right: 2,
                    background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff',
                    width: 16, height: 16, cursor: 'pointer', fontSize: 9,
                  }}
                >✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Audio — only for audio_book */}
      {type === 'audio_book' && (
        <div>
          <label className="field-label">Fichier audio (MP3, AAC)</label>
          <UploadButton
            label="Charger un fichier audio"
            accept="audio/mpeg,audio/mp4,audio/aac,audio/wav"
            icon="🎙️"
            onFile={addAudio}
          />
          {media.audio && (
            <div style={{ marginTop: 8 }}>
              <audio controls src={media.audio} style={{ width: '100%', height: 32 }} />
              <button
                onClick={() => onUpdate(b => ({ ...b, media: { ...b.media, audio: undefined } }))}
                style={{ marginTop: 6, background: 'none', border: 'none', color: 'rgba(249,246,241,0.35)', cursor: 'pointer', fontSize: 11, fontFamily: sans }}
              >
                Supprimer l'audio
              </button>
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div style={{ padding: 12, background: 'rgba(201,169,110,0.05)', border: '1px solid rgba(201,169,110,0.1)' }}>
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: GOLD, marginBottom: 6 }}>ℹ Stockage</div>
        <div style={{ fontSize: 11, color: 'rgba(249,246,241,0.35)', lineHeight: 1.6 }}>
          Les médias sont stockés temporairement dans l'éditeur. La connexion à Supabase Storage sera configurée prochainement pour la persistance complète.
        </div>
      </div>
    </div>
  );
}
