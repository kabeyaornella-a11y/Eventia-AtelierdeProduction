/**
 * InvitationViewer — page publique vue par les invités
 * Route : /i/:slug
 */
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'wouter';
import type { Block, BlockTypography } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Invitation {
  id: number;
  coupleName1: string;
  coupleName2: string;
  collection: string;
  formula: string;
  blocks: Block[];
  status: string;
  slug: string | null;
  eventDate: string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const API = (import.meta.env.VITE_API_BASE ?? '') + '/api';

function fontFaceStyle(typo: BlockTypography) {
  const families = [
    typo.title.family, typo.subtitle.family,
    typo.body.family, typo.other.family,
  ].filter(Boolean).join('|').replace(/ /g, '+');
  return `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
}

function fsStyle(fs: BlockTypography['title']): React.CSSProperties {
  return {
    fontFamily: `'${fs.family}', serif`,
    fontSize: fs.size,
    color: fs.color,
    fontWeight: fs.bold ? 700 : 400,
    fontStyle: fs.italic ? 'italic' : 'normal',
    letterSpacing: fs.letterSpacing,
    lineHeight: fs.lineHeight,
    textAlign: fs.align,
    textDecoration: fs.underline ? 'underline' : fs.strikethrough ? 'line-through' : 'none',
  };
}

function useCountdown(eventDate: string | null) {
  const [delta, setDelta] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    if (!eventDate) return;
    const target = new Date(eventDate).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setDelta({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [eventDate]);
  return delta;
}

// ─── Scratch Card Reveal ───────────────────────────────────────────────────────
function ScratchReveal({ onRevealed }: { onRevealed: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [pct, setPct] = useState(0);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = '#C9A96E';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Texture scratchy
    for (let i = 0; i < 800; i++) {
      ctx.fillStyle = `rgba(180,150,80,${Math.random() * 0.4})`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 4 + 1, Math.random() * 2 + 1);
    }
    // Texte "Grattez"
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '600 14px Jost';
    ctx.textAlign = 'center';
    ctx.fillText('✦  Grattez pour révéler  ✦', canvas.width / 2, canvas.height / 2);
  }, []);

  function scratch(x: number, y: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
    // Calcul progression
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] === 0) cleared++;
    const p = Math.round((cleared / (data.length / 4)) * 100);
    setPct(p);
    if (p > 55 && !revealed) { setRevealed(true); setTimeout(onRevealed, 600); }
  }

  function getPos(e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        cursor: 'crosshair', borderRadius: 12,
        opacity: revealed ? 0 : 1,
        transition: revealed ? 'opacity 0.6s ease' : 'none',
        zIndex: 2,
      }}
      onMouseDown={e => { isDrawing.current = true; scratch(...Object.values(getPos(e, canvasRef.current!)) as [number, number]); }}
      onMouseMove={e => { if (isDrawing.current) scratch(...Object.values(getPos(e, canvasRef.current!)) as [number, number]); }}
      onMouseUp={() => { isDrawing.current = false; }}
      onTouchStart={e => { e.preventDefault(); scratch(...Object.values(getPos(e, canvasRef.current!)) as [number, number]); }}
      onTouchMove={e => { e.preventDefault(); scratch(...Object.values(getPos(e, canvasRef.current!)) as [number, number]); }}
    />
  );
}

// ─── Block renderers ──────────────────────────────────────────────────────────

function BlockVideoIntro({ block, invitation, showScratch }: { block: Block; invitation: Invitation; showScratch: boolean }) {
  const [scratched, setScratched] = useState(!showScratch);
  const ty = block.typography;
  const bg = block.media.images[0] || null;
  const vid = block.media.video || null;

  return (
    <section style={{
      position: 'relative', minHeight: '100svh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: '#0F0C0A', overflow: 'hidden',
    }}>
      {/* Background */}
      {vid ? (
        <video src={vid} autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
      ) : bg ? (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4 }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, #1A1410 0%, #0A0806 100%)' }} />
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)' }} />

      {/* Scratch reveal overlay */}
      {showScratch && !scratched && (
        <div style={{
          position: 'absolute', inset: '12%', zIndex: 10, borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 0 0 1px rgba(201,169,110,0.4), 0 20px 60px rgba(0,0,0,0.6)',
          background: '#1A1410',
        }}>
          {/* Ce qui se révèle sous le grattage */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32, zIndex: 1,
          }}>
            <div style={{ ...fsStyle(ty.other), fontSize: 52 }}>✦</div>
            <div style={{ ...fsStyle(ty.title), fontSize: 32, lineHeight: 1.1 }}>
              {invitation.coupleName1} & {invitation.coupleName2}
            </div>
            {invitation.eventDate && (
              <div style={{ ...fsStyle(ty.subtitle), fontSize: 16, letterSpacing: 3 }}>
                {new Date(invitation.eventDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}
              </div>
            )}
            {block.content.venue && (
              <div style={{ ...fsStyle(ty.body), fontSize: 13 }}>{String(block.content.venue)}</div>
            )}
          </div>
          <ScratchReveal onRevealed={() => setScratched(true)} />
        </div>
      )}

      {/* Contenu principal — visible quand gratté */}
      <div style={{
        position: 'relative', zIndex: 3, textAlign: 'center', padding: '0 32px',
        opacity: scratched ? 1 : 0,
        transition: 'opacity 0.8s ease 0.3s',
        pointerEvents: scratched ? 'auto' : 'none',
      }}>
        {block.content.eyebrow && (
          <div style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 5, marginBottom: 24 }}>
            {String(block.content.eyebrow)}
          </div>
        )}
        <div style={{ ...fsStyle(ty.other), fontSize: 64, marginBottom: 8 }}>
          {block.content.icon ? String(block.content.icon) : '✦'}
        </div>
        <h1 style={{ ...fsStyle(ty.title), fontSize: 'clamp(36px, 10vw, 64px)', margin: '0 0 12px' }}>
          {block.content.name1 || invitation.coupleName1}
          <span style={{ color: '#C9A96E', margin: '0 12px', fontStyle: 'italic' }}>&</span>
          {block.content.name2 || invitation.coupleName2}
        </h1>
        {block.content.tagline && (
          <div style={{ ...fsStyle(ty.subtitle), fontSize: 16, marginTop: 16 }}>
            {String(block.content.tagline)}
          </div>
        )}
        {/* Scroll indicator */}
        <div style={{ marginTop: 60, animation: 'bounce 2s infinite' }}>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #C9A96E, transparent)', margin: '0 auto' }} />
          <div style={{ color: '#C9A96E', fontSize: 10, letterSpacing: 3, marginTop: 8 }}>DÉFILER</div>
        </div>
      </div>
    </section>
  );
}

function BlockTitleNames({ block, invitation }: { block: Block; invitation: Invitation }) {
  const ty = block.typography;
  return (
    <section style={{ background: '#0F0C0A', padding: '80px 32px', textAlign: 'center' }}>
      {block.content.eyebrow && (
        <div style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 5, marginBottom: 24 }}>
          {String(block.content.eyebrow)}
        </div>
      )}
      <h2 style={{ ...fsStyle(ty.title), fontSize: 'clamp(40px, 12vw, 72px)', margin: 0 }}>
        {block.content.name1 || invitation.coupleName1}
      </h2>
      <div style={{ ...fsStyle(ty.other), fontSize: 48, margin: '8px 0', color: '#C9A96E' }}>⁂</div>
      <h2 style={{ ...fsStyle(ty.title), fontSize: 'clamp(40px, 12vw, 72px)', margin: 0 }}>
        {block.content.name2 || invitation.coupleName2}
      </h2>
      {block.content.subtitle && (
        <div style={{ ...fsStyle(ty.subtitle), fontSize: 16, marginTop: 24 }}>{String(block.content.subtitle)}</div>
      )}
    </section>
  );
}

function BlockDateVenue({ block, invitation }: { block: Block; invitation: Invitation }) {
  const ty = block.typography;
  const date = invitation.eventDate
    ? new Date(invitation.eventDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : block.content.date ? String(block.content.date) : '';
  return (
    <section style={{ background: '#140E0A', padding: '80px 32px', textAlign: 'center', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
      <div style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 5, marginBottom: 32, color: '#C9A96E' }}>DATE & LIEU</div>
      {date && (
        <div style={{ ...fsStyle(ty.title), fontSize: 'clamp(22px, 6vw, 36px)', marginBottom: 8, textTransform: 'capitalize' }}>{date}</div>
      )}
      {block.content.time && (
        <div style={{ ...fsStyle(ty.subtitle), fontSize: 18, marginBottom: 24 }}>{String(block.content.time)}</div>
      )}
      <div style={{ width: 40, height: 1, background: '#C9A96E', margin: '24px auto' }} />
      {block.content.venue && (
        <div style={{ ...fsStyle(ty.title), fontSize: 'clamp(18px, 5vw, 28px)', marginBottom: 8 }}>{String(block.content.venue)}</div>
      )}
      {block.content.address && (
        <div style={{ ...fsStyle(ty.body), fontSize: 13, lineHeight: 1.8, color: 'rgba(249,246,241,0.6)' }}>
          {String(block.content.address)}
        </div>
      )}
    </section>
  );
}

function BlockCountdown({ block, invitation }: { block: Block; invitation: Invitation }) {
  const ty = block.typography;
  const { d, h, m, s } = useCountdown(invitation.eventDate);
  const pad = (n: number) => String(n).padStart(2, '0');
  const units = [['JOURS', d], ['HEURES', h], ['MIN', m], ['SEC', s]] as [string, number][];
  return (
    <section style={{ background: '#0F0C0A', padding: '80px 24px', textAlign: 'center', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
      <div style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 5, marginBottom: 40, color: '#C9A96E' }}>
        {block.content.label ? String(block.content.label) : 'COMPTE À REBOURS'}
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        {units.map(([lbl, val]) => (
          <div key={lbl} style={{
            background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.2)',
            borderRadius: 8, padding: '20px 16px', minWidth: 72,
          }}>
            <div style={{ ...fsStyle(ty.title), fontSize: 42, lineHeight: 1, color: '#C9A96E' }}>{pad(val)}</div>
            <div style={{ ...fsStyle(ty.body), fontSize: 9, letterSpacing: 3, marginTop: 8, color: 'rgba(249,246,241,0.4)' }}>{lbl}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BlockRSVP({ block, invitation }: { block: Block; invitation: Invitation }) {
  const ty = block.typography;
  const [step, setStep] = useState<'form' | 'confirm' | 'done'>('form');
  const [form, setForm] = useState({ guestName: '', attendance: '', guestCount: '1', dietary: '', message: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.guestName || !form.attendance) { setError('Merci de remplir votre nom et votre réponse.'); return; }
    setStep('confirm');
  }

  async function confirm() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, invitationId: String(invitation.id) }),
      });
      if (!res.ok) throw new Error();
      setStep('done');
    } catch {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
      setStep('form');
    } finally { setLoading(false); }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(249,246,241,0.05)',
    border: '1px solid rgba(201,169,110,0.25)', borderRadius: 6,
    padding: '14px 16px', color: '#F9F6F1', fontSize: 14,
    fontFamily: 'Jost, sans-serif', outline: 'none', boxSizing: 'border-box',
  };
  const btnGold: React.CSSProperties = {
    width: '100%', background: '#C9A96E', color: '#fff', border: 'none',
    padding: '16px', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
    cursor: 'pointer', borderRadius: 6, fontFamily: 'Jost, sans-serif',
    marginTop: 8, transition: 'opacity 0.2s',
  };

  return (
    <section style={{ background: '#140E0A', padding: '80px 32px', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <div style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 5, marginBottom: 12, color: '#C9A96E', textAlign: 'center' }}>RSVP</div>
        <h2 style={{ ...fsStyle(ty.title), fontSize: 32, textAlign: 'center', marginBottom: 8 }}>
          {block.content.title ? String(block.content.title) : 'Votre réponse'}
        </h2>
        {block.content.subtitle && (
          <p style={{ ...fsStyle(ty.body), textAlign: 'center', marginBottom: 32, fontSize: 14 }}>{String(block.content.subtitle)}</p>
        )}
        <p style={{ ...fsStyle(ty.body), textAlign: 'center', marginBottom: 40, fontSize: 13, color: 'rgba(249,246,241,0.5)' }}>
          {block.content.deadline ? `Répondre avant le ${String(block.content.deadline)}` : 'Merci de confirmer votre présence'}
        </p>

        {step === 'done' ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
            <div style={{ ...fsStyle(ty.title), fontSize: 24, marginBottom: 12 }}>Merci !</div>
            <div style={{ ...fsStyle(ty.body), fontSize: 14, color: 'rgba(249,246,241,0.7)' }}>
              {block.content.confirm ? String(block.content.confirm) : 'Votre réponse a bien été enregistrée.'}
            </div>
          </div>
        ) : step === 'confirm' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)', borderRadius: 8, padding: 20 }}>
              <div style={{ ...fsStyle(ty.body), fontSize: 13, marginBottom: 8, color: 'rgba(249,246,241,0.5)' }}>Récapitulatif</div>
              <div style={{ color: '#F9F6F1', fontSize: 15, marginBottom: 4, fontFamily: 'Cormorant Garamond, serif' }}>{form.guestName}</div>
              <div style={{ ...fsStyle(ty.body), fontSize: 13 }}>
                {form.attendance === 'yes' ? `✓ Présent(e) · ${form.guestCount} personne(s)` : form.attendance === 'no' ? '✗ Absent(e)' : '? Peut-être'}
              </div>
              {form.dietary && <div style={{ ...fsStyle(ty.body), fontSize: 12, marginTop: 4, color: 'rgba(249,246,241,0.5)' }}>{form.dietary}</div>}
            </div>
            {error && <div style={{ color: '#ef4444', fontSize: 13, textAlign: 'center' }}>{error}</div>}
            <button onClick={confirm} disabled={loading} style={btnGold}>
              {loading ? '…' : 'Confirmer ma réponse'}
            </button>
            <button onClick={() => setStep('form')} style={{ ...btnGold, background: 'transparent', border: '1px solid rgba(201,169,110,0.3)', color: '#C9A96E' }}>
              Modifier
            </button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 2, marginBottom: 6, display: 'block' }}>VOTRE NOM</label>
              <input style={inputStyle} value={form.guestName} onChange={e => setForm(f => ({ ...f, guestName: e.target.value }))} placeholder="Prénom Nom" />
            </div>
            <div>
              <label style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 2, marginBottom: 6, display: 'block' }}>VOTRE RÉPONSE</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[['yes', '✓ Présent(e)'], ['no', '✗ Absent(e)'], ['maybe', '? Peut-être']].map(([val, lbl]) => (
                  <button key={val} type="button" onClick={() => setForm(f => ({ ...f, attendance: val }))}
                    style={{
                      flex: 1, padding: '12px 6px', fontSize: 11, letterSpacing: 1,
                      border: `1px solid ${form.attendance === val ? '#C9A96E' : 'rgba(201,169,110,0.2)'}`,
                      background: form.attendance === val ? 'rgba(201,169,110,0.15)' : 'transparent',
                      color: form.attendance === val ? '#C9A96E' : 'rgba(249,246,241,0.6)',
                      borderRadius: 6, cursor: 'pointer', fontFamily: 'Jost, sans-serif',
                      transition: 'all 0.2s',
                    }}
                  >{lbl}</button>
                ))}
              </div>
            </div>
            {form.attendance === 'yes' && (
              <div>
                <label style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 2, marginBottom: 6, display: 'block' }}>NOMBRE DE PERSONNES</label>
                <select style={{ ...inputStyle, appearance: 'none' }} value={form.guestCount} onChange={e => setForm(f => ({ ...f, guestCount: e.target.value }))}>
                  {['1','2','3','4','5','6'].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            )}
            <div>
              <label style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 2, marginBottom: 6, display: 'block' }}>RESTRICTIONS ALIMENTAIRES (facultatif)</label>
              <input style={inputStyle} value={form.dietary} onChange={e => setForm(f => ({ ...f, dietary: e.target.value }))} placeholder="Végétarien, allergie…" />
            </div>
            <div>
              <label style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 2, marginBottom: 6, display: 'block' }}>UN MOT POUR LES MARIÉS (facultatif)</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Votre message…" />
            </div>
            {error && <div style={{ color: '#ef4444', fontSize: 13, textAlign: 'center' }}>{error}</div>}
            <button type="submit" style={btnGold}>Suivant →</button>
          </form>
        )}
      </div>
    </section>
  );
}

function BlockMapAccess({ block }: { block: Block }) {
  const ty = block.typography;
  const address = block.content.address ? encodeURIComponent(String(block.content.address)) : '';
  return (
    <section style={{ background: '#0F0C0A', padding: '80px 32px', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
      <div style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 5, marginBottom: 32, color: '#C9A96E', textAlign: 'center' }}>PLAN & ACCÈS</div>
      {block.content.venue && <h3 style={{ ...fsStyle(ty.title), fontSize: 26, textAlign: 'center', marginBottom: 8 }}>{String(block.content.venue)}</h3>}
      {block.content.address && <p style={{ ...fsStyle(ty.body), fontSize: 13, textAlign: 'center', lineHeight: 1.8, marginBottom: 24 }}>{String(block.content.address)}</p>}
      {/* Carte iframe */}
      {address && (
        <div style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 20, border: '1px solid rgba(201,169,110,0.15)' }}>
          <iframe
            title="map"
            width="100%" height="200" style={{ border: 'none', display: 'block', filter: 'grayscale(0.3) invert(0.9) hue-rotate(160deg)' }}
            src={`https://maps.google.com/maps?q=${address}&output=embed&zoom=15`}
          />
        </div>
      )}
      {block.content.address && (
        <a href={`https://maps.google.com/?q=${address}`} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', textAlign: 'center', color: '#C9A96E', fontSize: 11, letterSpacing: 2, textDecoration: 'none' }}>
          📍 OUVRIR DANS GOOGLE MAPS
        </a>
      )}
      {block.content.directions && (
        <p style={{ ...fsStyle(ty.body), fontSize: 13, marginTop: 24, lineHeight: 1.8, color: 'rgba(249,246,241,0.6)', textAlign: 'center' }}>{String(block.content.directions)}</p>
      )}
    </section>
  );
}

