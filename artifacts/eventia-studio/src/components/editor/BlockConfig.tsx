import { useState } from 'react';
import type { Block, Layer, LayerKind } from '@/types';
import { getBlockMeta } from '@/data/blocks';
import ContentTab from './tabs/ContentTab';
import TypographyTab from './tabs/TypographyTab';
import MediaTab from './tabs/MediaTab';
import AnimationTab from './tabs/AnimationTab';
import CalquesTab from './tabs/CalquesTab';

interface Props {
  block: Block;
  onBack: () => void;
  onUpdate: (updater: (b: Block) => Block) => void;
  // Layer props
  selectedLayerId: string | null;
  onSelectLayer: (id: string | null) => void;
  onAddLayer: (kind: LayerKind, extra?: Partial<Layer>) => void;
  onUpdateLayer: (layerId: string, patch: Partial<Layer>) => void;
  onDeleteLayer: (layerId: string) => void;
  onReorderLayer: (from: number, to: number) => void;
}

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const MUTED = 'rgba(42,31,24,0.45)';
const BORDER = 'rgba(42,31,24,0.1)';
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

type Tab = 'content' | 'typography' | 'media' | 'animation' | 'calques';

const TABS: { id: Tab; label: string }[] = [
  { id: 'content',    label: 'Contenu' },
  { id: 'typography', label: 'Typo' },
  { id: 'media',      label: 'Médias' },
  { id: 'animation',  label: 'Anim.' },
  { id: 'calques',    label: '⬜ Calques' },
];

export default function BlockConfig({
  block, onBack, onUpdate,
  selectedLayerId, onSelectLayer, onAddLayer, onUpdateLayer, onDeleteLayer, onReorderLayer,
}: Props) {
  const [tab, setTab] = useState<Tab>('content');
  const meta = getBlockMeta(block.type);
  const layerCount = block.layers?.length ?? 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Back + block name */}
      <div style={{ padding: '10px 14px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0, background: '#FAF6F0' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: MUTED, cursor: 'pointer', fontSize: 11, fontFamily: sans, padding: 0, display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
          ← Bibliothèque
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: GOLD, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>
            {meta.icon}
          </div>
          <div>
            <div style={{ fontFamily: serif, fontSize: 15, color: TEXT }}>{meta.label}</div>
            <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1 }}>
              {layerCount > 0 ? `${layerCount} calque${layerCount > 1 ? 's' : ''}` : 'Aucun calque'} · Bloc {String(meta.number).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${BORDER}`, flexShrink: 0, background: '#FAF6F0', overflowX: 'auto' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: t.id === 'calques' ? '1.4' : '1',
            padding: '9px 4px', fontSize: 9.5,
            letterSpacing: 0.5, textTransform: 'uppercase', textAlign: 'center',
            background: 'transparent',
            border: 'none',
            borderBottom: tab === t.id ? `2px solid ${GOLD}` : '2px solid transparent',
            color: tab === t.id ? GOLD : MUTED,
            cursor: 'pointer', transition: 'all 0.2s',
            fontFamily: sans, whiteSpace: 'nowrap',
            position: 'relative',
          }}>
            {t.label}
            {t.id === 'calques' && layerCount > 0 && (
              <span style={{ marginLeft: 4, background: GOLD, color: '#fff', borderRadius: 8, padding: '1px 5px', fontSize: 8 }}>
                {layerCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 14, background: '#FAF6F0' }}>
        {tab === 'content'    && <ContentTab    block={block} onUpdate={onUpdate} />}
        {tab === 'typography' && <TypographyTab  block={block} onUpdate={onUpdate} />}
        {tab === 'media'      && <MediaTab       block={block} onUpdate={onUpdate} />}
        {tab === 'animation'  && <AnimationTab   block={block} onUpdate={onUpdate} />}
        {tab === 'calques'    && (
          <CalquesTab
            block={block}
            selectedLayerId={selectedLayerId}
            onSelectLayer={onSelectLayer}
            onAddLayer={onAddLayer}
            onUpdateLayer={onUpdateLayer}
            onDeleteLayer={onDeleteLayer}
            onReorderLayer={onReorderLayer}
          />
        )}
      </div>
    </div>
  );
}
