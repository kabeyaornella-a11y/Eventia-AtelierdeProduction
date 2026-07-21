import { useState } from 'react';
import type { Block, FontStyle, BlockTypography } from '@/types';
import { FONT_COMBOS, FONT_SIZES } from '@/types';

interface Props {
  block: Block;
  onUpdate: (updater: (b: Block) => Block) => void;
}

const GOLD = '#C9A96E';
const GOOGLE_FONTS = [
  'Cormorant Garamond','Playfair Display','EB Garamond','Libre Baskerville','DM Serif Display',
  'Jost','Lato','DM Sans','Inter','Nunito',
  'Great Vibes','Pinyon Script','Sacramento','Tangerine','Dancing Script',
];

type Level = 'title' | 'subtitle' | 'body' | 'other';
const LEVELS: { id: Level; label: string }[] = [
  { id: 'title',    label: 'Titre' },
  { id: 'subtitle', label: 'Sous-titre' },
  { id: 'body',     label: 'Corps' },
  { id: 'other',    label: 'Autre' },
];

function ColorDot({ color, onClick }: { color: string; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{ width: 20, height: 20, background: color, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2, flexShrink: 0 }}
      title={color}
    />
  );
}

const PALETTE = ['#F9F6F1','#C9A96E','#2A1F18','#6B5C54','#ffffff','#000000'];

