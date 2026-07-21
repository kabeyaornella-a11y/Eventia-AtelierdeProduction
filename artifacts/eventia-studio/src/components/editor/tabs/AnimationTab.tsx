import type { Block } from '@/types';
import { ENTRANCE_OPTIONS, PHOTO_EFFECT_OPTIONS, TEXT_EFFECT_OPTIONS } from '@/types';

interface Props {
  block: Block;
  onUpdate: (updater: (b: Block) => Block) => void;
}

const GOLD = '#C9A96E';

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
            { v: 'scroll', label: 'Au scroll', desc: 'Le bloc s\'anime quand il entre dans l\'écran' },
            { v: 'fixed',  label: 'Fixe',      desc: 'Tout est visible dès le chargement' },
          ].map(opt => (
            <div
              key={opt.v}
              onClick={() => set('trigger', opt.v)}
              style={{
                flex: 1, padding: '12px 10px', cursor: 'pointer',
                border: `1px solid ${animation.trigger === opt.v ? GOLD : 'rgba(249,246,241,0.1)'}`,
                background: animation.trigger === opt.v ? 'rgba(201,169,110,0.1)' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: 12, color: animation.trigger === opt.v ? GOLD : '#F9F6F1', marginBottom: 4 }}>{opt.label}</div>
              <div style={{ fontSize: 10, color: 'rgba(249,246,241,0.3)', lineHeight: 1.5 }}>{opt.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Entrance */}
      <div>
        <label className="field-label">Effet d'entrée du bloc</label>
        <select
          className="studio-select"
          value={animation.entrance}
          onChange={e => set('entrance', e.target.value)}
        >
          {ENTRANCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Photo effect */}
      <div>
        <label className="field-label">Effet sur les photos</label>
        <select
          className="studio-select"
          value={animation.photoEffect}
          onChange={e => set('photoEffect', e.target.value)}
        >
          {PHOTO_EFFECT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        {/* Visual hint */}
        {animation.photoEffect !== 'none' && (
          <div style={{ marginTop: 8, padding: 10, background: 'rgba(201,169,110,0.05)', border: '1px solid rgba(201,169,110,0.1)', fontSize: 11, color: 'rgba(249,246,241,0.4)', lineHeight: 1.5 }}>
            {animation.photoEffect === 'kenBurns'      && '→ Zoom lent + légère translation. Effet cinéma classique.'}
            {animation.photoEffect === 'zoomCinematic' && '→ Zoom progressif fort. Effet dramatique et immersif.'}
            {animation.photoEffect === 'parallax'      && '→ La photo se déplace à une vitesse différente du scroll. Donne de la profondeur.'}
          </div>
        )}
      </div>

      {/* Text effect */}
      <div>
        <label className="field-label">Effet sur les textes</label>
        <select
          className="studio-select"
          value={animation.textEffect}
          onChange={e => set('textEffect', e.target.value)}
        >
          {TEXT_EFFECT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Preview info */}
      <div style={{ padding: 12, background: 'rgba(201,169,110,0.05)', border: '1px solid rgba(201,169,110,0.1)' }}>
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: GOLD, marginBottom: 6 }}>
          Aperçu des animations
        </div>
        <div style={{ fontSize: 11, color: 'rgba(249,246,241,0.35)', lineHeight: 1.6 }}>
          Les animations sont prévisualisées dans l'aperçu en direct à droite. Elles sont pleinement actives dans l'expérience finale envoyée aux convives.
        </div>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { k: 'Déclencheur', v: animation.trigger === 'scroll' ? 'Au scroll' : 'Fixe' },
            { k: 'Entrée',      v: ENTRANCE_OPTIONS.find(o => o.value === animation.entrance)?.label ?? animation.entrance },
            { k: 'Photo',       v: PHOTO_EFFECT_OPTIONS.find(o => o.value === animation.photoEffect)?.label ?? animation.photoEffect },
            { k: 'Texte',       v: TEXT_EFFECT_OPTIONS.find(o => o.value === animation.textEffect)?.label ?? animation.textEffect },
          ].map(item => (
            <div key={item.k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
              <span style={{ color: 'rgba(249,246,241,0.35)' }}>{item.k}</span>
              <span style={{ color: GOLD }}>{item.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
