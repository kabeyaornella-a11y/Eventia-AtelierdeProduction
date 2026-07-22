import { useState, useRef } from 'react';

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const CARD = '#FFFFFF';
const BORDER = 'rgba(42,31,24,0.1)';
const MUTED = 'rgba(42,31,24,0.45)';
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

type MediaItem = { id: string; url: string; name: string; type: 'image' | 'video'; uploadedAt: string };

export default function Mediatheque() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newItems: MediaItem[] = Array.from(files).map(f => ({
      id: Math.random().toString(36).slice(2),
      url: URL.createObjectURL(f),
      name: f.name,
      type: f.type.startsWith('video') ? 'video' : 'image',
      uploadedAt: new Date().toLocaleDateString('fr-FR'),
    }));
    setItems(prev => [...newItems, ...prev]);
  };

  return (
    <div style={{ fontFamily: sans }}>
      <p style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>Ressources</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <h1 style={{ fontFamily: serif, fontSize: 36, fontWeight: 400, color: TEXT, margin: 0 }}>Médiathèque</h1>
        <button onClick={() => inputRef.current?.click()} style={{ background: GOLD, color: '#fff', border: 'none', padding: '10px 22px', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 6 }}>
          + Importer
        </button>
      </div>

      <input ref={inputRef} type="file" accept="image/*,video/*" multiple style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />

      {/* Zone de dépôt */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? GOLD : 'rgba(201,169,110,0.3)'}`,
          borderRadius: 10, padding: '32px', textAlign: 'center', cursor: 'pointer', marginBottom: 32,
          background: dragging ? 'rgba(201,169,110,0.04)' : 'transparent',
          transition: 'all 0.2s',
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 8, color: GOLD }}>↑</div>
        <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 18, color: MUTED }}>
          Glisse tes photos & vidéos ici
        </div>
        <div style={{ fontSize: 11, color: MUTED, marginTop: 6 }}>ou clique pour sélectionner</div>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: MUTED, fontStyle: 'italic' }}>
          Aucun média importé — importe tes photos de shooting pour les réutiliser dans tes créations
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
          {items.map(item => (
            <div key={item.id} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: `1px solid ${BORDER}`, background: CARD }}>
              {item.type === 'image' ? (
                <img src={item.url} alt={item.name} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
              ) : (
                <video src={item.url} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
              )}
              <div style={{ padding: '8px 10px' }}>
                <div style={{ fontSize: 10, color: TEXT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                <div style={{ fontSize: 9, color: MUTED, marginTop: 2 }}>{item.uploadedAt}</div>
              </div>
              <button
                onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))}
                style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: 22, height: 22, borderRadius: '50%', cursor: 'pointer', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
