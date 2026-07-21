import type { Block } from '@/types';
import { getBlockMeta } from '@/data/blocks';

interface Props {
  blocks: Block[];
  selectedId: string | null;
  onSelectBlock: (id: string) => void;
  coupleName1: string;
  coupleName2: string;
  collection: string;
  eventDate: string | null;
}

const GOLD = '#C9A96E';
const serif = "'Cormorant Garamond', serif";
const sans  = "'Jost', sans-serif";

/* ── Individual block renderers ── */

function BlockRenderer({ block, isSelected, coupleName1, coupleName2, eventDate }: {
  block: Block; isSelected: boolean; coupleName1: string; coupleName2: string; eventDate: string | null;
}) {
  const { type, content, typography: t, media } = block;
  const title  = t.title;
  const sub    = t.subtitle;
  const body   = t.body;
  const other  = t.other;

  const fs = (style: typeof title) => ({
    fontFamily: `'${style.family}', serif`,
    fontSize: style.size,
    color: style.color,
    fontWeight: style.bold ? 700 : 400,
    fontStyle: style.italic ? 'italic' : 'normal',
    textDecoration: [style.underline && 'underline', style.strikethrough && 'line-through'].filter(Boolean).join(' ') || 'none',
    letterSpacing: style.letterSpacing,
    lineHeight: style.lineHeight,
    textAlign: style.align as any,
    backgroundColor: style.highlight || undefined,
  });

  const wrapStyle: React.CSSProperties = {
    padding: '28px 20px',
    borderLeft: isSelected ? `2px solid ${GOLD}` : '2px solid transparent',
    background: isSelected ? 'rgba(201,169,110,0.04)' : 'transparent',
    transition: 'all 0.2s',
    cursor: 'pointer',
    position: 'relative',
  };

  const c1 = coupleName1 || 'Prénom 1';
  const c2 = coupleName2 || 'Prénom 2';

  switch (type) {
    case 'video_intro':
      return (
        <div style={wrapStyle}>
          <div style={{
            aspectRatio: '9/16', background: 'linear-gradient(160deg, #12101a, #1e1428 50%, #0d1a12)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ fontSize: 18, color: GOLD, opacity: 0.5 }}>✦ ✦ ✦</div>
            <div style={{ ...fs(other), fontSize: 32, marginTop: 8 }}>
              {String(content.overlayText ?? collection) || 'Collection'}
            </div>
            <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, textAlign: 'center', ...fs(body), fontSize: 10 }}>
              Vidéo · {String(content.autoplay ?? 'true') === 'true' ? 'Lecture auto' : 'Manuel'}
            </div>
            {!content.videoUrl && (
              <div style={{ position: 'absolute', top: 8, left: 8, fontSize: 9, color: GOLD, letterSpacing: 1, background: 'rgba(0,0,0,0.5)', padding: '3px 6px' }}>
                URL à configurer
              </div>
            )}
          </div>
        </div>
      );

    case 'title_names': {
      const sep = String(content.separator ?? '&');
      return (
        <div style={{ ...wrapStyle, textAlign: (content.align as any) ?? 'center' }}>
          <div style={{ width: 40, height: 1, background: GOLD, margin: '0 auto 16px', opacity: 0.6 }} />
          <div style={{ fontSize: 10, letterSpacing: 3, ...fs(body), marginBottom: 12 }}>
            Nous avons l'honneur de vous convier
          </div>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 42) }}>
            {c1}
            <span style={{ ...fs(other), margin: '0 10px', fontSize: Math.min(other.size, 38) }}>{sep}</span>
            {c2}
          </div>
          {content.tagline && (
            <div style={{ ...fs(sub), marginTop: 14, fontSize: Math.min(sub.size, 18) }}>
              {String(content.tagline)}
            </div>
          )}
          <div style={{ width: 40, height: 1, background: GOLD, margin: '16px auto 0', opacity: 0.4 }} />
        </div>
      );
    }

    case 'date_venue': {
      const date = content.date
        ? new Date(String(content.date)).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        : 'Samedi 12 Septembre 2026';
      return (
        <div style={{ ...wrapStyle, textAlign: 'center' }}>
          <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', ...fs(body), marginBottom: 12 }}>Date & Lieu</div>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 22), marginBottom: 8 }}>{date}</div>
          <div style={{ ...fs(sub), fontSize: Math.min(sub.size, 14), marginBottom: 4 }}>{String(content.time ?? '14h30')}</div>
          <div style={{ width: 24, height: 1, background: GOLD, margin: '10px auto' }} />
          <div style={{ ...fs(sub), fontSize: Math.min(sub.size, 15) }}>
            {String(content.ceremonyName ?? 'Lieu de la cérémonie')}
          </div>
          <div style={{ ...fs(body), fontSize: Math.min(body.size, 12), marginTop: 4 }}>
            {String(content.ceremonyAddress ?? '')}
          </div>
        </div>
      );
    }

    case 'countdown':
      return (
        <div style={{ ...wrapStyle, textAlign: 'center' }}>
          <div style={{ ...fs(body), fontSize: Math.min(body.size, 11), marginBottom: 12 }}>
            {String(content.labelAbove ?? 'Le grand jour dans')}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            {[['180', 'JOURS'], ['14', 'HEURES'], ['32', 'MIN']].map(([val, lbl]) => (
              <div key={lbl} style={{ textAlign: 'center' }}>
                <div style={{ ...fs(title), fontSize: Math.min(title.size, 32), lineHeight: 1 }}>{val}</div>
                <div style={{ ...fs(body), fontSize: Math.min(body.size, 9), letterSpacing: 2, marginTop: 4 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'rsvp':
      return (
        <div style={{ ...wrapStyle, textAlign: 'center' }}>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 22), marginBottom: 16 }}>
            {String(content.title ?? 'Votre réponse')}
          </div>
          <div style={{ ...fs(body), fontSize: Math.min(body.size, 13), marginBottom: 16 }}>
            {String(content.q1 ?? 'Serez-vous des nôtres ?')}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button style={{ padding: '10px 20px', background: GOLD, border: 'none', color: '#1A1110', fontSize: 11, letterSpacing: 1.5, fontFamily: sans, cursor: 'pointer' }}>
              OUI
            </button>
            <button style={{ padding: '10px 20px', background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, fontSize: 11, letterSpacing: 1.5, fontFamily: sans, cursor: 'pointer' }}>
              NON
            </button>
          </div>
        </div>
      );

    case 'map_access':
      return (
        <div style={{ ...wrapStyle, textAlign: 'center' }}>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 20), marginBottom: 12 }}>Plan & Accès</div>
          <div style={{
            background: '#1A1514', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(201,169,110,0.15)',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🗺️</div>
              <div style={{ fontSize: 11, color: GOLD, letterSpacing: 1 }}>Carte interactive</div>
            </div>
          </div>
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 8 }}>
            <button style={{ padding: '8px 16px', background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, fontSize: 10, letterSpacing: 1.5, fontFamily: sans, cursor: 'pointer' }}>
              Google Maps
            </button>
            <button style={{ padding: '8px 16px', background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, fontSize: 10, letterSpacing: 1.5, fontFamily: sans, cursor: 'pointer' }}>
              Waze
            </button>
          </div>
        </div>
      );

    case 'dress_code':
      return (
        <div style={{ ...wrapStyle, textAlign: 'center' }}>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 22), marginBottom: 10 }}>
            {String(content.title ?? 'Dress Code')}
          </div>
          <div style={{ ...fs(body), fontSize: Math.min(body.size, 13), marginBottom: 14, lineHeight: 1.6 }}>
            {String(content.description ?? 'Tenue de soirée élégante.')}
          </div>
          {content.colors && (
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
              {String(content.colors).split(',').map(col => col.trim()).filter(Boolean).map((col, i) => (
                <div key={i} style={{ width: 28, height: 28, background: col, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%' }} />
              ))}
            </div>
          )}
        </div>
      );

    case 'our_story':
      return (
        <div style={{ ...wrapStyle }}>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 22), textAlign: 'center', marginBottom: 20 }}>
            {String(content.title ?? 'Notre Histoire')}
          </div>
          {[{ date: '2018', text: 'Notre première rencontre' }, { date: '2022', text: 'Notre voyage au Japon' }, { date: '2026', text: 'Le grand jour' }].map((entry, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
              <div style={{ ...fs(other), fontSize: 18, flexShrink: 0, width: 40, textAlign: 'right', color: GOLD }}>{entry.date}</div>
              <div style={{ width: 1, background: 'rgba(201,169,110,0.3)', alignSelf: 'stretch', flexShrink: 0 }} />
              <div style={{ ...fs(body), fontSize: Math.min(body.size, 13), lineHeight: 1.6 }}>{entry.text}</div>
            </div>
          ))}
        </div>
      );

    case 'gallery':
      return (
        <div style={{ ...wrapStyle }}>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 20), textAlign: 'center', marginBottom: 14 }}>
            {String(content.title ?? 'Nos moments')}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}>
            {media.images.slice(0, 4).map((url, i) => (
              <div key={i} style={{ aspectRatio: '1', background: '#0E0E0E', overflow: 'hidden' }}>
                <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
            {media.images.length === 0 && [0,1,2,3].map(i => (
              <div key={i} style={{ aspectRatio: '1', background: '#1A1110', border: '1px solid rgba(201,169,110,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'rgba(249,246,241,0.1)', fontSize: 20 }}>🖼</span>
              </div>
            ))}
          </div>
          {media.images.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: 8, fontSize: 10, color: 'rgba(249,246,241,0.25)' }}>
              Chargez des photos dans l'onglet Médias
            </div>
          )}
        </div>
      );

    case 'menu':
      return (
        <div style={{ ...wrapStyle, textAlign: 'center' }}>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 22), marginBottom: 16 }}>
            {String(content.title ?? 'Le Menu')}
          </div>
          {['entrée','plat_principal','fromages','dessert','boissons'].map(course => (
            content[course] ? (
              <div key={course} style={{ marginBottom: 10 }}>
                <div style={{ ...fs(sub), fontSize: Math.min(sub.size, 13), textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>
                  {course.replace('_', ' ')}
                </div>
                <div style={{ ...fs(body), fontSize: Math.min(body.size, 12) }}>{String(content[course])}</div>
                <div style={{ width: 24, height: 1, background: 'rgba(201,169,110,0.2)', margin: '10px auto' }} />
              </div>
            ) : null
          ))}
          {Object.keys(content).filter(k => ['entrée','plat_principal','fromages','dessert','boissons'].includes(k) && content[k]).length === 0 && (
            <div style={{ color: 'rgba(249,246,241,0.2)', fontSize: 12 }}>Menu à configurer dans Contenu</div>
          )}
        </div>
      );

    case 'thanks':
      return (
        <div style={{ ...wrapStyle, textAlign: 'center' }}>
          <div style={{ ...fs(other), fontSize: Math.min(other.size, 36), marginBottom: 16 }}>✦</div>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 28), marginBottom: 16 }}>
            {String(content.title ?? 'Merci')}
          </div>
          <div style={{ ...fs(body), fontSize: Math.min(body.size, 13), lineHeight: 1.7, marginBottom: 20 }}>
            {String(content.message ?? 'Votre présence est le plus beau des cadeaux.')}
          </div>
          <div style={{ ...fs(other), fontSize: Math.min(other.size, 28) }}>
            {String(content.signature ?? `${c1} & ${c2}`)}
          </div>
        </div>
      );

    default: {
      const meta = getBlockMeta(type);
      return (
        <div style={{ ...wrapStyle, textAlign: 'center', padding: '24px 20px' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>{meta.icon}</div>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 18), marginBottom: 6 }}>{meta.label}</div>
          <div style={{ fontSize: 11, color: 'rgba(249,246,241,0.3)' }}>{meta.description}</div>
        </div>
      );
    }
  }
}

