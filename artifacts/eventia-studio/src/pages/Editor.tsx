import { useState, useCallback, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useGetInvitation, useUpdateInvitation } from '@workspace/api-client-react';
import type { Block, BlockType, Formula } from '@/types';
import { BLOCK_META, FORMULA_BLOCKS } from '@/data/blocks';
import { makeDefaultTypography, DEFAULT_ANIMATION, FONT_COMBOS } from '@/types';
import Sidebar from '@/components/editor/Sidebar';
import Preview from '@/components/editor/Preview';

const GOLD = '#C9A96E';
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

function makeBlock(type: BlockType, enabled: boolean): Block {
  return {
    id: `${type}_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    type,
    enabled,
    content: {},
    typography: makeDefaultTypography(FONT_COMBOS[0]),
    animation: { ...DEFAULT_ANIMATION },
    media: { images: [], icons: [] },
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saved, setSaved] = useState(true);
  const [previewFull, setPreviewFull] = useState(false);

  // Hydrate blocks from API response
  useEffect(() => {
    if (invitation?.blocks && Array.isArray(invitation.blocks)) {
      const loaded = invitation.blocks as any[];
      if (loaded.length > 0) {
        setBlocks(loaded as Block[]);
      } else {
        // Bootstrap from formula
        const formula = (invitation.formula as Formula) ?? 'signature';
        const types = FORMULA_BLOCKS[formula] ?? FORMULA_BLOCKS.signature;
        setBlocks(types.map(t => makeBlock(t, true)));
      }
    }
  }, [invitation?.id]);

  const save = useCallback(async () => {
    if (!id) return;
    await updateMutation.mutateAsync({ id, data: { blocks: blocks as any } });
    setSaved(true);
  }, [id, blocks, updateMutation]);

  const markDirty = () => setSaved(false);

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

  const selectedBlock = blocks.find(b => b.id === selectedId) ?? null;

  if (isLoading) return (
    <div style={{ minHeight: '100vh', background: '#120D0C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 22, color: 'rgba(201,169,110,0.6)' }}>Chargement…</div>
    </div>
  );

  if (!invitation) return (
    <div style={{ minHeight: '100vh', background: '#120D0C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sans, color: '#F9F6F1' }}>
      <div>Expérience introuvable. <button onClick={() => navigate('/')} style={{ color: GOLD, background: 'none', border: 'none', cursor: 'pointer' }}>Retour</button></div>
    </div>
  );

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#120D0C', fontFamily: sans, overflow: 'hidden' }}>
      {/* ── HEADER ── */}
      <header style={{
        height: 56,
        background: 'rgba(18,13,12,0.98)',
        borderBottom: '1px solid rgba(201,169,110,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px 0 0',
        flexShrink: 0,
        zIndex: 50,
      }}>
        {/* Left: logo + breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <div style={{
            width: sidebarOpen ? 300 : 48,
            transition: 'width 0.3s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRight: '1px solid rgba(201,169,110,0.1)',
            height: '100%', flexShrink: 0,
          }}>
            {sidebarOpen ? (
              <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 17, color: GOLD, padding: '0 20px' }}>
                Eventia Studio
              </span>
            ) : (
              <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 14, color: GOLD }}>ES</span>
            )}
          </div>
          <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'rgba(249,246,241,0.35)', cursor: 'pointer', fontSize: 12, fontFamily: sans, padding: 0 }}>
              Tableau de bord
            </button>
            <span style={{ color: 'rgba(249,246,241,0.2)', fontSize: 12 }}>/</span>
            <span style={{ fontFamily: serif, fontSize: 15, color: '#F9F6F1' }}>
              {invitation.coupleName1}
              <span style={{ color: GOLD, margin: '0 6px', fontStyle: 'italic' }}>&</span>
              {invitation.coupleName2}
            </span>
            <span style={{ fontSize: 10, color: 'rgba(249,246,241,0.25)', letterSpacing: 2, textTransform: 'uppercase', marginLeft: 4 }}>
              · {invitation.collection}
            </span>
          </div>
        </div>

        {/* Right: actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Preview toggle */}
          <button
            onClick={() => setPreviewFull(p => !p)}
            style={{
              background: 'transparent', border: '1px solid rgba(249,246,241,0.12)',
              color: previewFull ? GOLD : 'rgba(249,246,241,0.5)',
              padding: '7px 14px', fontSize: 10, letterSpacing: 2,
              textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans,
            }}
          >
            {previewFull ? '⊞ Éditeur' : '□ Plein écran'}
          </button>

          {/* Save status */}
          <div style={{ fontSize: 11, color: saved ? 'rgba(74,222,128,0.6)' : GOLD, letterSpacing: 1, minWidth: 80, textAlign: 'center' }}>
            {updateMutation.isPending ? 'Sauvegarde…' : saved ? '✓ Sauvegardé' : '● Non sauvegardé'}
          </div>

          <button
            onClick={save}
            disabled={saved || updateMutation.isPending}
            style={{
              background: saved ? 'transparent' : GOLD,
              border: `1px solid ${saved ? 'rgba(201,169,110,0.2)' : GOLD}`,
              color: saved ? 'rgba(249,246,241,0.3)' : '#1A1110',
              padding: '7px 18px', fontSize: 10, letterSpacing: 2,
              textTransform: 'uppercase', cursor: saved ? 'default' : 'pointer',
              fontFamily: sans, transition: 'all 0.2s',
            }}
          >
            Sauvegarder
          </button>

          <button style={{
            background: '#1A1110', border: `1px solid ${GOLD}`, color: GOLD,
            padding: '7px 18px', fontSize: 10, letterSpacing: 2,
            textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans,
          }}>
            Publier
          </button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar */}
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
          />
        )}

        {/* Preview */}
        <Preview
          blocks={blocks}
          selectedId={selectedId}
          onSelectBlock={setSelectedId}
          coupleName1={invitation.coupleName1}
          coupleName2={invitation.coupleName2}
          collection={invitation.collection}
          eventDate={invitation.eventDate ?? null}
        />
      </div>
    </div>
  );
}
