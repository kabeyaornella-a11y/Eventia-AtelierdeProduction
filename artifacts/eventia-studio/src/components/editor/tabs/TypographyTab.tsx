import { useState } from 'react';
import type { Block, FontStyle, BlockTypography } from '@/types';
import { FONT_COMBOS, FONT_SIZES } from '@/types';

interface Props {
  block: Block;
  onUpdate: (updater: (b: Block) => Block) => void;
}

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const MUTED = 'rgba(42,31,24,0.45)';
const BORDER = 'rgba(42,31,24,0.12)';
const CARD = '#FFFFFF';
const sans = "'Jost', sans-serif";

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

const PALETTE = ['#2A1F18','#C9A96E','#FAF6F0','#ffffff','#000000','rgba(42,31,24,0.5)'];

export default function TypographyTab({ block, onUpdate }: Props) {
  const [level, setLevel] = useState<Level>('title');
  const typo = block.typography;
  const fs: FontStyle = typo[level];

  const updateLevel = (key: keyof FontStyle, value: any) =>
    onUpdate(b => ({ ...b, typography: { ...b.typography, [level]: { ...b.typography[level], [key]: value } } }));

  return (
    <div>
      {/* Combo picker */}
      <div style={{ marginBottom: 16 }}>
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
        {FONT_COMBOS.filter(c => c.id === typo.combo).map(c => (
          <div key={c.id} style={{ marginTop: 6, fontSize: 10, color: MUTED, lineHeight: 1.8 }}>
            {c.title} · {c.body} · {c.other}
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: BORDER, marginBottom: 14 }} />

      {/* Level selector */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
        {LEVELS.map(l => (
          <button
            key={l.id}
            onClick={() => setLevel(l.id)}
            style={{
              flex: 1, padding: '7px 4px', fontSize: 10,
              letterSpacing: 1, textTransform: 'uppercase', textAlign: 'center',
              background: level === l.id ? 'rgba(201,169,110,0.1)' : CARD,
              border: level === l.id ? `1px solid ${GOLD}` : `1px solid ${BORDER}`,
              color: level === l.id ? GOLD : MUTED,
              cursor: 'pointer', transition: 'all 0.2s', borderRadius: 6,
              fontFamily: sans,
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Live preview */}
      <div style={{
        marginBottom: 14, padding: '12px 14px',
        background: '#2A1F18', borderRadius: 8,
        fontFamily: `'${fs.family}', serif`,
        fontSize: Math.min(fs.size, 26),
        color: fs.color,
        fontWeight: fs.bold ? 700 : 400,
        fontStyle: fs.italic ? 'italic' : 'normal',
        textDecoration: [fs.underline && 'underline', fs.strikethrough && 'line-through'].filter(Boolean).join(' ') || 'none',
        textAlign: fs.align as any,
        letterSpacing: fs.letterSpacing,
        lineHeight: fs.lineHeight,
        backgroundColor: fs.highlight || '#2A1F18',
        position: 'relative',
      }}>
        {fs.family} — Aperçu
        <div style={{ position: 'absolute', top: 6, right: 8, fontSize: 8, color: GOLD, letterSpacing: 2, textTransform: 'uppercase', fontFamily: sans, fontStyle: 'normal', textDecoration: 'none' }}>
          APERÇU ACTIF
        </div>
      </div>

      {/* Police */}
      <div style={{ marginBottom: 12 }}>
        <label className="field-label">Police — {level}</label>
        <select className="studio-select" value={fs.family} onChange={e => updateLevel('family', e.target.value)}>
          {GOOGLE_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      {/* Size + line height */}
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
            {[1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 2].map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Letter spacing */}
      <div style={{ marginBottom: 12 }}>
        <label className="field-label">Espacement lettres ({fs.letterSpacing}px)</label>
        <input type="range" min={-2} max={20} step={0.5} value={fs.letterSpacing} onChange={e => updateLevel('letterSpacing', Number(e.target.value))} style={{ width: '100%', accentColor: GOLD }} />
      </div>

      {/* Color */}
      <div style={{ marginBottom: 12 }}>
        <label className="field-label">Couleur prénoms</label>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
          {PALETTE.map((col, i) => (
            <div key={i} onClick={() => updateLevel('color', col)} style={{ width: 22, height: 22, background: col, cursor: 'pointer', border: fs.color === col ? `2px solid ${GOLD}` : `1px solid ${BORDER}`, borderRadius: 4, flexShrink: 0 }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 18, height: 18, background: fs.color, border: `1px solid ${BORDER}`, borderRadius: 3, flexShrink: 0 }} />
          <input className="studio-input" value={fs.color} onChange={e => updateLevel('color', e.target.value)} placeholder="#C9A96E" style={{ flex: 1 }} />
        </div>
      </div>

      {/* Format buttons */}
      <div style={{ marginBottom: 12 }}>
        <label className="field-label">Style</label>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {[
            { key: 'bold',          label: 'G',  title: 'Gras',    style: { fontWeight: 700 } },
            { key: 'italic',        label: 'I',  title: 'Italique', style: { fontStyle: 'italic' } },
            { key: 'underline',     label: 'U',  title: 'Souligné', style: { textDecoration: 'underline' } },
            { key: 'strikethrough', label: 'S',  title: 'Barré',    style: { textDecoration: 'line-through' } },
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
          {[{ v: 'left', icon: '⇤' }, { v: 'center', icon: '↔' }, { v: 'right', icon: '⇥' }].map(a => (
            <button key={a.v} onClick={() => updateLevel('align', a.v)} className={`format-btn ${fs.align === a.v ? 'active' : ''}`} style={{ flex: 1 }}>
              {a.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Highlight */}
      <div style={{ marginBottom: 12 }}>
        <label className="field-label">Surlignage (vide = aucun)</label>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
          <div onClick={() => updateLevel('highlight', '')} style={{ width: 22, height: 22, border: `1px solid ${BORDER}`, cursor: 'pointer', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: MUTED, borderRadius: 4 }}>✕</div>
          {['rgba(201,169,110,0.25)','rgba(42,31,24,0.08)','rgba(255,255,255,0.6)'].map((col, i) => (
            <div key={i} onClick={() => updateLevel('highlight', col)} style={{ width: 22, height: 22, background: col, border: `1px solid ${BORDER}`, cursor: 'pointer', borderRadius: 4 }} />
          ))}
        </div>
        <input className="studio-input" value={fs.highlight} onChange={e => updateLevel('highlight', e.target.value)} placeholder="transparent" />
      </div>
    </div>
  );
}
