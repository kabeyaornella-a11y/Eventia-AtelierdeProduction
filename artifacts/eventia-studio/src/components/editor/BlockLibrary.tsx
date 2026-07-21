import { useState, useRef } from 'react';
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
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

export default function BlockLibrary({ blocks, selectedId, formula, onSelect, onToggle, onReorder }: Props) {
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const dragNodeRef = useRef<HTMLDivElement | null>(null);

  const enabledBlocks = blocks.filter(b => b.enabled);
  const disabledBlocks = BLOCK_META.filter(m => !blocks.some(b => b.type === m.type && b.enabled));

  const handleDragStart = (idx: number, e: React.DragEvent) => {
    setDragIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragOver = (idx: number, e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIdx(idx);
  };
  const handleDrop = (idx: number) => {
    if (dragIdx === null || dragIdx === idx) { setDragIdx(null); setDragOverIdx(null); return; }
    onReorder(dragIdx, idx);
    setDragIdx(null);
    setDragOverIdx(null);
  };
  const handleDragEnd = () => { setDragIdx(null); setDragOverIdx(null); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Formula badge */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(201,169,110,0.08)', flexShrink: 0 }}>
        <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(249,246,241,0.3)', marginBottom: 4 }}>
          Formule active
        </div>
        <div style={{ fontFamily: serif, fontSize: 15, color: GOLD }}>
          {FORMULA_LABELS[formula]}
        </div>
      </div>

      {/* Scrollable block list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>

        {/* ── ACTIFS ── */}
        <div style={{ padding: '10px 16px 6px', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(249,246,241,0.25)' }}>
          Actifs ({enabledBlocks.length})
        </div>

        {enabledBlocks.map((block, idx) => {
          const meta = getBlockMeta(block.type);
          const isDragging = dragIdx === idx;
          const isOver = dragOverIdx === idx;
          return (
            <div
              key={block.id}
              draggable
              onDragStart={e => handleDragStart(idx, e)}
              onDragOver={e => handleDragOver(idx, e)}
              onDrop={() => handleDrop(idx)}
              onDragEnd={handleDragEnd}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 12px',
                cursor: 'pointer',
                borderLeft: `2px solid ${block.id === selectedId ? GOLD : 'transparent'}`,
                background: block.id === selectedId
                  ? 'rgba(201,169,110,0.1)'
                  : isOver ? 'rgba(201,169,110,0.05)' : 'transparent',
                opacity: isDragging ? 0.4 : 1,
                transition: 'all 0.15s',
                borderTop: isOver ? `1px solid ${GOLD}` : '1px solid transparent',
              }}
              onClick={() => onSelect(block.id)}
            >
              {/* Drag handle */}
              <span style={{ color: 'rgba(249,246,241,0.2)', fontSize: 12, cursor: 'grab', userSelect: 'none', flexShrink: 0 }}>⠿</span>

              {/* Checkbox */}
              <div
                onClick={e => { e.stopPropagation(); onToggle(block.id); }}
                style={{
                  width: 16, height: 16, flexShrink: 0,
                  border: `1px solid ${GOLD}`,
                  background: 'rgba(201,169,110,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: 10,
                }}
              >
                <span style={{ color: GOLD }}>✓</span>
              </div>

              {/* Icon + label */}
              <span style={{ fontSize: 13, flexShrink: 0 }}>{meta.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: '#F9F6F1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {meta.label}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(249,246,241,0.3)', letterSpacing: 0.5 }}>
                  {String(meta.number).padStart(2, '0')}
                </div>
              </div>

              {/* Config arrow */}
              <span style={{ color: block.id === selectedId ? GOLD : 'rgba(249,246,241,0.2)', fontSize: 11 }}>›</span>
            </div>
          );
        })}

        {/* ── DISPONIBLES ── */}
        {disabledBlocks.length > 0 && (
          <>
            <div style={{ padding: '16px 16px 6px', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(249,246,241,0.25)' }}>
              Disponibles
            </div>
            {disabledBlocks.map(meta => {
              // Find if this block type exists in `blocks` (disabled)
              const existingBlock = blocks.find(b => b.type === meta.type && !b.enabled);
              const inFormula = isBlockInFormula(meta.type, formula);

              return (
                <div
                  key={meta.type}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '9px 12px', opacity: 0.5,
                  }}
                >
                  {/* Spacer for drag handle */}
                  <span style={{ width: 12, flexShrink: 0 }} />

                  {/* Checkbox (unchecked) */}
                  <div
                    onClick={() => existingBlock && onToggle(existingBlock.id)}
                    style={{
                      width: 16, height: 16, flexShrink: 0,
                      border: '1px solid rgba(249,246,241,0.2)',
                      cursor: existingBlock ? 'pointer' : 'default',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  />

                  <span style={{ fontSize: 13, flexShrink: 0 }}>{meta.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: 'rgba(249,246,241,0.6)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {meta.label}
                    </div>
                    {!inFormula && (
                      <div style={{ fontSize: 9, color: 'rgba(201,169,110,0.5)', letterSpacing: 0.5 }}>
                        L'Exception
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
