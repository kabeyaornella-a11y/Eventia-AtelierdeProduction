import { useState } from 'react';
import type { Block, BlockContent } from '@/types';
import { TIMELINE_TEMPLATES } from '@/data/timelineTemplates';

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

function set(onUpdate: Props['onUpdate'], key: string, value: string | boolean | number) {
  onUpdate(b => ({ ...b, content: { ...b.content, [key]: value } }));
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label className="field-label">{label}</label>
      {children}
    </div>
  );
}

const c = (content: BlockContent, key: string, fallback = '') => String(content[key] ?? fallback);

/* ── Timeline Templates picker ── */
function TimelineTemplatePicker({ content, onUpdate }: { content: BlockContent; onUpdate: Props['onUpdate'] }) {
  const [open, setOpen] = useState(false);
  const activeId = c(content, 'timelineStyle', '');
  const active = TIMELINE_TEMPLATES.find(t => t.id === activeId);

  return (
    <div style={{ marginBottom: 16 }}>
      <label className="field-label">Modèle de timeline</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        {active ? (
          <div style={{ flex: 1, padding: '8px 10px', background: 'rgba(201,169,110,0.08)', border: `1px solid ${GOLD}`, borderRadius: 7 }}>
            <div style={{ fontSize: 12, color: TEXT, fontWeight: 500 }}>{active.label}</div>
            <div style={{ fontSize: 10, color: MUTED, marginTop: 2 }}>{active.description}</div>
          </div>
        ) : (
          <div style={{ flex: 1, padding: '8px 10px', background: CARD, border: `1px solid ${BORDER}`, borderRadius: 7 }}>
            <div style={{ fontSize: 11, color: MUTED }}>Aucun modèle — édition JSON manuelle</div>
          </div>
        )}
        <button onClick={() => setOpen(o => !o)} style={{
          padding: '8px 12px', background: GOLD, border: 'none', color: '#fff',
          fontSize: 10, letterSpacing: 1, cursor: 'pointer', borderRadius: 6, fontFamily: sans,
          whiteSpace: 'nowrap',
        }}>
          {open ? 'Fermer' : 'Choisir'}
        </button>
      </div>

      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
          {TIMELINE_TEMPLATES.map(tpl => (
            <div key={tpl.id} onClick={() => {
              onUpdate(b => ({
                ...b,
                content: {
                  ...b.content,
                  timelineStyle: tpl.id,
                  timeline: JSON.stringify(tpl.items),
                },
              }));
              setOpen(false);
            }} style={{
              padding: '10px 12px', background: CARD,
              border: `1.5px solid ${activeId === tpl.id ? GOLD : BORDER}`,
              borderRadius: 8, cursor: 'pointer',
              boxShadow: activeId === tpl.id ? '0 2px 8px rgba(201,169,110,0.15)' : '0 1px 3px rgba(42,31,24,0.06)',
              transition: 'all 0.15s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 12, color: TEXT, fontWeight: 500, marginBottom: 2 }}>{tpl.label}</div>
                  <div style={{ fontSize: 10, color: MUTED }}>{tpl.description}</div>
                </div>
                {activeId === tpl.id && <span style={{ color: GOLD, fontSize: 13 }}>✓</span>}
              </div>
              <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {tpl.items.slice(0, 3).map((item, i) => (
                  <span key={i} style={{ fontSize: 9, color: GOLD, background: 'rgba(201,169,110,0.08)', padding: '2px 6px', borderRadius: 10 }}>
                    {item.date}
                  </span>
                ))}
                {tpl.items.length > 3 && <span style={{ fontSize: 9, color: MUTED }}>+{tpl.items.length - 3}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ContentTab({ block, onUpdate }: Props) {
  const { type, content } = block;

  switch (type) {
    case 'text_free':
      return (
        <div>
          <div style={{ padding: 12, background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 8, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.6 }}>
              Ce bloc est une <strong style={{ color: GOLD }}>zone de texte libre</strong>. Configurez la mise en forme via l'onglet <strong>Typo</strong> et ajoutez des éléments décoratifs via <strong>Calques</strong>.
            </div>
          </div>
          <Field label="Texte">
            <textarea className="studio-input" value={c(content,'text')} onChange={e => set(onUpdate,'text',e.target.value)} placeholder="Votre texte libre ici…" rows={4} style={{ resize: 'vertical' }} />
          </Field>
          <Field label="Hauteur minimale (px)">
            <input type="number" className="studio-input" value={c(content,'minHeight','80')} onChange={e => set(onUpdate,'minHeight',e.target.value)} />
          </Field>
        </div>
      );

    case 'video_intro':
      return (
        <div>
          <Field label="URL Cloudinary de la vidéo">
            <input className="studio-input" value={c(content,'videoUrl')} onChange={e => set(onUpdate,'videoUrl',e.target.value)} placeholder="https://res.cloudinary.com/eventia/video/..." />
          </Field>
          <Field label="Texte en overlay (optionnel)">
            <input className="studio-input" value={c(content,'overlayText')} onChange={e => set(onUpdate,'overlayText',e.target.value)} placeholder="Les Voiles" />
          </Field>
          <Field label="Lecture auto">
            <select className="studio-select" value={c(content,'autoplay','true')} onChange={e => set(onUpdate,'autoplay',e.target.value)}>
              <option value="true">Oui</option><option value="false">Non</option>
            </select>
          </Field>
          <Field label="Boucle">
            <select className="studio-select" value={c(content,'loop','true')} onChange={e => set(onUpdate,'loop',e.target.value)}>
              <option value="true">Oui</option><option value="false">Non</option>
            </select>
          </Field>
        </div>
      );

    case 'title_names':
      return (
        <div>
          <Field label="Prénom 1"><input className="studio-input" value={c(content,'name1')} onChange={e => set(onUpdate,'name1',e.target.value)} placeholder="Sophie" /></Field>
          <Field label="Prénom 2"><input className="studio-input" value={c(content,'name2')} onChange={e => set(onUpdate,'name2',e.target.value)} placeholder="Alexandre" /></Field>
          <Field label="Séparateur">
            <select className="studio-select" value={c(content,'separator','&')} onChange={e => set(onUpdate,'separator',e.target.value)}>
              {['&','et','×','✦','·','—'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Accroche">
            <textarea className="studio-input" value={c(content,'tagline')} onChange={e => set(onUpdate,'tagline',e.target.value)} placeholder="Nous avons l'honneur de vous convier…" rows={2} style={{ resize: 'vertical' }} />
          </Field>
        </div>
      );

    case 'date_venue':
      return (
        <div>
          <Field label="Date"><input type="date" className="studio-input" value={c(content,'date')} onChange={e => set(onUpdate,'date',e.target.value)} /></Field>
          <Field label="Heure"><input className="studio-input" value={c(content,'time')} onChange={e => set(onUpdate,'time',e.target.value)} placeholder="14h30" /></Field>
          <Field label="Lieu de cérémonie"><input className="studio-input" value={c(content,'ceremonyName')} onChange={e => set(onUpdate,'ceremonyName',e.target.value)} placeholder="Château de Vaux-le-Vicomte" /></Field>
          <Field label="Adresse">
            <textarea className="studio-input" value={c(content,'ceremonyAddress')} onChange={e => set(onUpdate,'ceremonyAddress',e.target.value)} placeholder="77950 Maincy, France" rows={2} style={{ resize: 'vertical' }} />
          </Field>
          <Field label="Lieu de réception (optionnel)"><input className="studio-input" value={c(content,'receptionName')} onChange={e => set(onUpdate,'receptionName',e.target.value)} placeholder="Salle des fêtes…" /></Field>
          <Field label="Format de la date">
            <select className="studio-select" value={c(content,'dateFormat','long')} onChange={e => set(onUpdate,'dateFormat',e.target.value)}>
              <option value="long">Samedi 12 Septembre 2026</option>
              <option value="short">12.09.2026</option>
              <option value="roman">XII · IX · MMXXVI</option>
            </select>
          </Field>
        </div>
      );

    case 'countdown':
      return (
        <div>
          <div style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 12, color: TEXT, lineHeight: 1.6 }}>
            Le compte à rebours utilise la date du bloc <strong style={{ color: GOLD }}>Date & Lieu</strong>.
          </div>
          <Field label="Style d'affichage">
            <select className="studio-select" value={c(content,'style','numbers')} onChange={e => set(onUpdate,'style',e.target.value)}>
              <option value="numbers">Chiffres</option>
              <option value="text">Texte</option>
              <option value="mixed">Mixte</option>
            </select>
          </Field>
          <Field label="Texte au-dessus"><input className="studio-input" value={c(content,'labelAbove','Le grand jour dans')} onChange={e => set(onUpdate,'labelAbove',e.target.value)} /></Field>
        </div>
      );

    case 'rsvp':
      return (
        <div>
          <Field label="Titre du RSVP"><input className="studio-input" value={c(content,'title','Votre réponse')} onChange={e => set(onUpdate,'title',e.target.value)} /></Field>
          <Field label="Question principale"><input className="studio-input" value={c(content,'q1','Serez-vous des nôtres ?')} onChange={e => set(onUpdate,'q1',e.target.value)} /></Field>
          <Field label="Nombre de personnes">
            <select className="studio-select" value={c(content,'askCount','true')} onChange={e => set(onUpdate,'askCount',e.target.value)}>
              <option value="true">Oui</option><option value="false">Non</option>
            </select>
          </Field>
          <Field label="Régime alimentaire">
            <select className="studio-select" value={c(content,'askDiet','true')} onChange={e => set(onUpdate,'askDiet',e.target.value)}>
              <option value="true">Oui</option><option value="false">Non</option>
            </select>
          </Field>
          <Field label="Message de confirmation">
            <textarea className="studio-input" value={c(content,'confirm','Merci ! Nous avons hâte de vous retrouver.')} onChange={e => set(onUpdate,'confirm',e.target.value)} rows={2} style={{ resize: 'vertical' }} />
          </Field>
        </div>
      );

    case 'dress_code':
      return (
        <div>
          <Field label="Titre"><input className="studio-input" value={c(content,'title','Dress Code')} onChange={e => set(onUpdate,'title',e.target.value)} /></Field>
          <Field label="Description">
            <textarea className="studio-input" value={c(content,'description')} onChange={e => set(onUpdate,'description',e.target.value)} placeholder="Tenue de soirée élégante. Palette de tons ivoire, champagne et or." rows={3} style={{ resize: 'vertical' }} />
          </Field>
          <Field label="Palette (HEX séparés par virgule)">
            <input className="studio-input" value={c(content,'colors')} onChange={e => set(onUpdate,'colors',e.target.value)} placeholder="#FAF8F5, #C9A96E, #2A1F18" />
          </Field>
        </div>
      );

    case 'our_story':
      return (
        <div>
          <Field label="Titre"><input className="studio-input" value={c(content,'title','Notre Histoire')} onChange={e => set(onUpdate,'title',e.target.value)} /></Field>
          <Field label="Sous-titre"><input className="studio-input" value={c(content,'subtitle','De la première rencontre au grand jour')} onChange={e => set(onUpdate,'subtitle',e.target.value)} /></Field>
          <TimelineTemplatePicker content={content} onUpdate={onUpdate} />
          <Field label="Étapes (JSON — modifiez si besoin)">
            <textarea className="studio-input" value={c(content,'timeline','[{"date":"2018","text":"Notre première rencontre"},{"date":"2022","text":"Notre voyage au Japon"},{"date":"2026","text":"Le grand jour"}]')} onChange={e => set(onUpdate,'timeline',e.target.value)} rows={7} style={{ fontSize: 11, fontFamily: 'monospace', resize: 'vertical' }} />
          </Field>
        </div>
      );

    case 'gallery':
      return (
        <div>
          <Field label="Titre"><input className="studio-input" value={c(content,'title','Nos moments')} onChange={e => set(onUpdate,'title',e.target.value)} /></Field>
          <Field label="Layout">
            <select className="studio-select" value={c(content,'layout','grid')} onChange={e => set(onUpdate,'layout',e.target.value)}>
              <option value="grid">Grille</option>
              <option value="masonry">Masonry</option>
              <option value="carousel">Carrousel</option>
              <option value="filmstrip">Filmstrip</option>
            </select>
          </Field>
          <div style={{ fontSize: 11, color: MUTED, marginTop: 4 }}>Chargez les photos dans l'onglet <strong style={{ color: GOLD }}>Médias</strong>.</div>
        </div>
      );

    case 'menu':
      return (
        <div>
          <Field label="Titre du menu"><input className="studio-input" value={c(content,'title','Le Menu')} onChange={e => set(onUpdate,'title',e.target.value)} /></Field>
          {['Entrée','Plat principal','Fromages','Dessert','Boissons'].map(course => (
            <Field key={course} label={course}>
              <textarea className="studio-input" value={c(content,course.toLowerCase().replace(/ /g,'_'))} onChange={e => set(onUpdate,course.toLowerCase().replace(/ /g,'_'),e.target.value)} rows={2} style={{ resize: 'vertical' }} placeholder={`Détail de ${course.toLowerCase()}`} />
            </Field>
          ))}
        </div>
      );

    case 'faq':
      return (
        <div>
          <Field label="Titre"><input className="studio-input" value={c(content,'title','Questions fréquentes')} onChange={e => set(onUpdate,'title',e.target.value)} /></Field>
          <Field label="Questions & Réponses (JSON)">
            <textarea className="studio-input" value={c(content,'items','[{"q":"Y a-t-il un parking ?","a":"Oui, un parking gratuit est disponible."},{"q":"Les enfants sont-ils les bienvenus ?","a":"Oui, une animation est prévue pour eux."}]')} onChange={e => set(onUpdate,'items',e.target.value)} rows={8} style={{ fontSize: 11, fontFamily: 'monospace', resize: 'vertical' }} />
          </Field>
        </div>
      );

    case 'thanks':
      return (
        <div>
          <Field label="Titre"><input className="studio-input" value={c(content,'title','Merci')} onChange={e => set(onUpdate,'title',e.target.value)} /></Field>
          <Field label="Message">
            <textarea className="studio-input" value={c(content,'message','Votre présence est le plus beau des cadeaux. Nous vous attendons avec impatience.')} onChange={e => set(onUpdate,'message',e.target.value)} rows={3} style={{ resize: 'vertical' }} />
          </Field>
          <Field label="Signature"><input className="studio-input" value={c(content,'signature')} onChange={e => set(onUpdate,'signature',e.target.value)} placeholder="Sophie & Alexandre" /></Field>
        </div>
      );

    case 'map_access':
      return (
        <div>
          <Field label="Adresse Google Maps"><input className="studio-input" value={c(content,'address')} onChange={e => set(onUpdate,'address',e.target.value)} placeholder="Château Bouffémont, 95570" /></Field>
          <Field label="Informations complémentaires">
            <textarea className="studio-input" value={c(content,'info')} onChange={e => set(onUpdate,'info',e.target.value)} placeholder="Depuis Paris : A1 sortie 6…" rows={3} style={{ resize: 'vertical' }} />
          </Field>
          <Field label="Afficher bouton Waze">
            <select className="studio-select" value={c(content,'showWaze','true')} onChange={e => set(onUpdate,'showWaze',e.target.value)}>
              <option value="true">Oui</option><option value="false">Non</option>
            </select>
          </Field>
        </div>
      );

    case 'share_link':
      return (
        <div>
          <Field label="Titre du bouton"><input className="studio-input" value={c(content,'label','Partager cette expérience')} onChange={e => set(onUpdate,'label',e.target.value)} /></Field>
          <Field label="Message de partage"><input className="studio-input" value={c(content,'message','Découvrez notre invitation…')} onChange={e => set(onUpdate,'message',e.target.value)} /></Field>
        </div>
      );

    case 'playlist':
      return (
        <div>
          <Field label="URL Spotify / Apple Music"><input className="studio-input" value={c(content,'playlistUrl')} onChange={e => set(onUpdate,'playlistUrl',e.target.value)} placeholder="https://open.spotify.com/playlist/..." /></Field>
          <Field label="Titre"><input className="studio-input" value={c(content,'title','Notre playlist')} onChange={e => set(onUpdate,'title',e.target.value)} /></Field>
          <Field label="Message">
            <textarea className="studio-input" value={c(content,'message')} onChange={e => set(onUpdate,'message',e.target.value)} placeholder="Propose une chanson pour la soirée…" rows={2} style={{ resize: 'vertical' }} />
          </Field>
        </div>
      );

    case 'live_album':
      return (
        <div>
          <Field label="URL de l'album live"><input className="studio-input" value={c(content,'albumUrl')} onChange={e => set(onUpdate,'albumUrl',e.target.value)} placeholder="https://photos.google.com/..." /></Field>
          <Field label="Titre"><input className="studio-input" value={c(content,'title','Album Photo Live')} onChange={e => set(onUpdate,'title',e.target.value)} /></Field>
          <Field label="Consigne"><textarea className="studio-input" value={c(content,'instructions','Scannez le QR code pour partager vos photos de la soirée.')} onChange={e => set(onUpdate,'instructions',e.target.value)} rows={2} style={{ resize: 'vertical' }} /></Field>
        </div>
      );

    default:
      return (
        <div style={{ textAlign: 'center', padding: '32px 0', color: MUTED }}>
          <div style={{ fontSize: 28, marginBottom: 12, color: GOLD }}>✦</div>
          <div style={{ fontSize: 12 }}>Ce bloc sera configurable dans une prochaine version.</div>
          <div style={{ fontSize: 11, marginTop: 6 }}>Type : {type}</div>
        </div>
      );
  }
}
