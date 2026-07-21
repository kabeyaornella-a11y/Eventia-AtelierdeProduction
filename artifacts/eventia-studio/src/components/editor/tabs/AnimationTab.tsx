import type { Block } from '@/types';
import { ENTRANCE_OPTIONS, PHOTO_EFFECT_OPTIONS, TEXT_EFFECT_OPTIONS } from '@/types';

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

export default function AnimationTab({ block, onUpdate }: Props) {
  const { animation } = block;

  const set = (key: keyof typeof animation, value: string) =>
    onUpdate(b => ({ ...b, animation: { ...b.animation, [key]: value } }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Trigger */}
      <div>
        <label className="field-label">Déclencheur d'apparition</label>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { v: 'scroll', label: 'Au scroll', desc: 'Apparaît quand l\'écran arrive sur le bloc' },
            { v: 'fixed',  label: 'Fixe',      desc: 'Visible dès le chargement' },
          ].map(opt => (
            <div
              key={opt.v}
              onClick={() => set('trigger', opt.v)}
              style={{
                flex: 1, padding: '12px 10px', cursor: 'pointer', borderRadius: 8,
                border: `1.5px solid ${animation.trigger === opt.v ? GOLD : BORDER}`,
                background: animation.trigger === opt.v ? 'rgba(201,169,110,0.06)' : CARD,
                transition: 'all 0.2s', boxShadow: animation.trigger === opt.v ? '0 2px 6px rgba(201,169,110,0.15)' : 'none',
              }}
            >
              <div style={{ fontSize: 12, color: animation.trigger === opt.v ? GOLD : TEXT, marginBottom: 4, fontWeight: 500 }}>{opt.label}</div>
              <div style={{ fontSize: 10, color: MUTED, lineHeight: 1.5 }}>{opt.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Entrance */}
      <div>
        <label className="field-label">Effet d'entrée du bloc</label>
        <select className="studio-select" value={animation.entrance} onChange={e => set('entrance', e.target.value)}>
          {ENTRANCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Photo effect */}
      <div>
        <label className="field-label">Effet sur les photos</label>
        <select className="studio-select" value={animation.photoEffect} onChange={e => set('photoEffect', e.target.value)}>
          {PHOTO_EFFECT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {animation.photoEffect !== 'none' && (
          <div style={{ marginTop: 8, padding: 10, background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 7, fontSize: 11, color: MUTED, lineHeight: 1.5 }}>
            {animation.photoEffect === 'kenBurns'      && '→ Zoom lent + légère translation. Effet cinéma classique.'}
            {animation.photoEffect === 'zoomCinematic' && '→ Zoom progressif fort. Effet dramatique et immersif.'}
            {animation.photoEffect === 'parallax'      && '→ La photo se déplace à une vitesse différente du scroll.'}
          </div>
        )}
      </div>

      {/* Text effect */}
      <div>
        <label className="field-label">Effet sur les textes</label>
        <select className="studio-select" value={animation.textEffect} onChange={e => set('textEffect', e.target.value)}>
          {TEXT_EFFECT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Summary card */}
      <div style={{ padding: 14, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, boxShadow: '0 1px 4px rgba(42,31,24,0.06)' }}>
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>
          Récapitulatif
        </div>
        {[
          { k: 'Déclencheur', v: animation.trigger === 'scroll' ? 'Au scroll' : 'Fixe' },
          { k: 'Entrée',      v: ENTRANCE_OPTIONS.find(o => o.value === animation.entrance)?.label ?? animation.entrance },
          { k: 'Photo',       v: PHOTO_EFFECT_OPTIONS.find(o => o.value === animation.photoEffect)?.label ?? animation.photoEffect },
          { k: 'Texte',       v: TEXT_EFFECT_OPTIONS.find(o => o.value === animation.textEffect)?.label ?? animation.textEffect },
        ].map(item => (
          <div key={item.k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6, paddingBottom: 6, borderBottom: `1px solid ${BORDER}` }}>
            <span style={{ color: MUTED }}>{item.k}</span>
            <span style={{ color: TEXT, fontWeight: 500 }}>{item.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
