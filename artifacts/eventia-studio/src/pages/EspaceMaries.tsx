import { useListInvitations } from '@workspace/api-client-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const CARD = '#FFFFFF';
const BORDER = 'rgba(42,31,24,0.1)';
const MUTED = 'rgba(42,31,24,0.45)';
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

export default function EspaceMaries() {
  const [, navigate] = useLocation();
  const { data: invitations = [], isLoading } = useListInvitations();
  const [rsvpData, setRsvpData] = useState<Record<number, any[]>>({});

  useEffect(() => {
    const base = (window as any).__API_BASE__ ?? '';
    invitations.forEach(inv => {
      fetch(`${base}/api/rsvp/${inv.id}`)
        .then(r => r.ok ? r.json() : [])
        .then(data => setRsvpData(prev => ({ ...prev, [inv.id]: data })))
        .catch(() => {});
    });
  }, [invitations]);

  return (
    <div style={{ fontFamily: sans }}>
      <p style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>Suivi</p>
      <h1 style={{ fontFamily: serif, fontSize: 36, fontWeight: 400, color: TEXT, margin: '0 0 8px' }}>Espace Mariés</h1>
      <p style={{ fontSize: 12, color: MUTED, fontStyle: 'italic', margin: '0 0 32px' }}>
        Suivi des RSVP et liens d'invitation pour chaque couple.
      </p>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: MUTED, fontFamily: serif, fontStyle: 'italic', fontSize: 20 }}>Chargement…</div>
      ) : invitations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', border: `1.5px dashed rgba(201,169,110,0.3)`, borderRadius: 12, background: 'rgba(201,169,110,0.03)' }}>
          <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 22, color: MUTED, marginBottom: 12 }}>Aucune expérience créée</div>
          <button onClick={() => navigate('/invitations/new')} style={{ background: 'transparent', border: `1.5px solid ${GOLD}`, color: GOLD, padding: '12px 28px', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 6 }}>
            Créer la première
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {invitations.map(inv => {
            const rsvps = rsvpData[inv.id] ?? [];
            const oui = rsvps.filter(r => r.attendance === 'yes').length;
            const non = rsvps.filter(r => r.attendance === 'no').length;
            const peut = rsvps.filter(r => r.attendance === 'maybe').length;

            return (
              <div key={inv.id} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '24px 28px', boxShadow: '0 1px 6px rgba(42,31,24,0.05)' }}>
                {/* En-tête */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: serif, fontSize: 24, color: TEXT }}>
                      {inv.coupleName1} <span style={{ color: GOLD, fontStyle: 'italic' }}>&</span> {inv.coupleName2}
                    </div>
                    <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>
                      {inv.collection} · {inv.eventDate ? new Date(inv.eventDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date à définir'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {inv.slug && (
                      <button
                        onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}i/${inv.slug}`, '_blank')}
                        style={{ background: 'transparent', border: `1px solid rgba(201,169,110,0.4)`, color: GOLD, padding: '6px 14px', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 5 }}
                      >
                        ↗ Voir l'invitation
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/invitations/${inv.id}/edit`)}
                      style={{ background: GOLD, border: 'none', color: '#fff', padding: '6px 14px', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 5 }}
                    >
                      Éditer
                    </button>
                  </div>
                </div>

                {/* RSVP Stats */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Présents', value: oui, color: '#15803d', bg: 'rgba(74,222,128,0.1)' },
                    { label: 'Absents', value: non, color: '#dc2626', bg: 'rgba(239,68,68,0.08)' },
                    { label: 'Peut-être', value: peut, color: GOLD, bg: 'rgba(201,169,110,0.1)' },
                    { label: 'Total réponses', value: rsvps.length, color: MUTED, bg: 'rgba(42,31,24,0.04)' },
                  ].map(s => (
                    <div key={s.label} style={{ background: s.bg, borderRadius: 8, padding: '12px 18px', minWidth: 80 }}>
                      <div style={{ fontFamily: serif, fontSize: 28, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', color: s.color, marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Lien d'invitation */}
                {inv.slug && (
                  <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(201,169,110,0.04)', borderRadius: 6, border: `1px solid rgba(201,169,110,0.15)`, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {window.location.origin}{import.meta.env.BASE_URL}i/{inv.slug}
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(`${window.location.origin}${import.meta.env.BASE_URL}i/${inv.slug}`)}
                      style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: MUTED, padding: '4px 10px', fontSize: 9, cursor: 'pointer', borderRadius: 4, fontFamily: sans, letterSpacing: 1, textTransform: 'uppercase', flexShrink: 0 }}
                    >
                      Copier
                    </button>
                  </div>
                )}

                {/* Liste RSVP */}
                {rsvps.length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: MUTED, marginBottom: 10 }}>Réponses reçues</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {rsvps.slice(0, 5).map((r: any, i: number) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${BORDER}`, fontSize: 12 }}>
                          <span style={{ color: TEXT }}>{r.guestName}</span>
                          <span style={{ color: r.attendance === 'yes' ? '#15803d' : r.attendance === 'no' ? '#dc2626' : GOLD }}>
                            {r.attendance === 'yes' ? '✓ Présent' : r.attendance === 'no' ? '✕ Absent' : '~ Peut-être'}
                            {r.guestCount ? ` (×${r.guestCount})` : ''}
                          </span>
                        </div>
                      ))}
                      {rsvps.length > 5 && (
                        <div style={{ fontSize: 11, color: MUTED, padding: '6px 0', fontStyle: 'italic' }}>
                          +{rsvps.length - 5} autres réponses
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
