import type { Block, BlockContent } from '@/types';

interface Props {
  block: Block;
  onUpdate: (updater: (b: Block) => Block) => void;
}

const sans = "'Jost', sans-serif";
const serif = "'Cormorant Garamond', serif";
const GOLD = '#C9A96E';

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

function Input({ value, onChange, placeholder, multiline }: { value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean }) {
  if (multiline) return (
    <textarea
      className="studio-input"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      style={{ resize: 'vertical' }}
    />
  );
  return (
    <input
      className="studio-input"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

const c = (content: BlockContent, key: string, fallback = '') => String(content[key] ?? fallback);

export default function ContentTab({ block, onUpdate }: Props) {
  const { type, content } = block;

  switch (type) {
    case 'video_intro':
      return (
        <div>
          <Field label="URL Cloudinary de la vidéo">
            <Input value={c(content,'videoUrl')} onChange={v => set(onUpdate,'videoUrl',v)} placeholder="https://res.cloudinary.com/eventia/video/..." />
          </Field>
          <Field label="Texte en overlay (optionnel)">
            <Input value={c(content,'overlayText')} onChange={v => set(onUpdate,'overlayText',v)} placeholder="Les Voiles" />
          </Field>
          <Field label="Lecture auto">
            <select className="studio-select" value={c(content,'autoplay','true')} onChange={e => set(onUpdate,'autoplay',e.target.value)}>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </Field>
          <Field label="Boucle">
            <select className="studio-select" value={c(content,'loop','true')} onChange={e => set(onUpdate,'loop',e.target.value)}>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </Field>
        </div>
      );

    case 'title_names':
      return (
        <div>
          <Field label="Prénom 1"><Input value={c(content,'name1')} onChange={v => set(onUpdate,'name1',v)} placeholder="Sophie" /></Field>
          <Field label="Prénom 2"><Input value={c(content,'name2')} onChange={v => set(onUpdate,'name2',v)} placeholder="Alexandre" /></Field>
          <Field label="Séparateur">
            <select className="studio-select" value={c(content,'separator','&')} onChange={e => set(onUpdate,'separator',e.target.value)}>
              {['&','et','×','✦','·','—'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Accroche (sous les prénoms)">
            <Input value={c(content,'tagline')} onChange={v => set(onUpdate,'tagline',v)} placeholder="Nous avons l'honneur de vous convier…" multiline />
          </Field>
          <Field label="Alignement">
            <select className="studio-select" value={c(content,'align','center')} onChange={e => set(onUpdate,'align',e.target.value)}>
              <option value="left">Gauche</option>
              <option value="center">Centré</option>
              <option value="right">Droite</option>
            </select>
          </Field>
        </div>
      );

    case 'date_venue':
      return (
        <div>
          <Field label="Date">
            <input type="date" className="studio-input" value={c(content,'date')} onChange={e => set(onUpdate,'date',e.target.value)} />
          </Field>
          <Field label="Heure">
            <Input value={c(content,'time')} onChange={v => set(onUpdate,'time',v)} placeholder="14h30" />
          </Field>
          <Field label="Nom du lieu de cérémonie">
            <Input value={c(content,'ceremonyName')} onChange={v => set(onUpdate,'ceremonyName',v)} placeholder="Château de Vaux-le-Vicomte" />
          </Field>
          <Field label="Adresse de la cérémonie">
            <Input value={c(content,'ceremonyAddress')} onChange={v => set(onUpdate,'ceremonyAddress',v)} placeholder="77950 Maincy, France" multiline />
          </Field>
          <Field label="Nom du lieu de réception (optionnel)">
            <Input value={c(content,'receptionName')} onChange={v => set(onUpdate,'receptionName',v)} placeholder="Salle des fêtes…" />
          </Field>
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
          <p style={{ fontSize: 12, color: 'rgba(249,246,241,0.5)', lineHeight: 1.6, marginBottom: 16 }}>
            Le compte à rebours est calculé automatiquement depuis la date saisie dans le bloc <strong style={{ color: GOLD }}>Date & Lieu</strong>.
          </p>
          <Field label="Style d'affichage">
            <select className="studio-select" value={c(content,'style','numbers')} onChange={e => set(onUpdate,'style',e.target.value)}>
              <option value="numbers">Chiffres (180j 14h 32m 10s)</option>
              <option value="text">Texte (180 jours restants)</option>
              <option value="mixed">Mixte (180 JOURS · 14 HEURES)</option>
            </select>
          </Field>
          <Field label="Texte au-dessus">
            <Input value={c(content,'labelAbove','Le grand jour dans')} onChange={v => set(onUpdate,'labelAbove',v)} placeholder="Le grand jour dans" />
          </Field>
        </div>
      );

    case 'rsvp':
      return (
        <div>
          <Field label="Titre du bloc RSVP">
            <Input value={c(content,'title','Votre réponse')} onChange={v => set(onUpdate,'title',v)} />
          </Field>
          <Field label="Question présence">
            <Input value={c(content,'q1','Serez-vous des nôtres ?')} onChange={v => set(onUpdate,'q1',v)} />
          </Field>
          <Field label="Demander le nombre de personnes">
            <select className="studio-select" value={c(content,'askCount','true')} onChange={e => set(onUpdate,'askCount',e.target.value)}>
              <option value="true">Oui</option><option value="false">Non</option>
            </select>
          </Field>
          <Field label="Demander régime alimentaire">
            <select className="studio-select" value={c(content,'askDiet','true')} onChange={e => set(onUpdate,'askDiet',e.target.value)}>
              <option value="true">Oui</option><option value="false">Non</option>
            </select>
          </Field>
          <Field label="Message de confirmation">
            <Input value={c(content,'confirm','Merci ! Nous avons hâte de vous retrouver.')} onChange={v => set(onUpdate,'confirm',v)} multiline />
          </Field>
        </div>
      );

    case 'dress_code':
      return (
        <div>
          <Field label="Titre">
            <Input value={c(content,'title','Dress Code')} onChange={v => set(onUpdate,'title',v)} />
          </Field>
          <Field label="Description">
            <Input value={c(content,'description')} onChange={v => set(onUpdate,'description',v)} placeholder="Tenue de soirée élégante. Palette de tons ivoire, champagne et or." multiline />
          </Field>
          <Field label="Palette de couleurs (HEX séparés par virgule)">
            <Input value={c(content,'colors')} onChange={v => set(onUpdate,'colors',v)} placeholder="#FAF8F5, #C9A96E, #2A1F18" />
          </Field>
        </div>
      );

    case 'our_story':
      return (
        <div>
          <Field label="Titre">
            <Input value={c(content,'title','Notre Histoire')} onChange={v => set(onUpdate,'title',v)} />
          </Field>
          <Field label="Sous-titre">
            <Input value={c(content,'subtitle','De la première rencontre au grand jour')} onChange={v => set(onUpdate,'subtitle',v)} />
          </Field>
          <Field label="Entrées de la timeline (JSON)">
            <textarea
              className="studio-input"
              value={c(content,'timeline','[{"date":"2018","text":"Notre première rencontre"},{"date":"2020","text":"Notre premier voyage"},{"date":"2026","text":"Le grand jour"}]')}
              onChange={e => set(onUpdate,'timeline',e.target.value)}
              rows={6}
              style={{ fontSize: 11, fontFamily: 'monospace', resize: 'vertical' }}
            />
          </Field>
        </div>
      );

    case 'gallery':
      return (
        <div>
          <Field label="Titre">
            <Input value={c(content,'title','Nos moments')} onChange={v => set(onUpdate,'title',v)} />
          </Field>
          <Field label="Layout">
            <select className="studio-select" value={c(content,'layout','grid')} onChange={e => set(onUpdate,'layout',e.target.value)}>
              <option value="grid">Grille</option>
              <option value="masonry">Masonry</option>
              <option value="carousel">Carrousel</option>
              <option value="filmstrip">Filmstrip</option>
            </select>
          </Field>
          <p style={{ fontSize: 11, color: 'rgba(249,246,241,0.4)', marginTop: 8 }}>
            Chargez les photos dans l'onglet <strong style={{ color: GOLD }}>Médias</strong>.
          </p>
        </div>
      );

    case 'menu':
      return (
        <div>
          <Field label="Titre du menu">
            <Input value={c(content,'title','Le Menu')} onChange={v => set(onUpdate,'title',v)} />
          </Field>
          {['Entrée','Plat principal','Fromages','Dessert','Boissons'].map(course => (
            <Field key={course} label={course}>
              <Input value={c(content,course.toLowerCase().replace(/ /g,'_'))} onChange={v => set(onUpdate,course.toLowerCase().replace(/ /g,'_'),v)} placeholder={`Détail de ${course.toLowerCase()}`} multiline />
            </Field>
          ))}
        </div>
      );

    case 'faq':
      return (
        <div>
          <Field label="Titre">
            <Input value={c(content,'title','Questions fréquentes')} onChange={v => set(onUpdate,'title',v)} />
          </Field>
          <Field label="Questions & Réponses (JSON)">
            <textarea
              className="studio-input"
              value={c(content,'items','[{"q":"Y a-t-il un parking ?","a":"Oui, un parking gratuit est disponible."},{"q":"Les enfants sont-ils les bienvenus ?","a":"Nous vous informerons bientôt."}]')}
              onChange={e => set(onUpdate,'items',e.target.value)}
              rows={8}
              style={{ fontSize: 11, fontFamily: 'monospace', resize: 'vertical' }}
            />
          </Field>
        </div>
      );

    case 'thanks':
      return (
        <div>
          <Field label="Titre">
            <Input value={c(content,'title','Merci')} onChange={v => set(onUpdate,'title',v)} />
          </Field>
          <Field label="Message de remerciements">
            <Input value={c(content,'message','Votre présence est le plus beau des cadeaux. Nous vous attendons avec impatience.')} onChange={v => set(onUpdate,'message',v)} multiline />
          </Field>
          <Field label="Signature">
            <Input value={c(content,'signature')} onChange={v => set(onUpdate,'signature',v)} placeholder="Sophie & Alexandre" />
          </Field>
        </div>
      );

    default:
      return (
        <div style={{ textAlign: 'center', padding: '32px 0', color: 'rgba(249,246,241,0.3)' }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>✦</div>
          <div style={{ fontSize: 12 }}>Contenu configurable dans une prochaine version.</div>
          <div style={{ fontSize: 11, marginTop: 6, color: 'rgba(249,246,241,0.2)' }}>Bloc : {type}</div>
        </div>
      );
  }
}
