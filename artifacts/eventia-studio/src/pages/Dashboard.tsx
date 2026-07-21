import { useListInvitations, useDeleteInvitation } from '@workspace/api-client-react';
import { useLocation } from 'wouter';
import { FORMULA_LABELS } from '@/data/blocks';
import type { Formula } from '@/types';
import { useState, useEffect } from 'react';

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

type ContactRequest = {
  id: number;
  name1: string;
  name2: string;
  email: string;
  phone?: string | null;
  eventDate?: string | null;
  guestCount?: string | null;
  collection?: string | null;
  formula?: string | null;
  message?: string | null;
  status: string;
  invitationId?: string | null;
  source: string;
  createdAt: string;
};

type Tab = 'experiences' | 'demandes';

function useContactRequests() {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const base = (window as any).__API_BASE__ ?? '';
      const res = await fetch(`${base}/api/contact-requests`);
      if (res.ok) setRequests(await res.json());
    } catch { /* silencieux */ }
    finally { setLoading(false); }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const base = (window as any).__API_BASE__ ?? '';
      await fetch(`${base}/api/contact-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      await load();
    } catch { /**/ }
  };

  useEffect(() => { load(); }, []);
  return { requests, loading, reload: load, updateStatus };
}

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { data: invitations = [], isLoading, refetch } = useListInvitations();
  const deleteMutation = useDeleteInvitation();
  const [activeTab, setActiveTab] = useState<Tab>('experiences');
  const { requests, loading: reqLoading, updateStatus, reload } = useContactRequests();

  const pending = requests.filter(r => r.status === 'pending');

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Supprimer cette expérience ?')) return;
    await deleteMutation.mutateAsync({ id });
    refetch();
  };

  const handleConvert = async (req: ContactRequest) => {
    // Marquer comme accepté puis ouvrir "Nouvelle expérience" pré-remplie
    await updateStatus(req.id, 'accepted');
    navigate(`/invitations/new?from=${req.id}&name1=${encodeURIComponent(req.name1)}&name2=${encodeURIComponent(req.name2)}&collection=${req.collection ?? ''}&formula=${req.formula ?? ''}`);
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

        {/* Titre + tabs */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>
            Tableau de bord
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h1 style={{ fontFamily: serif, fontSize: 40, fontWeight: 400, margin: 0, color: TEXT }}>
              {activeTab === 'experiences' ? 'Mes expériences' : 'Demandes en attente'}
            </h1>
            {/* Onglets */}
            <div style={{ display: 'flex', gap: 0, borderBottom: `2px solid ${BORDER}` }}>
              {([
                { id: 'experiences', label: 'Expériences', count: invitations.length },
                { id: 'demandes', label: 'Demandes', count: pending.length, badge: pending.length > 0 },
              ] as { id: Tab; label: string; count: number; badge?: boolean }[]).map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    background: 'none', border: 'none',
                    borderBottom: activeTab === t.id ? `2px solid ${GOLD}` : '2px solid transparent',
                    marginBottom: -2,
                    padding: '8px 20px', cursor: 'pointer', fontFamily: sans,
                    fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
                    color: activeTab === t.id ? GOLD : MUTED,
                    display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s',
                  }}
                >
                  {t.label}
                  {t.badge && (
                    <span style={{
                      background: GOLD, color: '#fff', borderRadius: 10,
                      fontSize: 9, padding: '1px 6px', letterSpacing: 0, fontWeight: 700,
                    }}>
                      {t.count}
                    </span>
                  )}
                  {!t.badge && t.count > 0 && (
                    <span style={{ color: MUTED, fontSize: 10 }}>({t.count})</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tab : Expériences ─────────────────────────────────────── */}
        {activeTab === 'experiences' && (
          isLoading ? (
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
          )
        )}

        {/* ── Tab : Demandes ────────────────────────────────────────── */}
        {activeTab === 'demandes' && (
          reqLoading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: MUTED }}>
              <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 20 }}>Chargement…</div>
            </div>
          ) : requests.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '80px 0',
              border: `1.5px dashed rgba(201,169,110,0.3)`, borderRadius: 12,
              background: 'rgba(201,169,110,0.03)',
            }}>
              <div style={{ fontSize: 36, marginBottom: 16, color: GOLD }}>✉</div>
              <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 22, color: MUTED }}>
                Aucune demande reçue
              </div>
              <div style={{ fontSize: 12, color: MUTED, marginTop: 10 }}>
                Les demandes du site vitrine apparaîtront ici automatiquement
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Filtre statut */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                {(['Toutes', 'En attente', 'Acceptées', 'Refusées', 'Converties'] as const).map((lbl, i) => {
                  const vals = [null, 'pending', 'accepted', 'refused', 'converted'];
                  const val = vals[i];
                  const count = val ? requests.filter(r => r.status === val).length : requests.length;
                  return (
                    <span
                      key={lbl}
                      style={{
                        fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase',
                        padding: '4px 12px', borderRadius: 20, cursor: 'pointer',
                        background: 'rgba(201,169,110,0.08)', color: GOLD, fontFamily: sans,
                        border: `1px solid rgba(201,169,110,0.2)`,
                      }}
                    >
                      {lbl} ({count})
                    </span>
                  );
                })}
              </div>

              {requests.map(req => (
                <div key={req.id} style={{
                  background: CARD, border: `1px solid ${req.status === 'pending' ? 'rgba(201,169,110,0.4)' : BORDER}`,
                  borderRadius: 10, padding: '20px 24px',
                  boxShadow: req.status === 'pending' ? '0 2px 12px rgba(201,169,110,0.1)' : '0 1px 4px rgba(42,31,24,0.05)',
                }}>
                  {/* Ligne 1 : noms + statut */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 12 }}>
                    <div>
                      <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 400, color: TEXT }}>
                        {req.name1}
                        <span style={{ color: GOLD, margin: '0 8px', fontStyle: 'italic' }}>&</span>
                        {req.name2}
                      </div>
                      <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>
                        {req.email}{req.phone ? ` · ${req.phone}` : ''}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      {req.status === 'pending' && (
                        <span style={{
                          background: 'rgba(201,169,110,0.12)', color: GOLD,
                          fontSize: 9, letterSpacing: 2, textTransform: 'uppercase',
                          padding: '3px 10px', borderRadius: 20, fontWeight: 600,
                        }}>
                          En attente
                        </span>
                      )}
                      {req.status === 'accepted' && (
                        <span style={{ background: 'rgba(74,222,128,0.1)', color: '#15803d', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', padding: '3px 10px', borderRadius: 20 }}>
                          Acceptée
                        </span>
                      )}
                      {req.status === 'refused' && (
                        <span style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', padding: '3px 10px', borderRadius: 20 }}>
                          Refusée
                        </span>
                      )}
                      {req.status === 'converted' && (
                        <span style={{ background: 'rgba(42,31,24,0.06)', color: MUTED, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', padding: '3px 10px', borderRadius: 20 }}>
                          Convertie
                        </span>
                      )}
                      <span style={{ fontSize: 10, color: MUTED }}>
                        {new Date(req.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                      </span>
                    </div>
                  </div>

                  {/* Ligne 2 : infos projet */}
                  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 12 }}>
                    {req.eventDate && (
                      <div style={{ fontSize: 11, color: MUTED }}>
                        <span style={{ color: GOLD, marginRight: 4 }}>📅</span>{req.eventDate}
                      </div>
                    )}
                    {req.guestCount && (
                      <div style={{ fontSize: 11, color: MUTED }}>
                        <span style={{ color: GOLD, marginRight: 4 }}>👥</span>{req.guestCount}
                      </div>
                    )}
                    {req.collection && (
                      <div style={{ fontSize: 11, color: MUTED }}>
                        <span style={{ color: GOLD, marginRight: 4 }}>✦</span>
                        Collection {req.collection}
                      </div>
                    )}
                    {req.formula && (
                      <div style={{ fontSize: 11, color: MUTED }}>
                        <span style={{ color: GOLD, marginRight: 4 }}>◈</span>
                        {FORMULA_LABELS[req.formula as Formula] ?? req.formula}
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  {req.message && (
                    <div style={{
                      fontSize: 12, color: MUTED, fontStyle: 'italic',
                      background: 'rgba(42,31,24,0.03)', borderRadius: 6,
                      padding: '10px 14px', marginBottom: 14,
                      borderLeft: `2px solid rgba(201,169,110,0.3)`,
                    }}>
                      "{req.message}"
                    </div>
                  )}

                  {/* Actions */}
                  {req.status === 'pending' && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => handleConvert(req)}
                        style={{
                          background: GOLD, color: '#fff', border: 'none',
                          padding: '7px 18px', fontSize: 10, letterSpacing: 2,
                          textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 5,
                        }}
                      >
                        ✦ Créer l'expérience
                      </button>
                      <button
                        onClick={() => updateStatus(req.id, 'refused')}
                        style={{
                          background: 'transparent', border: `1px solid rgba(239,68,68,0.25)`, color: '#dc2626',
                          padding: '7px 14px', fontSize: 10, letterSpacing: 1.5,
                          textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 5,
                        }}
                      >
                        Refuser
                      </button>
                    </div>
                  )}
                  {req.status !== 'pending' && req.invitationId && (
                    <div style={{ fontSize: 11, color: MUTED }}>
                      → Invitation #{req.invitationId}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </main>
    </div>
  );
}