export default function TypographyTab({ block, onUpdate }: Props) {
  const [level, setLevel] = useState<Level>('title');
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);

  const typo = block.typography;
  const fs: FontStyle = typo[level];

  const updateTypo = (field: keyof BlockTypography, value: any) =>
    onUpdate(b => ({ ...b, typography: { ...b.typography, [field]: value } }));

  const updateLevel = (key: keyof FontStyle, value: any) =>
    onUpdate(b => ({ ...b, typography: { ...b.typography, [level]: { ...b.typography[level], [key]: value } } }));

  return (
    <div>
      {/* Combo picker */}
      <div style={{ marginBottom: 18 }}>
        <label className="field-label">Combo de polices</label>
        <select
          className="studio-select"
          value={typo.combo}
          onChange={e => {
            const combo = FONT_COMBOS.find(c => c.id === e.target.value)!;
            onUpdate(b => ({
              ...b,
              typography: {
                ...b.typography,
                combo: combo.id,
                title:    { ...b.typography.title,    family: combo.title },
                subtitle: { ...b.typography.subtitle, family: combo.subtitle },
                body:     { ...b.typography.body,     family: combo.body },
                other:    { ...b.typography.other,    family: combo.other },
              },
            }));
          }}
        >
          {FONT_COMBOS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
        <div style={{ marginTop: 8, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {FONT_COMBOS.filter(c => c.id === typo.combo).map(c => (
            <div key={c.id} style={{ fontSize: 10, color: 'rgba(249,246,241,0.35)', lineHeight: 1.8 }}>
              {c.title} · {c.subtitle} · {c.body} · {c.other}
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', height: 1, background: 'rgba(201,169,110,0.1)', marginBottom: 14 }} />

      {/* Level tabs */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
        {LEVELS.map(l => (
          <button
            key={l.id}
            onClick={() => setLevel(l.id)}
            style={{
              flex: 1, padding: '6px 4px', fontSize: 10,
              letterSpacing: 1.5, textTransform: 'uppercase', textAlign: 'center',
              background: level === l.id ? 'rgba(201,169,110,0.15)' : 'transparent',
              border: level === l.id ? `1px solid ${GOLD}` : '1px solid rgba(249,246,241,0.1)',
              color: level === l.id ? GOLD : 'rgba(249,246,241,0.4)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Level config */}
      <div>
        {/* Font family */}
        <div style={{ marginBottom: 12 }}>
          <label className="field-label">Police</label>
          <select className="studio-select" value={fs.family} onChange={e => updateLevel('family', e.target.value)}>
            {GOOGLE_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          {/* Live preview */}
          <div style={{
            marginTop: 6, padding: '8px 10px', background: '#0E0E0E',
            fontFamily: `'${fs.family}', serif`,
            fontSize: Math.min(fs.size, 28),
            color: fs.color,
            fontWeight: fs.bold ? 700 : 400,
            fontStyle: fs.italic ? 'italic' : 'normal',
            textDecoration: [fs.underline && 'underline', fs.strikethrough && 'line-through'].filter(Boolean).join(' ') || 'none',
            textAlign: fs.align,
            letterSpacing: fs.letterSpacing,
            lineHeight: fs.lineHeight,
            backgroundColor: fs.highlight || undefined,
          }}>
            {fs.family} — Aperçu
          </div>
        </div>

        {/* Size */}
        <div style={{ marginBottom: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div>
            <label className="field-label">Taille (px)</label>
            <select className="studio-select" value={fs.size} onChange={e => updateLevel('size', Number(e.target.value))}>
              {FONT_SIZES.map(s => <option key={s} value={s}>{s}px</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Interligne</label>
            <select className="studio-select" value={fs.lineHeight} onChange={e => updateLevel('lineHeight', Number(e.target.value))}>
              {[1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 2, 2.2, 2.5, 3].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Letter spacing */}
        <div style={{ marginBottom: 12 }}>
          <label className="field-label">Espacement lettres ({fs.letterSpacing}px)</label>
          <input
            type="range" min={-2} max={20} step={0.5} value={fs.letterSpacing}
            onChange={e => updateLevel('letterSpacing', Number(e.target.value))}
            style={{ width: '100%', accentColor: GOLD }}
          />
        </div>

        {/* Color + highlight */}
        <div style={{ marginBottom: 12 }}>
          <label className="field-label">Couleur du texte</label>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
            {PALETTE.map(col => (
              <ColorDot key={col} color={col} onClick={() => updateLevel('color', col)} />
            ))}
            <div style={{ position: 'relative', flex: 1, minWidth: 80 }}>
              <input
                className="studio-input"
                value={fs.color}
                onChange={e => updateLevel('color', e.target.value)}
                placeholder="#C9A96E"
                style={{ paddingLeft: 28 }}
              />
              <div style={{
                position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                width: 14, height: 14, background: fs.color, border: '1px solid rgba(255,255,255,0.2)',
              }} />
            </div>
          </div>
        </div>

        {/* Highlight */}
        <div style={{ marginBottom: 12 }}>
          <label className="field-label">Surlignage (vide = aucun)</label>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
            <div
              onClick={() => updateLevel('highlight', '')}
              style={{ width: 20, height: 20, border: '1px solid rgba(249,246,241,0.2)', cursor: 'pointer', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'rgba(249,246,241,0.4)' }}
            >✕</div>
            {['rgba(201,169,110,0.3)','rgba(249,246,241,0.1)','rgba(255,255,255,0.2)'].map(col => (
              <ColorDot key={col} color={col} onClick={() => updateLevel('highlight', col)} />
            ))}
            <input
              className="studio-input"
              value={fs.highlight}
              onChange={e => updateLevel('highlight', e.target.value)}
              placeholder="transparent"
              style={{ flex: 1, minWidth: 60 }}
            />
          </div>
        </div>

        {/* Format buttons */}
        <div style={{ marginBottom: 12 }}>
          <label className="field-label">Style</label>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {[
              { key: 'bold', label: 'B', title: 'Gras', style: { fontWeight: 700 } },
              { key: 'italic', label: 'I', title: 'Italique', style: { fontStyle: 'italic' } },
              { key: 'underline', label: 'U', title: 'Souligné', style: { textDecoration: 'underline' } },
              { key: 'strikethrough', label: 'S', title: 'Barré', style: { textDecoration: 'line-through' } },
            ].map(btn => (
              <button
                key={btn.key}
                onClick={() => updateLevel(btn.key as keyof FontStyle, !fs[btn.key as keyof FontStyle])}
                className={`format-btn ${fs[btn.key as keyof FontStyle] ? 'active' : ''}`}
                title={btn.title}
                style={{ ...(btn.style as any) }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Alignment */}
        <div style={{ marginBottom: 12 }}>
          <label className="field-label">Alignement</label>
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              { v: 'left', icon: '⬅' },
              { v: 'center', icon: '↔' },
              { v: 'right', icon: '➡' },
            ].map(a => (
              <button
                key={a.v}
                onClick={() => updateLevel('align', a.v)}
                className={`format-btn ${fs.align === a.v ? 'active' : ''}`}
                style={{ flex: 1 }}
              >
                {a.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
