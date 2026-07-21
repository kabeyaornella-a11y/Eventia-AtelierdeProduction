import { useListInvitations, useDeleteInvitation } from '@workspace/api-client-react';
import { useLocation } from 'wouter';
import { FORMULA_LABELS } from '@/data/blocks';
import type { Formula } from '@/types';

const GOLD = '#C9A96E';
const STATUS_COLORS: Record<string, string> = {
  draft: 'rgba(249,246,241,0.3)',
  en_cours: '#C9A96E',
  livre: '#4ade80',
  archive: 'rgba(249,246,241,0.2)',
};
const STATUS_LABELS: Record<string, string> = {
  draft: 'Brouillon',
  en_cours: 'En cours',
  livre: 'Livré',
  archive: 'Archivé',
};

const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

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
    <div style={{ minHeight: '100vh', background: '#120D0C', fontFamily: sans, color: '#F9F6F1' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid rgba(201,169,110,0.12)',
        padding: '0 48px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(18,13,12,0.95)',
        backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 20, color: GOLD }}>
            Eventia Studio
          </span>
          <span style={{ width: 1, height: 20, background: 'rgba(201,169,110,0.2)' }} />
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(249,246,241,0.4)' }}>
            Moteur d'expériences
          </span>
        </div>
        <button
          onClick={() => navigate('/invitations/new')}
          style={{
            background: GOLD, color: '#1A1110', border: 'none',
            padding: '10px 24px', fontSize: 11, letterSpacing: 2,
            textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans,
          }}
        >
          + Nouvelle expérience
        </button>
      </header>

      {/* Content */}
      <main style={{ padding: '64px 48px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Title */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>
            Tableau de bord
          </p>
          <h1 style={{ fontFamily: serif, fontSize: 40, fontWeight: 400, margin: 0 }}>
            Mes expériences
          </h1>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(249,246,241,0.3)' }}>
            <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 20 }}>Chargement…</div>
          </div>
        ) : invitations.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 0',
            border: '1px dashed rgba(201,169,110,0.2)',
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✦</div>
            <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 22, color: 'rgba(249,246,241,0.5)', marginBottom: 12 }}>
              Aucune expérience pour l'instant
            </div>
            <button
              onClick={() => navigate('/invitations/new')}
              style={{
                background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD,
                padding: '12px 28px', fontSize: 11, letterSpacing: 2,
                textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, marginTop: 8,
              }}
            >
              Créer la première
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 2 }}>
            {invitations.map((inv) => (
              <div
                key={inv.id}
                onClick={() => navigate(`/invitations/${inv.id}/edit`)}
                style={{
                  background: '#1A1110',
                  border: '1px solid rgba(201,169,110,0.1)',
                  padding: '28px 32px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, background 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,169,110,0.3)';
                  (e.currentTarget as HTMLDivElement).style.background = '#1E1512';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,169,110,0.1)';
                  (e.currentTarget as HTMLDivElement).style.background = '#1A1110';
                }}
              >
                {/* Status dot */}
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLORS[inv.status] ?? GOLD }} />
                  <span style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(249,246,241,0.35)' }}>
                    {STATUS_LABELS[inv.status] ?? inv.status}
                  </span>
                </div>

                <div style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, marginBottom: 4 }}>
                  {inv.coupleName1}
                  <span style={{ color: GOLD, margin: '0 8px', fontStyle: 'italic' }}>&</span>
                  {inv.coupleName2}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(249,246,241,0.35)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20 }}>
                  {inv.collection} · {FORMULA_LABELS[inv.formula as Formula] ?? inv.formula}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 12, color: 'rgba(249,246,241,0.3)' }}>
                    {inv.eventDate
                      ? new Date(inv.eventDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                      : 'Date non définie'}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/invitations/${inv.id}/edit`); }}
                      style={{
                        background: 'transparent', border: '1px solid rgba(201,169,110,0.3)',
                        color: GOLD, padding: '6px 14px', fontSize: 10, letterSpacing: 1.5,
                        textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans,
                      }}
                    >
                      Ouvrir
                    </button>
                    <button
                      onClick={e => handleDelete(inv.id, e)}
                      style={{
                        background: 'transparent', border: '1px solid rgba(249,246,241,0.1)',
                        color: 'rgba(249,246,241,0.3)', padding: '6px 10px', fontSize: 10,
                        cursor: 'pointer', fontFamily: sans,
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