function BlockShareLink({ block, invitation }: { block: Block; invitation: Invitation }) {
  const ty = block.typography;
  const url = window.location.href;
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };
  const wa = `https://wa.me/?text=${encodeURIComponent(`${invitation.coupleName1} & ${invitation.coupleName2} — ${url}`)}`;
  return (
    <section style={{ background: '#140E0A', padding: '80px 32px', borderTop: '1px solid rgba(201,169,110,0.1)', textAlign: 'center' }}>
      <div style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 5, marginBottom: 16, color: '#C9A96E' }}>PARTAGER</div>
      {block.content.text && <p style={{ ...fsStyle(ty.body), fontSize: 14, marginBottom: 32, maxWidth: 340, margin: '0 auto 32px' }}>{String(block.content.text)}</p>}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href={wa} target="_blank" rel="noopener noreferrer" style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px',
          border: '1px solid rgba(201,169,110,0.3)', borderRadius: 6, color: '#C9A96E',
          textDecoration: 'none', fontSize: 11, letterSpacing: 1.5, fontFamily: 'Jost, sans-serif',
        }}>💬 WHATSAPP</a>
        <button onClick={copy} style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px',
          border: '1px solid rgba(201,169,110,0.3)', borderRadius: 6, color: '#C9A96E',
          background: 'transparent', fontSize: 11, letterSpacing: 1.5, cursor: 'pointer',
          fontFamily: 'Jost, sans-serif', transition: 'all 0.2s',
        }}>{copied ? '✓ COPIÉ' : '🔗 COPIER LE LIEN'}</button>
      </div>
    </section>
  );
}

