import { useState } from 'react';

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const CARD = '#FFFFFF';
const BORDER = 'rgba(42,31,24,0.1)';
const MUTED = 'rgba(42,31,24,0.45)';
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

const CLIENTS_EXEMPLES = [
  { id: 1, nom: 'Château Bellevue', contact: 'Marie Fontaine', type: 'Domaine', invitations: 3, chiffre: '4 500€' },
  { id: 2, nom: 'Agence Ephémère Events', contact: 'Thomas Durand', type: 'Wedding planner', invitations: 7, chiffre: '12 800€' },
];

export default function B2B() {
  const [clients] = useState(CLIENTS_EXEMPLES);
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ fontFamily: sans }}>
      <p style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>Partenaires</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <h1 style={{ fontFamily: serif, fontSize: 36, fontWeight: 400, color: TEXT, margin: 0 }}>B2B — Clients pro</h1>
        <button onClick={() => setShowForm(true)} style={{ background: GOLD, color: '#fff', border: 'none', padding: '10px 22px', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 6 }}>
          + Ajouter
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { label: 'Partenaires actifs', value: clients.length },
          { label: 'Invitations B2B', value: clients.reduce((a, c) => a + c.invitations, 0) },
          { label: 'CA Partenaires', value: '17 300€' },
        ].map(s => (
          <div key={s.label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: '16px 20px' }}>
            <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: MUTED, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: serif, fontSize: 28, color: TEXT }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {clients.map(c => (
          <div key={c.id} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, boxShadow: '0 1px 4px rgba(42,31,24,0.05)' }}>
            <div>
              <div style={{ fontFamily: serif, fontSize: 20, color: TEXT, marginBottom: 2 }}>{c.nom}</div>
              <div style={{ fontSize: 11, color: MUTED }}>{c.contact} · {c.type}</div>
            </div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: serif, fontSize: 24, color: TEXT }}>{c.invitations}</div>
                <div style={{ fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: 1 }}>invitations</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: serif, fontSize: 20, color: GOLD }}>{c.chiffre}</div>
                <div style={{ fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: 1 }}>CA</div>
              </div>
              <button style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: MUTED, padding: '5px 14px', fontSize: 10, cursor: 'pointer', borderRadius: 5, fontFamily: sans }}>
                Voir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
