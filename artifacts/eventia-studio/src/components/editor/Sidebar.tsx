import { useState } from 'react';
import type { Block, Formula } from '@/types';
import BlockLibrary from './BlockLibrary';
import BlockConfig from './BlockConfig';

interface Props {
  open: boolean;
  onToggle: () => void;
  blocks: Block[];
  selectedId: string | null;
  formula: Formula;
  onSelectBlock: (id: string | null) => void;
  onToggleBlock: (id: string) => void;
  onUpdateBlock: (id: string, updater: (b: Block) => Block) => void;
  onReorder: (from: number, to: number) => void;
}

const GOLD = '#C9A96E';
const sans = "'Jost', sans-serif";

export default function Sidebar({
  open, onToggle, blocks, selectedId, formula,
  onSelectBlock, onToggleBlock, onUpdateBlock, onReorder,
}: Props) {
  const [mode, setMode] = useState<'library' | 'config'>('library');
  const selectedBlock = blocks.find(b => b.id === selectedId) ?? null;

  const handleSelectBlock = (id: string) => {
    onSelectBlock(id);
    setMode('config');
  };

  const handleBackToLibrary = () => {
    setMode('library');
    onSelectBlock(null);
  };

  return (
    <div style={{
      width: open ? 300 : 48,
      transition: 'width 0.3s ease',
      background: 'hsl(20 18% 6%)',
      borderRight: '1px solid rgba(201,169,110,0.1)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      flexShrink: 0,
      position: 'relative',
    }}>
      {/* Collapse/expand toggle */}
      <button
        onClick={onToggle}
        title={open ? 'Réduire' : 'Ouvrir'}
        style={{
          position: 'absolute',
          top: 12,
          right: open ? 12 : '50%',
          transform: open ? 'none' : 'translateX(50%)',
          width: 24, height: 24,
          background: 'transparent',
          border: '1px solid rgba(201,169,110,0.2)',
          color: GOLD,
          cursor: 'pointer',
          fontSize: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10,
          transition: 'right 0.3s, transform 0.3s',
          fontFamily: sans,
          borderRadius: 2,
        }}
      >
        {open ? '‹' : '›'}
      </button>

      {!open && (
        /* Collapsed: show block icons vertically */
        <div style={{ paddingTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          {blocks.filter(b => b.enabled).map(b => {
            const meta = blocks.find(bl => bl.id === b.id);
            return (
              <button
                key={b.id}
                onClick={() => { onToggle(); handleSelectBlock(b.id); }}
                title={b.type}
                style={{
                  width: 32, height: 32,
                  background: b.id === selectedId ? 'rgba(201,169,110,0.15)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#F9F6F1',
                }}
              >
                ◆
              </button>
            );
          })}
        </div>
      )}

      {open && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: 44 }}>
          {mode === 'library' || !selectedBlock ? (
            <BlockLibrary
              blocks={blocks}
              selectedId={selectedId}
              formula={formula}
              onSelect={handleSelectBlock}
              onToggle={onToggleBlock}
              onReorder={onReorder}
            />
          ) : (
            <BlockConfig
              block={selectedBlock}
              onBack={handleBackToLibrary}
              onUpdate={(updater) => onUpdateBlock(selectedBlock.id, updater)}
            />
          )}
        </div>
      )}
    </div>
  );
}