function BlockOurStory({ block }: { block: Block }) {
  const ty = block.typography;
  const items: { date: string; title: string; text: string }[] = (() => {
    try { return JSON.parse(String(block.content.items || '[]')); } catch { return []; }
  })();
  return (
    <section style={{ background: '#0F0C0A', padding: '80px 32px', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
      <div style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 5, marginBottom: 12, color: '#C9A96E', textAlign: 'center' }}>NOTRE HISTOIRE</div>
      {block.content.title && <h2 style={{ ...fsStyle(ty.title), fontSize: 28, textAlign: 'center', marginBottom: 48 }}>{String(block.content.title)}</h2>}
      <div style={{ maxWidth: 500, margin: '0 auto', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.3), transparent)' }} />
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 24, marginBottom: 40, position: 'relative' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.3)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#C9A96E', fontSize: 14 }}>✦</span>
            </div>
            <div style={{ paddingTop: 6 }}>
              {item.date && <div style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 3, color: '#C9A96E', marginBottom: 4 }}>{item.date}</div>}
              {item.title && <div style={{ ...fsStyle(ty.subtitle), fontSize: 18, marginBottom: 6 }}>{item.title}</div>}
              {item.text && <div style={{ ...fsStyle(ty.body), fontSize: 13, lineHeight: 1.8, color: 'rgba(249,246,241,0.65)' }}>{item.text}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BlockGallery({ block }: { block: Block }) {
  const ty = block.typography;
  const images = block.media.images;
  return (
    <section style={{ background: '#140E0A', padding: '80px 0', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
      <div style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 5, marginBottom: 32, color: '#C9A96E', textAlign: 'center' }}>GALERIE</div>
      {images.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3, padding: '0 3px' }}>
          {images.map((src, i) => (
            <div key={i} style={{ aspectRatio: i === 0 ? '2/1' : '1', gridColumn: i === 0 ? '1/-1' : 'auto', overflow: 'hidden' }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: 'rgba(249,246,241,0.2)', fontSize: 40 }}>🖼️</div>
      )}
    </section>
  );
}

