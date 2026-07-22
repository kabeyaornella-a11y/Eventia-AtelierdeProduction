import { useEffect, useState } from 'react';

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const CARD = '#FFFFFF';
const BORDER = 'rgba(42,31,24,0.1)';
const MUTED = 'rgba(42,31,24,0.45)';
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

export default function Commandes() {
  const [orders] = useState<any[]>([]);

  return (
    <div style={{ fontFamily: sans }}>
      <p style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>Gestion</p>
      <h1 style={{ fontFamily: serif, fontSize: 36, fontWeight: 400, color: TEXT, margin: '0 0 32px' }}>Commandes</h1>

      {/* Stats rapides */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 32 }}>
        {[
          { label: 'Total', value: 0 },
          { label: 'En attente', value: 0 },
          { label: 'En cours', value: 0 },
          { label: 'Livrées', value: 0 },
        ].map(s => (
          <div key={s.label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: '16px 20px' }}>
            <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: MUTED, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontFamily: serif, fontSize: 32, color: TEXT }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Liste */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '24px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontFamily: serif, fontSize: 22, fontWeight: 400, color: TEXT, margin: 0 }}>Toutes les commandes</h2>
          <button style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: MUTED, padding: '6px 14px', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 5 }}>
            Filtrer
          </button>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: MUTED }}>
            <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 22, marginBottom: 12 }}>Aucune commande pour l'instant</div>
            <div style={{ fontSize: 12 }}>Les commandes apparaîtront ici dès qu'un client aura réservé une expérience</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
