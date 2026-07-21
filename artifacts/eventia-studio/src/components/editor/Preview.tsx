import { useRef, useState, useCallback } from 'react';
import type { Block, Layer } from '@/types';
import { getBlockMeta } from '@/data/blocks';

interface Props {
  blocks: Block[];
  selectedId: string | null;
  selectedLayerId: string | null;
  onSelectBlock: (id: string) => void;
  onSelectLayer: (id: string | null) => void;
  onUpdateLayerInBlock: (blockId: string, layerId: string, patch: Partial<Layer>) => void;
  onReorder: (from: number, to: number) => void;
  coupleName1: string;
  coupleName2: string;
  collection: string;
  eventDate: string | null;
}

const GOLD = '#C9A96E';
const serif = "'Cormorant Garamond', serif";
const sans  = "'Jost', sans-serif";

/* ── Layer element with drag-to-move + resize ── */
function LayerEl({
  layer, isSelected, blockId, screenWidth,
  onSelect, onUpdate,
}: {
  layer: Layer; isSelected: boolean; blockId: string; screenWidth: number;
  onSelect: () => void;
  onUpdate: (patch: Partial<Layer>) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Move pointer handler */
  const handleMoveDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Don't start move if pointer is on the resize handle
    if ((e.target as HTMLElement).dataset.resize) return;
    e.stopPropagation();
    onSelect();
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    const startX = e.clientX, startY = e.clientY;
    const startLX = layer.x, startLY = layer.y;
    const blockH = el.parentElement?.offsetHeight ?? 300;
    const blockW = screenWidth || 300;

    const onMove = (e: PointerEvent) => {
      const dx = ((e.clientX - startX) / blockW) * 100;
      const dy = ((e.clientY - startY) / blockH) * 100;
      onUpdate({ x: Math.max(-30, Math.min(110, startLX + dx)), y: Math.max(-30, Math.min(250, startLY + dy)) });
    };
    const onUp = () => { el.releasePointerCapture(e.pointerId); window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, [layer.x, layer.y, screenWidth, onSelect, onUpdate]);

  /* Resize pointer handler */
  const handleResizeDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    const startX = e.clientX;
    const startW = layer.width;
    const blockW = screenWidth || 300;

    const onMove = (e: PointerEvent) => {
      const dx = ((e.clientX - startX) / blockW) * 100;
      onUpdate({ width: Math.max(5, Math.min(130, startW + dx)) });
    };
    const onUp = () => { el.releasePointerCapture(e.pointerId); window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, [layer.width, screenWidth, onUpdate]);

  const content = (() => {
    switch (layer.kind) {
      case 'text':
        return (
          <div style={{
            fontFamily: `'${layer.fontFamily}', serif`,
            fontSize: layer.fontSize,
            color: layer.color,
            fontWeight: layer.bold ? 700 : 400,
            fontStyle: layer.italic ? 'italic' : 'normal',
            textAlign: layer.textAlign ?? 'center',
            whiteSpace: 'pre-wrap',
            lineHeight: 1.3,
            pointerEvents: 'none',
          }}>
            {layer.text || '✦'}
          </div>
        );
      case 'icon':
        return (
          <div style={{ fontSize: layer.fontSize, textAlign: 'center', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
            {layer.emoji}
          </div>
        );
      case 'photo':
      case 'frame':
        return layer.src
          ? <img src={layer.src} alt="" style={{ width: '100%', display: 'block', pointerEvents: 'none' }} draggable={false} />
          : <div style={{ width: '100%', aspectRatio: '1', background: 'rgba(201,169,110,0.1)', border: '1px dashed rgba(201,169,110,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: GOLD }}>
              {layer.kind === 'frame' ? '⬜' : '🖼️'}
            </div>;
      default:
        return null;
    }
  })();

  return (
    <div
      ref={containerRef}
      onPointerDown={handleMoveDown}
      style={{
        position: 'absolute',
        left: `${layer.x}%`,
        top: `${layer.y}%`,
        width: `${layer.width}%`,
        opacity: layer.opacity,
        transform: `rotate(${layer.rotation}deg)`,
        zIndex: layer.zIndex + 5,
        cursor: 'move',
        userSelect: 'none',
        touchAction: 'none',
        boxSizing: 'border-box',
        outline: isSelected ? `1.5px solid ${GOLD}` : '1.5px solid transparent',
        outlineOffset: 2,
      }}
    >
      {content}

      {/* Resize handle — bottom-right corner */}
      {isSelected && (
        <div
          data-resize="true"
          onPointerDown={handleResizeDown}
          style={{
            position: 'absolute', bottom: -6, right: -6,
            width: 12, height: 12,
            background: GOLD, border: '2px solid #fff',
            borderRadius: 3, cursor: 'se-resize', zIndex: 200,
            boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
            touchAction: 'none',
          }}
        />
      )}

      {/* Move hint badge */}
      {isSelected && (
        <div style={{
          position: 'absolute', top: -18, left: 0,
          fontSize: 8, color: GOLD, background: 'rgba(12,10,9,0.7)',
          padding: '2px 5px', borderRadius: 3, letterSpacing: 0.5,
          whiteSpace: 'nowrap', pointerEvents: 'none',
        }}>
          DÉPLACER · REDIMENSIONNER ↘
        </div>
      )}
    </div>
  );
}

/* ── Individual block content renderers ── */
function BlockContent({ block, coupleName1, coupleName2, eventDate, collection }: {
  block: Block; coupleName1: string; coupleName2: string; eventDate: string | null; collection: string;
}) {
  const { type, content, typography: t, media } = block;
  const title = t.title, sub = t.subtitle, body = t.body, other = t.other;

  const fs = (style: typeof title) => ({
    fontFamily: `'${style.family}', serif`,
    fontSize: style.size, color: style.color,
    fontWeight: style.bold ? 700 : 400,
    fontStyle: style.italic ? 'italic' : 'normal',
    textDecoration: [style.underline && 'underline', style.strikethrough && 'line-through'].filter(Boolean).join(' ') || 'none',
    letterSpacing: style.letterSpacing, lineHeight: style.lineHeight,
    textAlign: style.align as any,
    backgroundColor: style.highlight || undefined,
  });

  const c1 = coupleName1 || 'Prénom 1', c2 = coupleName2 || 'Prénom 2';
  const pad: React.CSSProperties = { padding: '28px 20px' };

  switch (type) {
    case 'text_free':
      return (
        <div style={{ ...pad, textAlign: 'center', minHeight: Number(content.minHeight) || 80 }}>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 28) }}>
            {String(content.text || 'Zone de texte libre')}
          </div>
        </div>
      );

    case 'video_intro':
      return (
        <div style={{ aspectRatio: '9/16', background: 'linear-gradient(160deg,#12101a,#1e1428 50%,#0d1a12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ fontSize: 18, color: GOLD, opacity: 0.5 }}>✦ ✦ ✦</div>
          <div style={{ ...fs(other), fontSize: 32, marginTop: 8 }}>{String(content.overlayText ?? collection) || 'Collection'}</div>
          {!content.videoUrl && (
            <div style={{ position: 'absolute', top: 8, left: 8, fontSize: 9, color: GOLD, letterSpacing: 1, background: 'rgba(0,0,0,0.5)', padding: '3px 6px' }}>URL à configurer</div>
          )}
        </div>
      );

    case 'title_names':
      return (
        <div style={{ ...pad, textAlign: 'center' }}>
          <div style={{ width: 40, height: 1, background: GOLD, margin: '0 auto 16px', opacity: 0.6 }} />
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 42) }}>
            {c1}
            <span style={{ ...fs(other), margin: '0 10px', fontSize: Math.min(other.size, 38) }}>{String(content.separator ?? '&')}</span>
            {c2}
          </div>
          {content.tagline && <div style={{ ...fs(sub), marginTop: 14, fontSize: Math.min(sub.size, 18) }}>{String(content.tagline)}</div>}
          <div style={{ width: 40, height: 1, background: GOLD, margin: '16px auto 0', opacity: 0.4 }} />
        </div>
      );

    case 'date_venue': {
      const date = content.date
        ? new Date(String(content.date)).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        : 'Samedi 12 Septembre 2026';
      return (
        <div style={{ ...pad, textAlign: 'center' }}>
          <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', ...fs(body), marginBottom: 12 }}>Date & Lieu</div>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 20), marginBottom: 8 }}>{date}</div>
          <div style={{ ...fs(sub), fontSize: Math.min(sub.size, 14), marginBottom: 4 }}>{String(content.time ?? '14h30')}</div>
          <div style={{ width: 24, height: 1, background: GOLD, margin: '10px auto' }} />
          <div style={{ ...fs(sub), fontSize: Math.min(sub.size, 15) }}>{String(content.ceremonyName ?? 'Lieu de la cérémonie')}</div>
          <div style={{ ...fs(body), fontSize: Math.min(body.size, 12), marginTop: 4 }}>{String(content.ceremonyAddress ?? '')}</div>
        </div>
      );
    }

    case 'countdown':
      return (
        <div style={{ ...pad, textAlign: 'center' }}>
          <div style={{ ...fs(body), fontSize: Math.min(body.size, 11), marginBottom: 12 }}>{String(content.labelAbove ?? 'Le grand jour dans')}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            {[['180','JOURS'],['14','HEURES'],['32','MIN']].map(([val,lbl]) => (
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
        <div style={{ ...pad, textAlign: 'center' }}>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 22), marginBottom: 16 }}>{String(content.title ?? 'Votre réponse')}</div>
          <div style={{ ...fs(body), fontSize: Math.min(body.size, 13), marginBottom: 16 }}>{String(content.q1 ?? 'Serez-vous des nôtres ?')}</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button style={{ padding: '10px 20px', background: GOLD, border: 'none', color: '#1A1110', fontSize: 11, letterSpacing: 1.5, fontFamily: sans }}>OUI</button>
            <button style={{ padding: '10px 20px', background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, fontSize: 11, letterSpacing: 1.5, fontFamily: sans }}>NON</button>
          </div>
        </div>
      );

    case 'our_story': {
      let items: { date: string; text: string }[] = [];
      try { items = JSON.parse(String(content.timeline ?? '[]')); } catch {}
      if (items.length === 0) items = [{ date: '2019', text: 'Notre rencontre' }, { date: '2026', text: 'Le grand jour' }];
      const style = String(content.timelineStyle ?? 'vertical');
      return (
        <div style={pad}>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 20), textAlign: 'center', marginBottom: 20 }}>{String(content.title ?? 'Notre Histoire')}</div>
          {style === 'minimal' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              {items.map((item, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ ...fs(other), fontSize: 20, color: GOLD, marginBottom: 4 }}>{item.date}</div>
                  <div style={{ ...fs(body), fontSize: Math.min(body.size, 13) }}>{item.text}</div>
                </div>
              ))}
            </div>
          ) : style === 'circles' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              {items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 16, height: 16, border: `2px solid ${GOLD}`, borderRadius: '50%', background: 'transparent', flexShrink: 0, marginTop: 2 }} />
                    {i < items.length - 1 && <div style={{ width: 1, height: 32, background: 'rgba(201,169,110,0.3)' }} />}
                  </div>
                  <div style={{ paddingBottom: 16 }}>
                    <div style={{ ...fs(other), fontSize: 14, color: GOLD, marginBottom: 2 }}>{item.date}</div>
                    <div style={{ ...fs(body), fontSize: Math.min(body.size, 12) }}>{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
                <div style={{ ...fs(other), fontSize: 18, flexShrink: 0, width: 44, textAlign: 'right', color: GOLD }}>{item.date}</div>
                <div style={{ width: 1, background: 'rgba(201,169,110,0.3)', alignSelf: 'stretch', flexShrink: 0 }} />
                <div style={{ ...fs(body), fontSize: Math.min(body.size, 13), lineHeight: 1.6 }}>{item.text}</div>
              </div>
            ))
          )}
        </div>
      );
    }

    case 'gallery':
      return (
        <div style={pad}>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 20), textAlign: 'center', marginBottom: 14 }}>{String(content.title ?? 'Nos moments')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 4 }}>
            {media.images.slice(0, 4).map((url, i) => (
              <div key={i} style={{ aspectRatio: '1', overflow: 'hidden' }}>
                <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
            {media.images.length === 0 && [0,1,2,3].map(i => (
              <div key={i} style={{ aspectRatio: '1', background: '#1A1110', border: '1px solid rgba(201,169,110,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'rgba(249,246,241,0.15)', fontSize: 20 }}>🖼</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'dress_code':
      return (
        <div style={{ ...pad, textAlign: 'center' }}>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 22), marginBottom: 10 }}>{String(content.title ?? 'Dress Code')}</div>
          <div style={{ ...fs(body), fontSize: Math.min(body.size, 13), marginBottom: 14, lineHeight: 1.6 }}>{String(content.description ?? 'Tenue de soirée élégante.')}</div>
          {content.colors && (
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
              {String(content.colors).split(',').map(c => c.trim()).filter(Boolean).map((col, i) => (
                <div key={i} style={{ width: 28, height: 28, background: col, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%' }} />
              ))}
            </div>
          )}
        </div>
      );

    case 'map_access':
      return (
        <div style={{ ...pad, textAlign: 'center' }}>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 20), marginBottom: 12 }}>Plan & Accès</div>
          <div style={{ background: '#1A1514', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(201,169,110,0.15)', marginBottom: 10 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>🗺️</div>
              <div style={{ fontSize: 10, color: GOLD, letterSpacing: 1 }}>Carte interactive</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            <button style={{ padding: '7px 14px', background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, fontSize: 10, letterSpacing: 1.5, fontFamily: sans }}>Google Maps</button>
            <button style={{ padding: '7px 14px', background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, fontSize: 10, letterSpacing: 1.5, fontFamily: sans }}>Waze</button>
          </div>
        </div>
      );

    case 'menu': {
      const courses = ['entrée','plat_principal','fromages','dessert','boissons'];
      const hasCourses = courses.some(c => block.content[c]);
      return (
        <div style={{ ...pad, textAlign: 'center' }}>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 22), marginBottom: 16 }}>{String(content.title ?? 'Le Menu')}</div>
          {hasCourses ? courses.map(course => content[course] ? (
            <div key={course} style={{ marginBottom: 10 }}>
              <div style={{ ...fs(sub), fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>{course.replace('_',' ')}</div>
              <div style={{ ...fs(body), fontSize: 12 }}>{String(content[course])}</div>
              <div style={{ width: 24, height: 1, background: 'rgba(201,169,110,0.2)', margin: '10px auto' }} />
            </div>
          ) : null) : <div style={{ color: 'rgba(249,246,241,0.2)', fontSize: 12 }}>Menu à configurer dans Contenu</div>}
        </div>
      );
    }

    case 'thanks':
      return (
        <div style={{ ...pad, textAlign: 'center' }}>
          <div style={{ ...fs(other), fontSize: Math.min(other.size, 36), marginBottom: 16 }}>✦</div>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 28), marginBottom: 16 }}>{String(content.title ?? 'Merci')}</div>
          <div style={{ ...fs(body), fontSize: Math.min(body.size, 13), lineHeight: 1.7, marginBottom: 20 }}>{String(content.message ?? 'Votre présence est le plus beau des cadeaux.')}</div>
          <div style={{ ...fs(other), fontSize: Math.min(other.size, 28) }}>{String(content.signature ?? `${c1} & ${c2}`)}</div>
        </div>
      );

    default: {
      const meta = getBlockMeta(type);
      return (
        <div style={{ ...pad, textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>{meta.icon}</div>
          <div style={{ ...fs(title), fontSize: Math.min(title.size, 18), marginBottom: 6 }}>{meta.label}</div>
          <div style={{ fontSize: 11, color: 'rgba(249,246,241,0.3)' }}>{meta.description}</div>
        </div>
      );
    }
  }
}

/* ── Main Preview ── */
export default function Preview({
  blocks, selectedId, selectedLayerId,
  onSelectBlock, onSelectLayer, onUpdateLayerInBlock,
  onReorder, coupleName1, coupleName2, collection, eventDate,
}: Props) {
  const enabled = blocks.filter(b => b.enabled);
  const screenRef = useRef<HTMLDivElement>(null);
  const [blockDragId, setBlockDragId] = useState<string | null>(null);
  const [blockDragOverId, setBlockDragOverId] = useState<string | null>(null);

  const handleBlockDrop = (targetId: string) => {
    if (!blockDragId || blockDragId === targetId) { setBlockDragId(null); setBlockDragOverId(null); return; }
    const fromIdx = blocks.findIndex(b => b.id === blockDragId);
    const toIdx   = blocks.findIndex(b => b.id === targetId);
    if (fromIdx !== -1 && toIdx !== -1) onReorder(fromIdx, toIdx);
    setBlockDragId(null); setBlockDragOverId(null);
  };

  const screenWidth = screenRef.current?.offsetWidth ?? 300;

  return (
    <div style={{
      flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'flex-start',
      justifyContent: 'center', padding: '24px',
      background: 'radial-gradient(ellipse at center,#1A1514 0%,#0E0B0A 100%)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', overflow: 'hidden' }}>
        {/* Label */}
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(249,246,241,0.25)', marginBottom: 16, flexShrink: 0 }}>
          Aperçu · {enabled.length} bloc{enabled.length !== 1 ? 's' : ''} · {enabled.reduce((n, b) => n + (b.layers?.length ?? 0), 0)} calque{enabled.reduce((n, b) => n + (b.layers?.length ?? 0), 0) !== 1 ? 's' : ''}
        </div>

        {/* Phone frame */}
        <div style={{
          width: 340, background: '#0e0e0e', borderRadius: 44,
          border: '10px solid #1c1c1e',
          boxShadow: '0 0 0 1px #333, 0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(201,169,110,0.08)',
          position: 'relative', overflow: 'hidden', flexShrink: 0,
          maxHeight: 'calc(100% - 48px)', display: 'flex', flexDirection: 'column',
        }}>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
            width: 100, height: 26, background: '#0e0e0e', borderRadius: 20, zIndex: 10,
          }} />

          {/* Screen */}
          <div
            ref={screenRef}
            onClick={() => { onSelectLayer(null); }}
            style={{
              overflowY: 'auto', flex: 1,
              background: 'linear-gradient(180deg,#12101a 0%,#1a1110 100%)',
              paddingTop: 40,
            }}
          >
            {enabled.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: 'rgba(249,246,241,0.2)' }}>
                <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 18, marginBottom: 8 }}>Aucun bloc actif</div>
                <div style={{ fontSize: 12 }}>Cochez des blocs dans la bibliothèque</div>
              </div>
            ) : (
              enabled.map(block => {
                const isDragOver = blockDragOverId === block.id && blockDragId !== block.id;
                return (
                  <div
                    key={block.id}
                    draggable
                    onDragStart={e => { setBlockDragId(block.id); e.dataTransfer.effectAllowed = 'move'; }}
                    onDragOver={e => { e.preventDefault(); setBlockDragOverId(block.id); }}
                    onDrop={e => { e.stopPropagation(); handleBlockDrop(block.id); }}
                    onDragEnd={() => { setBlockDragId(null); setBlockDragOverId(null); }}
                    onClick={e => { e.stopPropagation(); onSelectBlock(block.id); onSelectLayer(null); }}
                    style={{
                      position: 'relative',
                      borderLeft: block.id === selectedId ? `2px solid ${GOLD}` : '2px solid transparent',
                      borderTop: isDragOver ? `2px solid ${GOLD}` : '2px solid transparent',
                      background: block.id === selectedId ? 'rgba(201,169,110,0.04)' : 'transparent',
                      opacity: blockDragId === block.id ? 0.3 : 1,
                      transition: 'opacity 0.15s',
                    }}
                  >
                    {/* Drag handle */}
                    <div
                      title="Glisser pour réordonner"
                      style={{
                        position: 'absolute', top: 4, right: 4, zIndex: 20,
                        background: 'rgba(201,169,110,0.15)', color: GOLD,
                        fontSize: 10, borderRadius: 4, padding: '3px 5px',
                        cursor: 'grab', userSelect: 'none',
                        opacity: 0, transition: 'opacity 0.15s',
                      }}
                      className="preview-drag-handle"
                    >⠿</div>

                    {/* Block content */}
                    <BlockContent
                      block={block}
                      coupleName1={coupleName1}
                      coupleName2={coupleName2}
                      eventDate={eventDate}
                      collection={collection}
                    />

                    {/* Layers overlay */}
                    {(block.layers?.length ?? 0) > 0 && (
                      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
                        {block.layers.map(layer => (
                          <div key={layer.id} style={{ pointerEvents: 'all' }}>
                            <LayerEl
                              layer={layer}
                              isSelected={layer.id === selectedLayerId}
                              blockId={block.id}
                              screenWidth={screenWidth}
                              onSelect={() => { onSelectBlock(block.id); onSelectLayer(layer.id); }}
                              onUpdate={(patch) => onUpdateLayerInBlock(block.id, layer.id, patch)}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Separator */}
                    <div style={{ height: 1, background: 'rgba(201,169,110,0.06)', margin: '0 20px' }} />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Controls below phone */}
        <div style={{ marginTop: 14, fontSize: 9, letterSpacing: 2, color: 'rgba(249,246,241,0.18)', textAlign: 'center' }}>
          GLISSER ⠿ POUR RÉORDONNER · TOUCHER UN BLOC POUR ÉDITER
        </div>
      </div>
    </div>
  );
}
