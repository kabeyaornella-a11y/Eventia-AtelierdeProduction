import { useListInvitations, useDeleteInvitation } from '@workspace/api-client-react';
import { useLocation } from 'wouter';
import { FORMULA_LABELS } from '@/data/blocks';
import type { Formula } from '@/types';

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const BG = '#FAF6F0';
const CARD = '#FFFFFF';
const BORDER = 'rgba(42,31,24,0.1)';
const MUTED = 'rgba(42,31,24,0.45)';
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

const STATUS_COLORS: Record<string, string> = {
  draft:    'rgba(42,31,24,0.3)',
  en_cours: GOLD,
  livre:    '#4ade80',
  archive:  'rgba(42,31,24,0.2)',
};
const STATUS_LABELS: Record<string, string> = {
  draft: 'Brouillon', en_cours: 'En cours', livre: 'Livré', archive: 'Archivé',
};

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { data: invitations = [], isLoading, refetch } = useListInvitations();
  const deleteMutation = useDeleteInvitation();

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Supprimer cette expérience ?')) return;
    await deleteMutation.mutateAsync({ id });
    refetch();
  };

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: sans, color: TEXT }}>
      {/* Header */}
      <header style={{
        background: CARD, borderBottom: `1px solid ${BORDER}`,
        padding: '0 48px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 1px 4px rgba(42,31,24,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 20, color: TEXT }}>
            EVENTIA <span style={{ color: GOLD }}>Studio</span>
          </span>
          <span style={{ width: 1, height: 20, background: BORDER }} />
          <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: MUTED }}>
            Moteur d'expériences
          </span>
        </div>
        <button
          onClick={() => navigate('/invitations/new')}
          style={{
            background: GOLD, color: '#fff', border: 'none',
            padding: '10px 24px', fontSize: 10, letterSpacing: 2.5,
            textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans,
            borderRadius: 6,
          }}
        >
          + Nouvelle expérience
        </button>
      </header>

      {/* Content */}
      <main style={{ padding: '56px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>
            Tableau de bord
          </p>
          <h1 style={{ fontFamily: serif, fontSize: 40, fontWeight: 400, margin: 0, color: TEXT }}>
            Mes expériences
          </h1>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: MUTED }}>
            <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 20 }}>Chargement…</div>
          </div>
        ) : invitations.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 0',
            border: `1.5px dashed rgba(201,169,110,0.3)`, borderRadius: 12,
            background: 'rgba(201,169,110,0.03)',
          }}>
            <div style={{ fontSize: 36, marginBottom: 16, color: GOLD }}>✦</div>
            <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 22, color: MUTED, marginBottom: 12 }}>
              Aucune expérience pour l'instant
            </div>
            <button
              onClick={() => navigate('/invitations/new')}
              style={{
                background: 'transparent', border: `1.5px solid ${GOLD}`, color: GOLD,
                padding: '12px 28px', fontSize: 10, letterSpacing: 2.5,
                textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans,
                borderRadius: 6, marginTop: 8,
              }}
            >
              Créer la première
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {invitations.map((inv) => (
              <div
                key={inv.id}
                onClick={() => navigate(`/invitations/${inv.id}/edit`)}
                style={{
                  background: CARD, border: `1px solid ${BORDER}`,
                  borderRadius: 10, padding: '24px 28px', cursor: 'pointer',
                  transition: 'all 0.2s', position: 'relative',
                  boxShadow: '0 2px 6px rgba(42,31,24,0.06)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,169,110,0.4)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(42,31,24,0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = BORDER;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 6px rgba(42,31,24,0.06)';
                }}
              >
                <div style={{
                  position: 'absolute', top: 14, right: 14,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLORS[inv.status] ?? GOLD }} />
                  <span style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: MUTED }}>
                    {STATUS_LABELS[inv.status] ?? inv.status}
                  </span>
                </div>

                <div style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, marginBottom: 4, color: TEXT, paddingRight: 80 }}>
                  {inv.coupleName1}
                  <span style={{ color: GOLD, margin: '0 8px', fontStyle: 'italic' }}>&</span>
                  {inv.coupleName2}
                </div>
                <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20 }}>
                  {inv.collection} · {FORMULA_LABELS[inv.formula as Formula] ?? inv.formula}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 12, color: MUTED }}>
                    {inv.eventDate
                      ? new Date(inv.eventDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                      : 'Date non définie'}
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/invitations/${inv.id}/edit`); }}
                      style={{
                        background: GOLD, border: 'none', color: '#fff',
                        padding: '6px 14px', fontSize: 10, letterSpacing: 1.5,
                        textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 5,
                      }}
                    >
                      Ouvrir
                    </button>
                    <button
                      onClick={e => handleDelete(inv.id, e)}
                      style={{
                        background: 'transparent', border: `1px solid ${BORDER}`, color: MUTED,
                        padding: '6px 10px', fontSize: 10, cursor: 'pointer', borderRadius: 5,
                        fontFamily: sans,
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
