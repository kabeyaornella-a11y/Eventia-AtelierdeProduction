import { useState } from 'react';

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const CARD = '#FFFFFF';
const BORDER = 'rgba(42,31,24,0.1)';
const MUTED = 'rgba(42,31,24,0.45)';
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

const ATELIERS_EXEMPLES = [
  { id: 1, titre: 'Calligraphie & Papeterie', date: '2026-09-12', places: 8, inscrits: 3, prix: '120€', statut: 'Ouvert' },
  { id: 2, titre: 'Composition florale de mariage', date: '2026-10-04', places: 6, inscrits: 6, prix: '150€', statut: 'Complet' },
  { id: 3, titre: 'Identité visuelle du mariage', date: '2026-11-15', places: 10, inscrits: 0, prix: '95€', statut: 'À venir' },
];

export default function Ateliers() {
  const [ateliers] = useState(ATELIERS_EXEMPLES);

  return (
    <div style={{ fontFamily: sans }}>
      <p style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>Offre</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <h1 style={{ fontFamily: serif, fontSize: 36, fontWeight: 400, color: TEXT, margin: 0 }}>Ateliers</h1>
        <button style={{ background: GOLD, color: '#fff', border: 'none', padding: '10px 22px', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 6 }}>
          + Nouvel atelier
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ateliers.map(a => (
          <div key={a.id} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, boxShadow: '0 1px 4px rgba(42,31,24,0.05)' }}>
            <div>
              <div style={{ fontFamily: serif, fontSize: 20, color: TEXT, marginBottom: 4 }}>{a.titre}</div>
              <div style={{ fontSize: 11, color: MUTED }}>
                {new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                {' · '}{a.inscrits}/{a.places} places · {a.prix}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{
                fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', padding: '3px 12px', borderRadius: 20,
                background: a.statut === 'Complet' ? 'rgba(239,68,68,0.08)' : a.statut === 'Ouvert' ? 'rgba(74,222,128,0.1)' : 'rgba(201,169,110,0.1)',
                color: a.statut === 'Complet' ? '#dc2626' : a.statut === 'Ouvert' ? '#15803d' : GOLD,
              }}>
                {a.statut}
              </span>
              <button style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: MUTED, padding: '5px 12px', fontSize: 10, cursor: 'pointer', borderRadius: 5, fontFamily: sans }}>
                Gérer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
