import { useState } from 'react';
import { useLocation } from 'wouter';
import VueEnsemble from './VueEnsemble';
import Commandes from './Commandes';
import Ateliers from './Ateliers';
import Invitations from './Invitations';
import SaveTheDate from './SaveTheDate';
import Mediatheque from './Mediatheque';
import B2B from './B2B';
import EspaceMaries from './EspaceMaries';

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const BG = '#FAF6F0';
const CARD = '#FFFFFF';
const BORDER = 'rgba(42,31,24,0.1)';
const MUTED = 'rgba(42,31,24,0.45)';
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

type Section = 'dashboard' | 'commandes' | 'ateliers' | 'invitations' | 'std' | 'mediatheque' | 'b2b' | 'maries';

const NAV: { id: Section; label: string; icon: string }[] = [
  { id: 'dashboard',    label: 'Dashboard',      icon: '⊞' },
  { id: 'commandes',    label: 'Commandes',       icon: '◻' },
  { id: 'ateliers',     label: 'Ateliers',        icon: '◈' },
  { id: 'invitations',  label: 'Invitations',     icon: '✦' },
  { id: 'std',          label: 'Save the Date',   icon: '◇' },
  { id: 'mediatheque',  label: 'Médiathèque',     icon: '⬚' },
  { id: 'b2b',          label: 'B2B',             icon: '◉' },
  { id: 'maries',       label: 'Espace Mariés',   icon: '♡' },
];

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [active, setActive] = useState<Section>('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);

  const currentNav = NAV.find(n => n.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: sans, color: TEXT }}>

      {/* ── HEADER ── */}
      <header style={{
        background: TEXT, color: '#FAF6F0',
        padding: '0 24px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 18, color: '#FAF6F0' }}>
            ✦ Eventia
          </span>
          <span style={{ width: 1, height: 16, background: 'rgba(250,246,240,0.2)' }} />
          <span style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(250,246,240,0.5)' }}>
            Back-office
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/invitations/new')}
            style={{
              background: GOLD, color: '#fff', border: 'none',
              padding: '7px 18px', fontSize: 9, letterSpacing: 2,
              textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 5,
            }}
          >
            + Créer
          </button>
          {/* Hamburger mobile */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', color: '#FAF6F0', cursor: 'pointer', fontSize: 18, padding: 4, display: 'flex', alignItems: 'center' }}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* ── NAV MOBILE (overlay) ── */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 56, left: 0, right: 0, bottom: 0,
          background: TEXT, zIndex: 99, padding: '24px',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(250,246,240,0.4)', marginBottom: 16 }}>
            Admin Eventia Signature
          </div>
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => { setActive(n.id); setMenuOpen(false); }}
              style={{
                background: active === n.id ? 'rgba(201,169,110,0.15)' : 'transparent',
                border: 'none', color: active === n.id ? GOLD : 'rgba(250,246,240,0.7)',
                padding: '14px 16px', fontSize: 13, letterSpacing: 1.5,
                textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans,
                borderRadius: 8, textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 14,
                borderLeft: active === n.id ? `3px solid ${GOLD}` : '3px solid transparent',
              }}
            >
              <span style={{ fontSize: 16, opacity: 0.7 }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </div>
      )}

      {/* ── NAV DESKTOP (barre horizontale) ── */}
      <nav style={{
        background: CARD, borderBottom: `1px solid ${BORDER}`,
        overflowX: 'auto', display: 'flex',
        padding: '0 24px',
        boxShadow: '0 1px 4px rgba(42,31,24,0.04)',
        scrollbarWidth: 'none',
      }}>
        {NAV.map(n => (
          <button
            key={n.id}
            onClick={() => { setActive(n.id); setMenuOpen(false); }}
            style={{
              background: 'none', border: 'none',
              borderBottom: active === n.id ? `2px solid ${GOLD}` : '2px solid transparent',
              padding: '14px 18px', cursor: 'pointer', fontFamily: sans,
              fontSize: 9, letterSpacing: 2, textTransform: 'uppercase',
              color: active === n.id ? GOLD : MUTED,
              whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.15s', flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 12 }}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>

      {/* ── CONTENT ── */}
      <main style={{ padding: '40px 24px', maxWidth: 1200, margin: '0 auto' }}>
        {active === 'dashboard'   && <VueEnsemble />}
        {active === 'commandes'   && <Commandes />}
        {active === 'ateliers'    && <Ateliers />}
        {active === 'invitations' && <Invitations />}
        {active === 'std'         && <SaveTheDate />}
        {active === 'mediatheque' && <Mediatheque />}
        {active === 'b2b'         && <B2B />}
        {active === 'maries'      && <EspaceMaries />}
      </main>
    </div>
  );
}