function BlockDressCode({ block }: { block: Block }) {
  const ty = block.typography;
  return (
    <section style={{ background: '#0F0C0A', padding: '80px 32px', borderTop: '1px solid rgba(201,169,110,0.1)', textAlign: 'center' }}>
      <div style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 5, marginBottom: 12, color: '#C9A96E' }}>DRESS CODE</div>
      {block.content.title && <h2 style={{ ...fsStyle(ty.title), fontSize: 28, marginBottom: 16 }}>{String(block.content.title)}</h2>}
      {block.content.description && <p style={{ ...fsStyle(ty.body), fontSize: 14, lineHeight: 1.9, maxWidth: 380, margin: '0 auto 32px', color: 'rgba(249,246,241,0.7)' }}>{String(block.content.description)}</p>}
      {block.content.palette && (
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {String(block.content.palette).split(',').map((c, i) => (
            <div key={i} style={{ width: 40, height: 40, borderRadius: '50%', background: c.trim(), border: '2px solid rgba(255,255,255,0.1)' }} />
          ))}
        </div>
      )}
    </section>
  );
}

function BlockMenu({ block }: { block: Block }) {
  const ty = block.typography;
  const courses: { name: string; items: string }[] = (() => {
    try { return JSON.parse(String(block.content.courses || '[]')); } catch { return []; }
  })();
  return (
    <section style={{ background: '#140E0A', padding: '80px 32px', borderTop: '1px solid rgba(201,169,110,0.1)', textAlign: 'center' }}>
      <div style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 5, marginBottom: 12, color: '#C9A96E' }}>MENU</div>
      {block.content.title && <h2 style={{ ...fsStyle(ty.title), fontSize: 26, marginBottom: 40 }}>{String(block.content.title)}</h2>}
      {courses.map((c, i) => (
        <div key={i} style={{ marginBottom: 32 }}>
          <div style={{ ...fsStyle(ty.subtitle), fontSize: 12, letterSpacing: 3, marginBottom: 10, color: '#C9A96E' }}>{c.name?.toUpperCase()}</div>
          <div style={{ ...fsStyle(ty.body), fontSize: 14, lineHeight: 2, color: 'rgba(249,246,241,0.8)' }}>
            {c.items?.split('\n').map((l, j) => <div key={j}>{l}</div>)}
          </div>
          {i < courses.length - 1 && <div style={{ width: 30, height: 1, background: 'rgba(201,169,110,0.2)', margin: '20px auto 0' }} />}
        </div>
      ))}
    </section>
  );
}

