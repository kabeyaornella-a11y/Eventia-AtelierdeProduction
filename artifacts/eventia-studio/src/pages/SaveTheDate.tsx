import { useListInvitations } from '@workspace/api-client-react';
import { useLocation } from 'wouter';

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const CARD = '#FFFFFF';
const BORDER = 'rgba(42,31,24,0.1)';
const MUTED = 'rgba(42,31,24,0.45)';
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

export default function SaveTheDate() {
  const [, navigate] = useLocation();
  const { data: invitations = [], isLoading } = useListInvitations();

  // Filtrer uniquement les save the date (formula = save_the_date)
  const stds = invitations.filter(i => i.formula === 'save_the_date' || i.formula === 'std');

  return (
    <div style={{ fontFamily: sans }}>
      <p style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>Créations</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <h1 style={{ fontFamily: serif, fontSize: 36, fontWeight: 400, color: TEXT, margin: 0 }}>Save the Date</h1>
        <button
          onClick={() => navigate('/invitations/new?formula=save_the_date')}
          style={{ background: GOLD, color: '#fff', border: 'none', padding: '10px 22px', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 6 }}
        >
          + Nouveau STD
        </button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: MUTED, fontFamily: serif, fontStyle: 'italic', fontSize: 20 }}>Chargement…</div>
      ) : stds.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', border: `1.5px dashed rgba(201,169,110,0.3)`, borderRadius: 12, background: 'rgba(201,169,110,0.03)' }}>
          <div style={{ fontSize: 36, marginBottom: 16, color: GOLD }}>◈</div>
          <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 22, color: MUTED, marginBottom: 12 }}>Aucun Save the Date</div>
          <div style={{ fontSize: 12, color: MUTED, marginBottom: 20 }}>Crée ton premier Save the Date cinématique</div>
          <button
            onClick={() => navigate('/invitations/new?formula=save_the_date')}
            style={{ background: 'transparent', border: `1.5px solid ${GOLD}`, color: GOLD, padding: '12px 28px', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 6 }}
          >
            Créer
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {stds.map(inv => (
            <div key={inv.id} onClick={() => navigate(`/invitations/${inv.id}/edit`)} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '24px 28px', cursor: 'pointer', boxShadow: '0 2px 6px rgba(42,31,24,0.06)' }}>
              <div style={{ fontFamily: serif, fontSize: 22, color: TEXT, marginBottom: 4 }}>
                {inv.coupleName1} <span style={{ color: GOLD, fontStyle: 'italic' }}>&</span> {inv.coupleName2}
              </div>
              <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1, textTransform: 'uppercase' }}>{inv.collection}</div>
              {inv.eventDate && (
                <div style={{ fontSize: 12, color: MUTED, marginTop: 12 }}>
                  {new Date(inv.eventDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
