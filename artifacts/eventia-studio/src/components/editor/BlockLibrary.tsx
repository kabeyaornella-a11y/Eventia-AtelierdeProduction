import { useState } from 'react';
import type { Block, Formula } from '@/types';
import { BLOCK_META, FORMULA_BLOCKS, FORMULA_LABELS, getBlockMeta, isBlockInFormula } from '@/data/blocks';

interface Props {
  blocks: Block[];
  selectedId: string | null;
  formula: Formula;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onReorder: (from: number, to: number) => void;
}

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const MUTED = 'rgba(42,31,24,0.45)';
const BORDER = 'rgba(42,31,24,0.1)';
const CARD = '#FFFFFF';
const sans = "'Jost', sans-serif";

export default function BlockLibrary({ blocks, selectedId, formula, onSelect, onToggle, onReorder }: Props) {
  // Use block IDs (not filtered indices) to avoid mismatch between full and enabled lists
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const enabledBlocks = blocks.filter(b => b.enabled);
  const disabledMeta = BLOCK_META.filter(m => !blocks.some(b => b.type === m.type && b.enabled));

  const handleDrop = (targetId: string) => {
    if (!dragId || dragId === targetId) { setDragId(null); setDragOverId(null); return; }
    const fromIdx = blocks.findIndex(b => b.id === dragId);
    const toIdx   = blocks.findIndex(b => b.id === targetId);
    if (fromIdx !== -1 && toIdx !== -1) onReorder(fromIdx, toIdx);
    setDragId(null); setDragOverId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Formula tabs */}
      <div style={{ padding: '12px 12px 10px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: MUTED, marginBottom: 8 }}>
          Formule active
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {(['essentielle','signature','exception'] as Formula[]).map(f => (
            <button key={f} className={`formula-btn ${f === formula ? 'active' : 'inactive'}`}>
              {FORMULA_LABELS[f].toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '8px 12px 6px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <div style={{ fontSize: 10, color: MUTED, lineHeight: 1.5 }}>
          Cochez les blocs du client. Glisser ⠿ pour réordonner dans l'aperçu.
        </div>
      </div>

      {/* Block list */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 12, paddingTop: 6 }}>
        {/* Active / enabled blocks */}
        {enabledBlocks.map(block => {
          const meta = getBlockMeta(block.type);
          const isActive   = block.id === selectedId;
          const isDragging = block.id === dragId;
          const isOver     = block.id === dragOverId && dragId !== block.id;

          return (
            <div
              key={block.id}
              draggable
              onDragStart={e => { setDragId(block.id); e.dataTransfer.effectAllowed = 'move'; }}
              onDragOver={e => { e.preventDefault(); setDragOverId(block.id); }}
              onDrop={() => handleDrop(block.id)}
              onDragEnd={() => { setDragId(null); setDragOverId(null); }}
              onClick={() => onSelect(block.id)}
              style={{
                background: CARD,
                borderRadius: 8,
                border: `1px solid ${isActive ? GOLD : isOver ? 'rgba(201,169,110,0.5)' : BORDER}`,
                boxShadow: isActive
                  ? '0 2px 8px rgba(201,169,110,0.2)'
                  : isOver ? '0 4px 12px rgba(201,169,110,0.12)' : '0 1px 3px rgba(42,31,24,0.07)',
                margin: '4px 12px',
                padding: '11px 12px',
                display: 'flex', alignItems: 'flex-start', gap: 10,
                cursor: 'pointer',
                opacity: isDragging ? 0.35 : 1,
                transition: 'all 0.15s',
                borderTop: isOver ? `2px solid ${GOLD}` : undefined,
              }}
            >
              {/* Drag handle */}
              <span style={{ color: 'rgba(42,31,24,0.25)', fontSize: 12, cursor: 'grab', userSelect: 'none', flexShrink: 0, marginTop: 2 }}
                onMouseDown={e => e.stopPropagation()}>⠿</span>

              {/* Checkbox */}
              <div className="check-box on" onClick={e => { e.stopPropagation(); onToggle(block.id); }} style={{ marginTop: 1, flexShrink: 0, cursor: 'pointer' }} />

              {/* Label + desc */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: TEXT, fontWeight: 500, marginBottom: 2 }}>{meta.label}</div>
                <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.4 }}>{meta.description}</div>
              </div>

              {/* Layer badge */}
              {(block.layers?.length ?? 0) > 0 && (
                <span style={{ background: GOLD, color: '#fff', fontSize: 9, borderRadius: 8, padding: '2px 6px', flexShrink: 0, marginTop: 2 }}>
                  {block.layers.length}⬜
                </span>
              )}

              {isActive && <span style={{ color: GOLD, fontSize: 13, flexShrink: 0, marginTop: 2 }}>›</span>}
            </div>
          );
        })}

        {/* Disabled blocks */}
        {disabledMeta.length > 0 && (
          <div style={{ margin: '12px 12px 6px', fontSize: 9, letterSpacing: 2.5, textTransform: 'uppercase', color: MUTED }}>
            Non sélectionnés
          </div>
        )}
        {disabledMeta.map(meta => {
          const existingBlock = blocks.find(b => b.type === meta.type && !b.enabled);
          const inFormula = isBlockInFormula(meta.type, formula);
          return (
            <div key={meta.type} style={{
              background: CARD, borderRadius: 8, border: `1px solid ${BORDER}`,
              margin: '4px 12px', padding: '11px 12px',
              display: 'flex', alignItems: 'flex-start', gap: 10, opacity: 0.5,
            }}>
              <span style={{ width: 12, flexShrink: 0 }} />
              <div className="check-box off" onClick={() => existingBlock && onToggle(existingBlock.id)}
                style={{ marginTop: 1, flexShrink: 0, cursor: existingBlock ? 'pointer' : 'default' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: TEXT, marginBottom: 2 }}>{meta.label}</div>
                <div style={{ fontSize: 11, color: MUTED }}>{meta.description}</div>
                {!inFormula && (
                  <div style={{ fontSize: 9, color: GOLD, letterSpacing: 1, marginTop: 4 }}>L'Exception uniquement</div>
                )}
              </div>
            </div>
          );
        })}

        {/* Sticky show-all button */}
        <div style={{ margin: '16px 12px 4px' }}>
          <button style={{
            width: '100%', background: GOLD, border: 'none', color: '#fff',
            padding: '11px', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
            cursor: 'pointer', fontFamily: sans, borderRadius: 7,
          }}>
            Aperçu invitation client →
          </button>
        </div>
      </div>
    </div>
  );
}
