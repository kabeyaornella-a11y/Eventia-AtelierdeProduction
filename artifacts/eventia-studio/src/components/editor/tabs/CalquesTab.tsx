import { useState, useRef } from 'react';
import type { Block, Layer, LayerKind } from '@/types';
import { makeDefaultLayer } from '@/types';
import { ICON_LIBRARY, ICON_CATEGORIES } from '@/data/icons';

interface Props {
  block: Block;
  selectedLayerId: string | null;
  onSelectLayer: (id: string | null) => void;
  onAddLayer: (kind: LayerKind, extra?: Partial<Layer>) => void;
  onUpdateLayer: (layerId: string, patch: Partial<Layer>) => void;
  onDeleteLayer: (layerId: string) => void;
  onReorderLayer: (from: number, to: number) => void;
}

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const MUTED = 'rgba(42,31,24,0.45)';
const BORDER = 'rgba(42,31,24,0.12)';
const CARD = '#FFFFFF';
const sans = "'Jost', sans-serif";
const serif = "'Cormorant Garamond', serif";

const GOOGLE_FONTS = ['Cormorant Garamond','Playfair Display','Great Vibes','Pinyon Script','Sacramento','Jost','Lato','DM Sans','Inter'];

function Slider({ label, value, min, max, step = 1, unit = '', onChange }: {
  label: string; value: number; min: number; max: number; step?: number; unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span className="field-label" style={{ marginBottom: 0 }}>{label}</span>
        <span style={{ fontSize: 11, color: GOLD }}>{Math.round(value * 100) / 100}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: GOLD }} />
    </div>
  );
}

const KIND_LABELS: Record<LayerKind, { label: string; icon: string }> = {
  text:  { label: 'Texte',  icon: '✏️' },
  photo: { label: 'Photo',  icon: '🖼️' },
  icon:  { label: 'Icône',  icon: '✦' },
  frame: { label: 'Cadre',  icon: '⬜' },
};

