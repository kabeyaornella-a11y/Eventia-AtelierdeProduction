import { useState, useCallback, useEffect, useRef } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useGetInvitation, useUpdateInvitation } from '@workspace/api-client-react';
import type { Block, BlockType, Formula, Layer, LayerKind } from '@/types';
import { BLOCK_META, FORMULA_BLOCKS } from '@/data/blocks';
import { makeDefaultTypography, makeDefaultLayer, DEFAULT_ANIMATION, FONT_COMBOS } from '@/types';
import Sidebar from '@/components/editor/Sidebar';
import Preview from '@/components/editor/Preview';

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const BG = '#FAF6F0';
const CARD = '#FFFFFF';
const BORDER = 'rgba(42,31,24,0.1)';
const MUTED = 'rgba(42,31,24,0.45)';
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

function makeBlock(type: BlockType): Block {
  return {
    id: `${type}_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    type,
    enabled: true,
    content: {},
    typography: makeDefaultTypography(FONT_COMBOS[0]),
    animation: { ...DEFAULT_ANIMATION },
    media: { images: [], icons: [] },
    layers: [],
  };
}

export default function Editor() {
  const [, params] = useRoute('/invitations/:id/edit');
  const [, navigate] = useLocation();
  const id = Number(params?.id);

  const { data: invitation, isLoading } = useGetInvitation(id, { query: { enabled: !!id } });
  const updateMutation = useUpdateInvitation();

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saved, setSaved] = useState(true);
  const [previewFull, setPreviewFull] = useState(false);

  // Slug editing
  const [slug, setSlug] = useState('');
  const [editingSlug, setEditingSlug] = useState(false);
  const slugInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (invitation?.blocks && Array.isArray(invitation.blocks)) {
      const loaded = invitation.blocks as any[];
      if (loaded.length > 0) {
        // Ensure each block has a layers array (migration safety)
        setBlocks(loaded.map(b => ({ ...b, layers: b.layers ?? [] })) as Block[]);
      } else {
        const formula = (invitation.formula as Formula) ?? 'signature';
        const types = FORMULA_BLOCKS[formula] ?? FORMULA_BLOCKS.signature;
        setBlocks(types.map(t => makeBlock(t)));
      }
    }
    if (invitation?.slug) setSlug(invitation.slug);
  }, [invitation?.id]);

  useEffect(() => {
    if (editingSlug && slugInputRef.current) slugInputRef.current.focus();
  }, [editingSlug]);

  const markDirty = () => setSaved(false);

  /* ── Block operations ── */
  const save = useCallback(async () => {
    if (!id) return;
    await updateMutation.mutateAsync({ id, data: { blocks: blocks as any } });
    setSaved(true);
  }, [id, blocks, updateMutation]);

  const saveSlug = useCallback(async () => {
    if (!id) return;
    const cleaned = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    setSlug(cleaned);
    await updateMutation.mutateAsync({ id, data: { slug: cleaned } });
    setEditingSlug(false);
  }, [id, slug, updateMutation]);

  const updateBlock = useCallback((blockId: string, updater: (b: Block) => Block) => {
    setBlocks(prev => prev.map(b => b.id === blockId ? updater(b) : b));
    markDirty();
  }, []);

  const toggleBlock = useCallback((blockId: string) => {
    setBlocks(prev => prev.map(b => b.id === blockId ? { ...b, enabled: !b.enabled } : b));
    markDirty();
  }, []);

  const reorderBlocks = useCallback((from: number, to: number) => {
    setBlocks(prev => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    markDirty();
  }, []);

  /* ── Layer operations ── */
  const addLayer = useCallback((blockId: string, kind: LayerKind, extra?: Partial<Layer>) => {
    const newLayer = makeDefaultLayer(kind, extra);
    setBlocks(prev => prev.map(b => b.id === blockId
      ? { ...b, layers: [...(b.layers ?? []), { ...newLayer, zIndex: (b.layers?.length ?? 0) + 1 }] }
      : b));
    setSelectedLayerId(newLayer.id);
    markDirty();
  }, []);

  const updateLayer = useCallback((blockId: string, layerId: string, patch: Partial<Layer>) => {
    setBlocks(prev => prev.map(b => b.id === blockId
      ? { ...b, layers: (b.layers ?? []).map(l => l.id === layerId ? { ...l, ...patch } : l) }
      : b));
    markDirty();
  }, []);

  const deleteLayer = useCallback((blockId: string, layerId: string) => {
    setBlocks(prev => prev.map(b => b.id === blockId
      ? { ...b, layers: (b.layers ?? []).filter(l => l.id !== layerId) }
      : b));
    if (selectedLayerId === layerId) setSelectedLayerId(null);
    markDirty();
  }, [selectedLayerId]);

  const reorderLayer = useCallback((blockId: string, from: number, to: number) => {
    setBlocks(prev => prev.map(b => {
      if (b.id !== blockId) return b;
      const next = [...(b.layers ?? [])];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return { ...b, layers: next };
    }));
    markDirty();
  }, []);

  const selectedBlock = blocks.find(b => b.id === selectedId) ?? null;

  /* ── Render ── */
  if (isLoading) return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 22, color: MUTED }}>Chargement…</div>
    </div>
  );

  if (!invitation) return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sans, color: TEXT }}>
      <div>Expérience introuvable. <button onClick={() => navigate('/')} style={{ color: GOLD, background: 'none', border: 'none', cursor: 'pointer' }}>Retour</button></div>
    </div>
  );

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: BG, fontFamily: sans, overflow: 'hidden' }}>
      {/* ── HEADER ── */}
      <header style={{
        height: 56, background: CARD, borderBottom: `1px solid ${BORDER}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px 0 0', flexShrink: 0, zIndex: 50,
        boxShadow: '0 1px 4px rgba(42,31,24,0.06)',
      }}>
        {/* Left — breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <div style={{
            width: sidebarOpen ? 300 : 56, transition: 'width 0.3s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRight: `1px solid ${BORDER}`, height: '100%', flexShrink: 0,
          }}>
            {sidebarOpen
              ? <span style={{ fontFamily: serif, fontSize: 17, color: TEXT, padding: '0 20px' }}>EVENTIA <span style={{ color: GOLD }}>Studio</span></span>
              : <span style={{ fontFamily: serif, fontSize: 14, color: TEXT }}>ES</span>}
          </div>
          <div style={{ padding: '0 16px', display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
            <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: MUTED, cursor: 'pointer', fontSize: 12, fontFamily: sans, padding: 0, flexShrink: 0 }}>
              Tableau de bord
            </button>
            <span style={{ color: BORDER, fontSize: 12 }}>/</span>
            <span style={{ fontFamily: serif, fontSize: 15, color: TEXT, flexShrink: 0 }}>
              {invitation.coupleName1}<span style={{ color: GOLD, margin: '0 5px', fontStyle: 'italic' }}>&</span>{invitation.coupleName2}
            </span>
            <span style={{ fontSize: 10, color: MUTED, letterSpacing: 2, textTransform: 'uppercase', flexShrink: 0 }}>· {invitation.collection}</span>

            {/* Slug editing */}
            <span style={{ color: BORDER, fontSize: 12, marginLeft: 4 }}>/</span>
            {editingSlug ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  ref={slugInputRef}
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') saveSlug(); if (e.key === 'Escape') setEditingSlug(false); }}
                  style={{
                    border: `1px solid ${GOLD}`, borderRadius: 4, padding: '3px 8px',
                    fontSize: 12, fontFamily: sans, color: TEXT, background: 'rgba(201,169,110,0.05)',
                    outline: 'none', width: 160,
                  }}
                  placeholder="prenom-prenom"
                />
                <button onClick={saveSlug} style={{ background: GOLD, border: 'none', color: '#fff', padding: '4px 8px', fontSize: 11, cursor: 'pointer', borderRadius: 4, fontFamily: sans }}>✓</button>
                <button onClick={() => setEditingSlug(false)} style={{ background: 'none', border: `1px solid ${BORDER}`, color: MUTED, padding: '4px 8px', fontSize: 11, cursor: 'pointer', borderRadius: 4, fontFamily: sans }}>✕</button>
              </div>
            ) : (
              <button onClick={() => setEditingSlug(true)} title="Modifier l'URL" style={{
                background: 'none', border: `1px dashed ${BORDER}`, borderRadius: 4,
                color: MUTED, cursor: 'pointer', fontSize: 12, fontFamily: sans,
                padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <span style={{ color: MUTED, fontFamily: 'monospace' }}>{slug || 'modifier-url'}</span>
                <span style={{ fontSize: 10 }}>✏️</span>
              </button>
            )}
          </div>
        </div>

        {/* Right — actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button onClick={() => setPreviewFull(p => !p)} style={{
            background: 'transparent', border: `1px solid ${BORDER}`,
            color: previewFull ? GOLD : MUTED, padding: '6px 12px',
            fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase',
            cursor: 'pointer', fontFamily: sans, borderRadius: 6,
          }}>
            {previewFull ? '⊞ Éditeur' : '□ Aperçu'}
          </button>

          <div style={{ fontSize: 11, color: saved ? '#4ade80' : GOLD, letterSpacing: 0.5, minWidth: 90, textAlign: 'center' }}>
            {updateMutation.isPending ? 'Sauvegarde…' : saved ? '✓ Sauvegardé' : '● Non sauvegardé'}
          </div>

          <button onClick={save} disabled={saved || updateMutation.isPending} style={{
            background: saved ? 'transparent' : GOLD,
            border: `1px solid ${saved ? BORDER : GOLD}`,
            color: saved ? MUTED : '#fff',
            padding: '6px 16px', fontSize: 10, letterSpacing: 1.5,
            textTransform: 'uppercase', cursor: saved ? 'default' : 'pointer',
            fontFamily: sans, transition: 'all 0.2s', borderRadius: 6,
          }}>Sauvegarder</button>

          <button style={{
            background: TEXT, border: `1px solid ${TEXT}`, color: '#FAF6F0',
            padding: '6px 16px', fontSize: 10, letterSpacing: 1.5,
            textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 6,
          }}>Publier</button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {!previewFull && (
          <Sidebar
            open={sidebarOpen}
            onToggle={() => setSidebarOpen(o => !o)}
            blocks={blocks}
            selectedId={selectedId}
            onSelectBlock={setSelectedId}
            onToggleBlock={toggleBlock}
            onUpdateBlock={updateBlock}
            onReorder={reorderBlocks}
            formula={(invitation.formula as Formula) ?? 'signature'}
            selectedLayerId={selectedLayerId}
            onSelectLayer={setSelectedLayerId}
            onAddLayer={addLayer}
            onUpdateLayer={updateLayer}
            onDeleteLayer={deleteLayer}
            onReorderLayer={reorderLayer}
          />
        )}
        <Preview
          blocks={blocks}
          selectedId={selectedId}
          selectedLayerId={selectedLayerId}
          onSelectBlock={setSelectedId}
          onSelectLayer={setSelectedLayerId}
          onUpdateLayerInBlock={updateLayer}
          onReorder={reorderBlocks}
          coupleName1={invitation.coupleName1}
          coupleName2={invitation.coupleName2}
          collection={invitation.collection}
          eventDate={invitation.eventDate ?? null}
        />
      </div>
    </div>
  );
}