function BlockProgram({ block }: { block: Block }) {
  const ty = block.typography;
  const items: { time: string; title: string; text?: string }[] = (() => {
    try { return JSON.parse(String(block.content.items || '[]')); } catch { return []; }
  })();
  return (
    <section style={{ background: '#0F0C0A', padding: '80px 32px', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
      <div style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 5, marginBottom: 12, color: '#C9A96E', textAlign: 'center' }}>PROGRAMME</div>
      {block.content.title && <h2 style={{ ...fsStyle(ty.title), fontSize: 26, textAlign: 'center', marginBottom: 40 }}>{String(block.content.title)}</h2>}
      <div style={{ maxWidth: 440, margin: '0 auto' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
            <div style={{ ...fsStyle(ty.body), fontSize: 11, letterSpacing: 2, color: '#C9A96E', minWidth: 56, paddingTop: 3 }}>{item.time}</div>
            <div>
              <div style={{ ...fsStyle(ty.subtitle), fontSize: 16, marginBottom: 4 }}>{item.title}</div>
              {item.text && <div style={{ ...fsStyle(ty.body), fontSize: 13, color: 'rgba(249,246,241,0.55)', lineHeight: 1.7 }}>{item.text}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BlockFAQ({ block }: { block: Block }) {
  const ty = block.typography;
  const [open, setOpen] = useState<number | null>(null);
  const items: { q: string; a: string }[] = (() => {
    try { return JSON.parse(String(block.content.items || '[]')); } catch { return []; }
  })();
  return (
    <section style={{ background: '#140E0A', padding: '80px 32px', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
      <div style={{ ...fsStyle(ty.body), fontSize: 10, letterSpacing: 5, marginBottom: 12, color: '#C9A96E', textAlign: 'center' }}>FAQ</div>
      {block.content.title && <h2 style={{ ...fsStyle(ty.title), fontSize: 26, textAlign: 'center', marginBottom: 40 }}>{String(block.content.title)}</h2>}
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        {items.map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid rgba(201,169,110,0.1)', marginBottom: 0 }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{
              width: '100%', textAlign: 'left', padding: '18px 0',
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              color: '#F9F6F1', fontFamily: `'${ty.title.family}', serif`, fontSize: 16,
            }}>
              {item.q}
              <span style={{ color: '#C9A96E', fontSize: 18, transition: 'transform 0.2s', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            {open === i && (
              <div style={{ ...fsStyle(ty.body), fontSize: 13, lineHeight: 1.9, paddingBottom: 18, color: 'rgba(249,246,241,0.6)' }}>{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function BlockThanks({ block, invitation }: { block: Block; invitation: Invitation }) {
  const ty = block.typography;
  return (
    <section style={{ background: '#0F0C0A', padding: '100px 32px 120px', borderTop: '1px solid rgba(201,169,110,0.1)', textAlign: 'center' }}>
      {block.content.text ? (
        <p style={{ ...fsStyle(ty.body), fontSize: 16, lineHeight: 2, maxWidth: 400, margin: '0 auto 40px', color: 'rgba(249,246,241,0.8)', fontStyle: 'italic' }}>{String(block.content.text)}</p>
      ) : null}
      <div style={{ ...fsStyle(ty.other), fontSize: 40, marginBottom: 8, color: '#C9A96E' }}>
        {invitation.coupleName1.charAt(0)} ✦ {invitation.coupleName2.charAt(0)}
      </div>
      <div style={{ ...fsStyle(ty.title), fontSize: 18 }}>
        {invitation.coupleName1} & {invitation.coupleName2}
      </div>
    </section>
  );
}

function BlockGeneric({ block }: { block: Block }) {
  const ty = block.typography;
  return (
    <section style={{ background: '#0F0C0A', padding: '60px 32px', borderTop: '1px solid rgba(201,169,110,0.1)', textAlign: 'center' }}>
      {block.content.title && <h2 style={{ ...fsStyle(ty.title), fontSize: 26, marginBottom: 16 }}>{String(block.content.title)}</h2>}
      {block.content.text && <p style={{ ...fsStyle(ty.body), fontSize: 14, lineHeight: 1.9, maxWidth: 400, margin: '0 auto', color: 'rgba(249,246,241,0.7)' }}>{String(block.content.text)}</p>}
    </section>
  );
}

function BlockTextFree({ block }: { block: Block }) {
  const ty = block.typography;
  return (
    <section style={{ background: '#0F0C0A', padding: '60px 32px', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
      <div style={{ maxWidth: 500, margin: '0 auto', ...fsStyle(ty.body), fontSize: 15, lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>
        {String(block.content.text || '')}
      </div>
    </section>
  );
}

// ─── Scroll animation wrapper ─────────────────────────────────────────────────
function AnimatedBlock({ block, children }: { block: Block; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(block.animation.entrance === 'none');

  useEffect(() => {
    if (block.animation.entrance === 'none') return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [block.animation.entrance]);

  const anim = block.animation.entrance;
  const baseStyle: React.CSSProperties = {
    transition: 'opacity 0.7s ease, transform 0.7s ease',
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : anim === 'slideUp' ? 'translateY(30px)' : anim === 'slideLeft' ? 'translateX(-30px)' : anim === 'slideRight' ? 'translateX(30px)' : anim === 'zoomIn' ? 'scale(0.96)' : 'none',
  };

  return <div ref={ref} style={baseStyle}>{children}</div>;
}

// ─── Layers renderer ──────────────────────────────────────────────────────────
function LayersOverlay({ block }: { block: Block }) {
  if (!block.layers?.length) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
      {block.layers.map(layer => (
        <div key={layer.id} style={{
          position: 'absolute',
          left: `${layer.x}%`, top: `${layer.y}%`,
          width: `${layer.width}%`,
          transform: `rotate(${layer.rotation}deg)`,
          opacity: layer.opacity,
          zIndex: layer.zIndex,
          fontFamily: `'${layer.fontFamily}', serif`,
          fontSize: layer.fontSize,
          color: layer.color,
          fontWeight: layer.bold ? 700 : 400,
          fontStyle: layer.italic ? 'italic' : 'normal',
          textAlign: layer.textAlign,
          lineHeight: 1.3,
        }}>
          {layer.kind === 'text' && layer.text}
          {layer.kind === 'icon' && layer.emoji}
          {(layer.kind === 'photo' || layer.kind === 'frame') && layer.src && (
            <img src={layer.src} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main block router ────────────────────────────────────────────────────────
function RenderBlock({ block, invitation, isFirst }: { block: Block; invitation: Invitation; isFirst: boolean }) {
  if (!block.enabled) return null;
  // Le scratch card n'est disponible que sur le premier bloc si la formule = save_the_date
  const showScratch = isFirst && (invitation.formula === 'save_the_date' || Boolean(block.content.scratch));

  let content: React.ReactNode;
  switch (block.type) {
    case 'video_intro':   content = <BlockVideoIntro block={block} invitation={invitation} showScratch={showScratch} />; break;
    case 'title_names':   content = <BlockTitleNames block={block} invitation={invitation} />; break;
    case 'date_venue':    content = <BlockDateVenue block={block} invitation={invitation} />; break;
    case 'countdown':     content = <BlockCountdown block={block} invitation={invitation} />; break;
    case 'rsvp':          content = <BlockRSVP block={block} invitation={invitation} />; break;
    case 'map_access':    content = <BlockMapAccess block={block} />; break;
    case 'share_link':    content = <BlockShareLink block={block} invitation={invitation} />; break;
    case 'dress_code':    content = <BlockDressCode block={block} />; break;
    case 'our_story':     content = <BlockOurStory block={block} />; break;
    case 'gallery':       content = <BlockGallery block={block} />; break;
    case 'menu':          content = <BlockMenu block={block} />; break;
    case 'program':       content = <BlockProgram block={block} />; break;
    case 'faq':           content = <BlockFAQ block={block} />; break;
    case 'thanks':        content = <BlockThanks block={block} invitation={invitation} />; break;
    case 'text_free':     content = <BlockTextFree block={block} />; break;
    default:              content = <BlockGeneric block={block} />; break;
  }

  return (
    <div style={{ position: 'relative' }}>
      <AnimatedBlock block={block}>{content}</AnimatedBlock>
      <LayersOverlay block={block} />
    </div>
  );
}

// ─── Main viewer ──────────────────────────────────────────────────────────────
export default function InvitationViewer() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    fetch(`${API}/invitations/slug/${slug}`)
      .then(r => { if (!r.ok) throw new Error('not_found'); return r.json(); })
      .then(data => setInvitation(data))
      .catch(() => setError('Invitation introuvable.'))
      .finally(() => setLoading(false));
  }, [slug]);

  // Inject Google Fonts
  useEffect(() => {
    if (!invitation?.blocks?.length) return;
    const block = invitation.blocks[0];
    const href = fontFaceStyle(block.typography);
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet'; link.href = href;
      document.head.appendChild(link);
    }
  }, [invitation]);

  if (loading) return (
    <div style={{ minHeight: '100svh', background: '#0F0C0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#C9A96E', fontSize: 10, letterSpacing: 5, animation: 'pulse 1.5s ease infinite' }}>✦</div>
    </div>
  );

  if (error || !invitation) return (
    <div style={{ minHeight: '100svh', background: '#0F0C0A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <div style={{ color: '#C9A96E', fontSize: 36 }}>✦</div>
      <div style={{ color: 'rgba(249,246,241,0.5)', fontFamily: 'Jost, sans-serif', fontSize: 14, letterSpacing: 2 }}>
        {error || 'Invitation introuvable'}
      </div>
    </div>
  );

  const enabledBlocks = invitation.blocks.filter(b => b.enabled);

  return (
    <div style={{ background: '#0F0C0A', minHeight: '100svh', maxWidth: 480, margin: '0 auto', position: 'relative' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
        select option { background: #1A1410; color: #F9F6F1; }
        textarea, input, select { color-scheme: dark; }
      `}</style>

      {enabledBlocks.map((block, i) => (
        <RenderBlock key={block.id} block={block} invitation={invitation} isFirst={i === 0} />
      ))}

      {/* Footer discret */}
      <div style={{
        padding: '24px', textAlign: 'center',
        borderTop: '1px solid rgba(201,169,110,0.08)',
        fontFamily: 'Jost, sans-serif', fontSize: 9, letterSpacing: 2,
        color: 'rgba(249,246,241,0.15)',
      }}>
        EVENTIA SIGNATURE
      </div>
    </div>
  );
}