export default function Preview({ blocks, selectedId, onSelectBlock, coupleName1, coupleName2, collection, eventDate }: Props) {
  const enabled = blocks.filter(b => b.enabled);

  return (
    <div style={{
      flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'flex-start',
      justifyContent: 'center', padding: '24px',
      background: 'radial-gradient(ellipse at center, #1A1514 0%, #0E0B0A 100%)',
    }}>
      {/* Outer container with scroll */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', overflow: 'hidden' }}>
        {/* Label */}
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(249,246,241,0.25)', marginBottom: 16, flexShrink: 0 }}>
          Aperçu · {enabled.length} bloc{enabled.length > 1 ? 's' : ''} actif{enabled.length > 1 ? 's' : ''}
        </div>

        {/* Phone frame */}
        <div style={{
          width: 340,
          background: '#0e0e0e',
          borderRadius: 44,
          border: '10px solid #1c1c1e',
          boxShadow: '0 0 0 1px #333, 0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(201,169,110,0.08)',
          position: 'relative',
          overflow: 'hidden',
          animation: 'phoneGlow 5s ease-in-out infinite',
          flexShrink: 0,
          maxHeight: 'calc(100% - 48px)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Dynamic island */}
          <div style={{
            position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
            width: 100, height: 26, background: '#0e0e0e',
            borderRadius: 20, zIndex: 10, flexShrink: 0,
          }} />

          {/* Screen */}
          <div style={{
            overflowY: 'auto',
            flex: 1,
            background: 'linear-gradient(180deg, #12101a 0%, #1a1110 100%)',
            paddingTop: 40,
          }}>
            {enabled.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: 'rgba(249,246,241,0.2)' }}>
                <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 18, marginBottom: 8 }}>
                  Aucun bloc actif
                </div>
                <div style={{ fontSize: 12 }}>Cochez des blocs dans la bibliothèque</div>
              </div>
            ) : (
              enabled.map(block => (
                <div key={block.id} onClick={() => onSelectBlock(block.id)}>
                  <BlockRenderer
                    block={block}
                    isSelected={block.id === selectedId}
                    coupleName1={coupleName1}
                    coupleName2={coupleName2}
                    eventDate={eventDate}
                  />
                  {/* Separator */}
                  <div style={{ height: 1, background: 'rgba(201,169,110,0.06)', margin: '0 20px' }} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