export default function CalquesTab({
  block, selectedLayerId, onSelectLayer,
  onAddLayer, onUpdateLayer, onDeleteLayer, onReorderLayer,
}: Props) {
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [iconCategory, setIconCategory] = useState<string>('fleurs');
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const layers = block.layers ?? [];
  const selected = layers.find(l => l.id === selectedLayerId) ?? null;

  const upd = (key: keyof Layer, value: any) => {
    if (!selected) return;
    onUpdateLayer(selected.id, { [key]: value });
  };

  const handlePhotoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const kind: LayerKind = file.name.toLowerCase().includes('cadre') || file.name.toLowerCase().includes('frame') ? 'frame' : 'photo';
      onAddLayer(kind, { src: reader.result as string });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Add layer buttons */}
      <div style={{ marginBottom: 14 }}>
        <label className="field-label">Ajouter un calque</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[
            { kind: 'text'  as LayerKind, icon: '✏️', label: 'Texte libre',   action: () => onAddLayer('text') },
            { kind: 'icon'  as LayerKind, icon: '✦',  label: 'Icône biblioth.', action: () => setShowIconPicker(p => !p) },
            { kind: 'photo' as LayerKind, icon: '🖼️', label: 'Photo / image',  action: () => fileRef.current?.click() },
            { kind: 'frame' as LayerKind, icon: '⬜', label: 'Cadre / frame',   action: () => fileRef.current?.click() },
          ].map(btn => (
            <button key={btn.kind} onClick={btn.action} style={{
              padding: '9px 8px', background: CARD, border: `1px solid ${BORDER}`,
              borderRadius: 7, cursor: 'pointer', fontSize: 11, color: TEXT,
              display: 'flex', alignItems: 'center', gap: 6, fontFamily: sans,
              boxShadow: '0 1px 3px rgba(42,31,24,0.06)',
              transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: 14 }}>{btn.icon}</span> {btn.label}
            </button>
          ))}
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoFile} />
      </div>

      {/* Icon picker */}
      {showIconPicker && (
        <div style={{ marginBottom: 14, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 12, boxShadow: '0 2px 8px rgba(42,31,24,0.08)' }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 10, flexWrap: 'wrap' }}>
            {ICON_CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setIconCategory(cat.id)} style={{
                padding: '4px 8px', fontSize: 10, border: `1px solid ${iconCategory === cat.id ? GOLD : BORDER}`,
                background: iconCategory === cat.id ? 'rgba(201,169,110,0.1)' : 'transparent',
                color: iconCategory === cat.id ? GOLD : MUTED, cursor: 'pointer',
                borderRadius: 20, fontFamily: sans,
              }}>{cat.label}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 4 }}>
            {ICON_LIBRARY.filter(i => i.category === iconCategory).map(icon => (
              <button key={icon.id} title={icon.label} onClick={() => {
                onAddLayer('icon', { emoji: icon.emoji, fontSize: 32 });
                setShowIconPicker(false);
              }} style={{
                width: 32, height: 32, fontSize: 18, background: 'transparent',
                border: `1px solid transparent`, borderRadius: 6, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,169,110,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {icon.emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Layer list */}
      {layers.length > 0 ? (
        <div style={{ marginBottom: 14 }}>
          <label className="field-label">Calques ({layers.length})</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[...layers].reverse().map((layer, revIdx) => {
              const realIdx = layers.length - 1 - revIdx;
              const isSelected = layer.id === selectedLayerId;
              return (
                <div
                  key={layer.id}
                  draggable
                  onDragStart={() => setDragId(layer.id)}
                  onDragOver={e => { e.preventDefault(); setDragOverId(layer.id); }}
                  onDrop={() => {
                    if (!dragId || dragId === layer.id) { setDragId(null); setDragOverId(null); return; }
                    const fromIdx = layers.findIndex(l => l.id === dragId);
                    onReorderLayer(fromIdx, realIdx);
                    setDragId(null); setDragOverId(null);
                  }}
                  onDragEnd={() => { setDragId(null); setDragOverId(null); }}
                  onClick={() => onSelectLayer(isSelected ? null : layer.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
                    background: isSelected ? 'rgba(201,169,110,0.08)' : CARD,
                    border: `1px solid ${isSelected ? GOLD : dragOverId === layer.id ? 'rgba(201,169,110,0.4)' : BORDER}`,
                    borderRadius: 7, cursor: 'pointer', opacity: dragId === layer.id ? 0.4 : 1,
                    transition: 'all 0.15s',
                    boxShadow: isSelected ? '0 2px 6px rgba(201,169,110,0.12)' : 'none',
                  }}
                >
                  <span style={{ color: MUTED, fontSize: 11, cursor: 'grab', userSelect: 'none' }}>⠿</span>
                  <span style={{ fontSize: 16 }}>{KIND_LABELS[layer.kind].icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: TEXT, fontWeight: isSelected ? 500 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {layer.kind === 'text' ? (layer.text?.slice(0, 20) || 'Texte vide') :
                       layer.kind === 'icon' ? layer.emoji :
                       KIND_LABELS[layer.kind].label}
                    </div>
                    <div style={{ fontSize: 10, color: MUTED }}>z:{layer.zIndex} · {Math.round(layer.width)}% · {Math.round(layer.opacity * 100)}%</div>
                  </div>
                  <button onClick={e => { e.stopPropagation(); onDeleteLayer(layer.id); }} style={{
                    width: 20, height: 20, background: 'none', border: 'none',
                    color: 'rgba(42,31,24,0.25)', cursor: 'pointer', fontSize: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 3,
                    flexShrink: 0,
                  }}>✕</button>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 10, color: MUTED, marginTop: 6 }}>
            Glisser pour réordonner · le premier = dessous, le dernier = dessus
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0', color: MUTED, fontSize: 12 }}>
          Aucun calque · Ajouter un élément ci-dessus
        </div>
      )}

      {/* Selected layer properties */}
      {selected && (
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 14 }}>
          <label className="field-label" style={{ marginBottom: 12, display: 'block' }}>
            Propriétés — {KIND_LABELS[selected.kind].icon} {KIND_LABELS[selected.kind].label}
          </label>

          {/* Text content */}
          {selected.kind === 'text' && (
            <div style={{ marginBottom: 12 }}>
              <label className="field-label">Texte</label>
              <textarea className="studio-input" value={selected.text ?? ''} onChange={e => upd('text', e.target.value)}
                rows={3} style={{ resize: 'vertical' }} placeholder="Votre texte ici" />
            </div>
          )}

          {/* Icon emoji picker */}
          {selected.kind === 'icon' && (
            <div style={{ marginBottom: 12 }}>
              <label className="field-label">Icône sélectionnée</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ fontSize: 32 }}>{selected.emoji}</div>
                <button onClick={() => setShowIconPicker(p => !p)} style={{
                  background: 'rgba(201,169,110,0.1)', border: `1px solid ${GOLD}`,
                  color: GOLD, padding: '6px 12px', borderRadius: 6, cursor: 'pointer',
                  fontSize: 11, fontFamily: sans,
                }}>Changer d'icône</button>
              </div>
              {showIconPicker && (
                <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 10 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
                    {ICON_CATEGORIES.map(cat => (
                      <button key={cat.id} onClick={() => setIconCategory(cat.id)} style={{
                        padding: '3px 7px', fontSize: 10, border: `1px solid ${iconCategory === cat.id ? GOLD : BORDER}`,
                        background: iconCategory === cat.id ? 'rgba(201,169,110,0.1)' : 'transparent',
                        color: iconCategory === cat.id ? GOLD : MUTED, cursor: 'pointer',
                        borderRadius: 20, fontFamily: sans,
                      }}>{cat.label}</button>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 3 }}>
                    {ICON_LIBRARY.filter(i => i.category === iconCategory).map(icon => (
                      <button key={icon.id} title={icon.label} onClick={() => { upd('emoji', icon.emoji); setShowIconPicker(false); }} style={{
                        width: 28, height: 28, fontSize: 16, background: selected.emoji === icon.emoji ? 'rgba(201,169,110,0.15)' : 'transparent',
                        border: selected.emoji === icon.emoji ? `1px solid ${GOLD}` : '1px solid transparent',
                        borderRadius: 5, cursor: 'pointer',
                      }}>{icon.emoji}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Font settings (text + icon) */}
          {(selected.kind === 'text' || selected.kind === 'icon') && (
            <>
              <div style={{ marginBottom: 10 }}>
                <label className="field-label">Police</label>
                <select className="studio-select" value={selected.fontFamily} onChange={e => upd('fontFamily', e.target.value)}>
                  {GOOGLE_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <Slider label="Taille" value={selected.fontSize} min={8} max={120} unit="px" onChange={v => upd('fontSize', v)} />
              <div style={{ marginBottom: 10 }}>
                <label className="field-label">Couleur</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ width: 20, height: 20, background: selected.color, border: `1px solid ${BORDER}`, borderRadius: 4, flexShrink: 0 }} />
                  <input className="studio-input" value={selected.color} onChange={e => upd('color', e.target.value)} placeholder="#F9F6F1" style={{ flex: 1 }} />
                  <input type="color" value={selected.color.startsWith('#') ? selected.color : '#F9F6F1'} onChange={e => upd('color', e.target.value)} style={{ width: 28, height: 28, border: 'none', background: 'none', cursor: 'pointer', flexShrink: 0 }} />
                </div>
              </div>
              {selected.kind === 'text' && (
                <div style={{ marginBottom: 10 }}>
                  <label className="field-label">Style</label>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button onClick={() => upd('bold', !selected.bold)} className={`format-btn ${selected.bold ? 'active' : ''}`} style={{ fontWeight: 700 }}>G</button>
                    <button onClick={() => upd('italic', !selected.italic)} className={`format-btn ${selected.italic ? 'active' : ''}`} style={{ fontStyle: 'italic' }}>I</button>
                    {(['left','center','right'] as const).map(a => (
                      <button key={a} onClick={() => upd('textAlign', a)} className={`format-btn ${selected.textAlign === a ? 'active' : ''}`} style={{ flex: 1 }}>
                        {a === 'left' ? '⇤' : a === 'center' ? '↔' : '⇥'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div style={{ height: 1, background: BORDER, marginBottom: 12 }} />

          {/* Position & size */}
          <Slider label="Position X" value={selected.x} min={-20} max={100} step={0.5} unit="%" onChange={v => upd('x', v)} />
          <Slider label="Position Y" value={selected.y} min={-20} max={200} step={0.5} unit="%" onChange={v => upd('y', v)} />
          <Slider label="Largeur (taille)" value={selected.width} min={5} max={120} step={0.5} unit="%" onChange={v => upd('width', v)} />
          <Slider label="Rotation" value={selected.rotation} min={-180} max={180} step={1} unit="°" onChange={v => upd('rotation', v)} />
          <Slider label="Opacité" value={selected.opacity} min={0} max={1} step={0.01} unit="" onChange={v => upd('opacity', v)} />
          <div style={{ marginBottom: 10 }}>
            <label className="field-label">Ordre (z-index)</label>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => upd('zIndex', Math.max(0, selected.zIndex - 1))} className="format-btn">↓</button>
              <span style={{ fontSize: 12, color: TEXT, display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>{selected.zIndex}</span>
              <button onClick={() => upd('zIndex', selected.zIndex + 1)} className="format-btn">↑</button>
            </div>
          </div>

          {/* Delete */}
          <button onClick={() => { onDeleteLayer(selected.id); onSelectLayer(null); }} style={{
            width: '100%', marginTop: 6, padding: '9px',
            background: 'none', border: '1px solid rgba(200,50,50,0.3)',
            color: 'rgba(180,50,50,0.7)', cursor: 'pointer', fontSize: 11,
            letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: sans, borderRadius: 7,
          }}>
            Supprimer ce calque
          </button>
        </div>
      )}

      {layers.length === 0 && (
        <div style={{ padding: 12, background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 8, marginTop: 8 }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: GOLD, marginBottom: 6 }}>Calques — comment ça marche</div>
          <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.7 }}>
            Empilez des éléments sur ce bloc : photo → cadre → fleurs → texte.
            Chaque calque est déplaçable et redimensionnable directement dans l'aperçu.
          </div>
        </div>
      )}
    </div>
  );
}
