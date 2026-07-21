import { useState } from 'react';
import { useLocation } from 'wouter';
import { useCreateInvitation, useListCollections } from '@workspace/api-client-react';
import type { Formula } from '@/types';
import { FORMULA_LABELS } from '@/data/blocks';

const GOLD = '#C9A96E';
const TEXT = '#2A1F18';
const BG = '#FAF6F0';
const CARD = '#FFFFFF';
const BORDER = 'rgba(42,31,24,0.12)';
const MUTED = 'rgba(42,31,24,0.45)';
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

const FORMULAS: { id: Formula; price: string; desc: string }[] = [
  { id: 'essentielle', price: '179€', desc: '7 séquences · RSVP · Plan · Compte à rebours' },
  { id: 'signature',   price: '269€', desc: 'Tout L\'Essentielle · Dress code · Notre histoire · Galerie' },
  { id: 'exception',   price: '549€', desc: 'Tout La Signature · Menu · Programme · Album live · FAQ…' },
];

export default function NewInvitation() {
  const [, navigate] = useLocation();
  const { data: collections = [] } = useListCollections();
  const createMutation = useCreateInvitation();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    coupleName1: '', coupleName2: '', eventDate: '',
    collection: 'voiles', formula: 'signature' as Formula,
  });

  const handleCreate = async () => {
    if (!form.coupleName1 || !form.coupleName2) return;
    const result = await createMutation.mutateAsync({
      data: {
        coupleName1: form.coupleName1, coupleName2: form.coupleName2,
        collection: form.collection, formula: form.formula,
        eventDate: form.eventDate || null,
      },
    });
    navigate(`/invitations/${result.id}/edit`);
  };

  const fallbackCollections = [
    { slug: 'voiles', name: 'Les Voiles', description: 'Aérien · Délicat · Textile' },
    { slug: 'seuils', name: 'Les Seuils', description: 'Passages · Portes · Transitions' },
    { slug: 'ecrins', name: 'Les Écrins', description: 'Joaillerie · Précieux · Écrin' },
    { slug: 'union',  name: 'L\'Union',    description: 'Chaleur · Famille · Promesse' },
  ];
  const cols = collections.length > 0 ? collections : fallbackCollections;

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: sans, color: TEXT, display: 'flex', flexDirection: 'column' }}>
      <header style={{
        background: CARD, borderBottom: `1px solid ${BORDER}`,
        padding: '0 48px', height: 64, display: 'flex', alignItems: 'center', gap: 20,
        boxShadow: '0 1px 4px rgba(42,31,24,0.06)',
      }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: MUTED, cursor: 'pointer', fontSize: 13, fontFamily: sans }}>
          ← Tableau de bord
        </button>
        <span style={{ fontFamily: serif, fontSize: 18, color: TEXT }}>
          Nouvelle expérience
        </span>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
        <div style={{ width: '100%', maxWidth: 560 }}>
          {/* Progress */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 48, justifyContent: 'center' }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{
                flex: 1, height: 3, maxWidth: 80, borderRadius: 2,
                background: s <= step ? GOLD : 'rgba(201,169,110,0.2)',
                transition: 'background 0.3s',
              }} />
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="fade-up">
              <p style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: GOLD, marginBottom: 10, textAlign: 'center' }}>Étape 1 · 3</p>
              <h2 style={{ fontFamily: serif, fontSize: 36, fontWeight: 400, textAlign: 'center', margin: '0 0 36px', color: TEXT }}>
                Les mariés
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div>
                  <label className="field-label">Prénom 1</label>
                  <input className="studio-input" value={form.coupleName1} onChange={e => setForm(f => ({ ...f, coupleName1: e.target.value }))} placeholder="Sophie" />
                </div>
                <div>
                  <label className="field-label">Prénom 2</label>
                  <input className="studio-input" value={form.coupleName2} onChange={e => setForm(f => ({ ...f, coupleName2: e.target.value }))} placeholder="Alexandre" />
                </div>
              </div>
              <div style={{ marginBottom: 36 }}>
                <label className="field-label">Date du mariage (optionnel)</label>
                <input type="date" className="studio-input" value={form.eventDate} onChange={e => setForm(f => ({ ...f, eventDate: e.target.value }))} />
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!form.coupleName1 || !form.coupleName2}
                style={{
                  width: '100%', background: GOLD, border: 'none', color: '#fff',
                  padding: '14px', fontSize: 10, letterSpacing: 2.5,
                  textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 7,
                  opacity: (!form.coupleName1 || !form.coupleName2) ? 0.4 : 1,
                }}
              >
                Continuer
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="fade-up">
              <p style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: GOLD, marginBottom: 10, textAlign: 'center' }}>Étape 2 · 3</p>
              <h2 style={{ fontFamily: serif, fontSize: 36, fontWeight: 400, textAlign: 'center', margin: '0 0 36px', color: TEXT }}>
                La collection
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 36 }}>
                {cols.map(col => (
                  <div
                    key={col.slug}
                    onClick={() => setForm(f => ({ ...f, collection: col.slug }))}
                    style={{
                      padding: '18px 16px', background: CARD, cursor: 'pointer', borderRadius: 8,
                      border: `2px solid ${form.collection === col.slug ? GOLD : BORDER}`,
                      background: form.collection === col.slug ? 'rgba(201,169,110,0.05)' : CARD,
                      transition: 'all 0.2s',
                      boxShadow: form.collection === col.slug ? '0 2px 8px rgba(201,169,110,0.15)' : '0 1px 4px rgba(42,31,24,0.06)',
                    }}
                  >
                    <div style={{ fontFamily: serif, fontSize: 17, marginBottom: 5, color: TEXT }}>{col.name}</div>
                    <div style={{ fontSize: 11, color: MUTED }}>{col.description}</div>
                    {form.collection === col.slug && (
                      <div style={{ marginTop: 8, color: GOLD, fontSize: 11 }}>✓ Sélectionnée</div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, background: CARD, border: `1px solid ${BORDER}`, color: MUTED, padding: '14px', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 7 }}>
                  Retour
                </button>
                <button onClick={() => setStep(3)} style={{ flex: 2, background: GOLD, border: 'none', color: '#fff', padding: '14px', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 7 }}>
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="fade-up">
              <p style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: GOLD, marginBottom: 10, textAlign: 'center' }}>Étape 3 · 3</p>
              <h2 style={{ fontFamily: serif, fontSize: 36, fontWeight: 400, textAlign: 'center', margin: '0 0 36px', color: TEXT }}>
                La formule
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 36 }}>
                {FORMULAS.map(f => (
                  <div
                    key={f.id}
                    onClick={() => setForm(frm => ({ ...frm, formula: f.id }))}
                    style={{
                      padding: '18px 22px', background: CARD, cursor: 'pointer', borderRadius: 8,
                      border: `2px solid ${form.formula === f.id ? GOLD : BORDER}`,
                      background: form.formula === f.id ? 'rgba(201,169,110,0.05)' : CARD,
                      transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      boxShadow: form.formula === f.id ? '0 2px 8px rgba(201,169,110,0.15)' : '0 1px 4px rgba(42,31,24,0.06)',
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: serif, fontSize: 19, marginBottom: 4, color: TEXT }}>{FORMULA_LABELS[f.id]}</div>
                      <div style={{ fontSize: 11, color: MUTED }}>{f.desc}</div>
                    </div>
                    <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 22, color: GOLD, flexShrink: 0, marginLeft: 16 }}>{f.price}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, background: CARD, border: `1px solid ${BORDER}`, color: MUTED, padding: '14px', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 7 }}>
                  Retour
                </button>
                <button
                  onClick={handleCreate}
                  disabled={createMutation.isPending}
                  style={{ flex: 2, background: GOLD, border: 'none', color: '#fff', padding: '14px', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, borderRadius: 7, opacity: createMutation.isPending ? 0.6 : 1 }}
                >
                  {createMutation.isPending ? 'Création…' : 'Ouvrir l\'éditeur →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
