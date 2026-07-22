import { useListInvitations } from '@workspace/api-client-react';
import { useEffect, useState } from 'react';

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const BG = '#FAF6F0';
const CARD = '#FFFFFF';
const BORDER = 'rgba(42,31,24,0.1)';
const MUTED = 'rgba(42,31,24,0.45)';
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

function StatCard({ label, value, sub, icon }: { label: string; value: string | number; sub?: string; icon: string }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '24px 28px', boxShadow: '0 1px 6px rgba(42,31,24,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <span style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: MUTED, fontFamily: sans }}>{label}</span>
        <span style={{ fontSize: 18, opacity: 0.5 }}>{icon}</span>
      </div>
      <div style={{ fontFamily: serif, fontSize: 38, fontWeight: 400, color: TEXT, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: MUTED, marginTop: 8, fontFamily: sans }}>{sub}</div>}
    </div>
  );
}

export default function VueEnsemble() {
  const { data: invitations = [], isLoading } = useListInvitations();
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const base = (window as any).__API_BASE__ ?? '';
    fetch(`${base}/api/contact-requests`).then(r => r.ok ? r.json() : []).then(setRequests).catch(() => {});
  }, []);

  const pending = requests.filter(r => r.status === 'pending').length;
  const active = invitations.filter(i => i.status === 'en_cours').length;
  const delivered = invitations.filter(i => i.status === 'livre').length;

  if (isLoading) return (
    <div style={{ textAlign: 'center', padding: '80px 0', color: MUTED, fontFamily: serif, fontStyle: 'italic', fontSize: 20 }}>
      Chargement…
    </div>
  );

  return (
    <div style={{ fontFamily: sans }}>
      <p style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>Administration</p>
      <h1 style={{ fontFamily: serif, fontSize: 36, fontWeight: 400, color: TEXT, margin: '0 0 6px' }}>Vue d'ensemble</h1>
      <p style={{ fontSize: 12, color: MUTED, margin: '0 0 40px', fontStyle: 'italic' }}>Pilotage en temps réel de l'atelier Eventia Signature.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
        <StatCard label="Expériences actives" value={active} sub={`${invitations.length} au total`} icon="✦" />
        <StatCard label="Livrées" value={delivered} sub="invitations envoyées" icon="◈" />
        <StatCard label="Demandes" value={pending} sub="en attente de réponse" icon="✉" />
        <StatCard label="Chiffre d'affaires" value="—" sub="connexion paiement requise" icon="€" />
      </div>

      {/* Activité récente */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '24px 28px', boxShadow: '0 1px 6px rgba(42,31,24,0.05)' }}>
        <h2 style={{ fontFamily: serif, fontSize: 22, fontWeight: 400, color: TEXT, margin: '0 0 20px' }}>Expériences récentes</h2>
        {invitations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: MUTED, fontStyle: 'italic' }}>
            Aucune expérience créée pour l'instant
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {invitations.slice(0, 5).map(inv => (
              <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${BORDER}` }}>
                <div>
                  <span style={{ fontFamily: serif, fontSize: 17, color: TEXT }}>
                    {inv.coupleName1} <span style={{ color: GOLD, fontStyle: 'italic' }}>&</span> {inv.coupleName2}
                  </span>
                  <span style={{ fontSize: 10, color: MUTED, marginLeft: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{inv.collection}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: inv.status === 'livre' ? '#15803d' : GOLD }}>
                    {inv.status === 'draft' ? 'Brouillon' : inv.status === 'en_cours' ? 'En cours' : inv.status === 'livre' ? 'Livré' : inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
