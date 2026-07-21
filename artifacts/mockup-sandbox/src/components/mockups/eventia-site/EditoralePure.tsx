import { useState, useEffect, useRef } from "react";

const GOLD = "#C9A96E";
const DARK = "#2A1F18";
const IVORY = "#FAF8F5";
const MUTED = "#6B5C54";
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

/* ─── CSS keyframes injected once ─── */
const STYLES = `
@keyframes kenBurns {
  0%   { transform: scale(1)    translate(0,0); }
  50%  { transform: scale(1.07) translate(-1.5%, 0.8%); }
  100% { transform: scale(1)    translate(0, 0); }
}
@keyframes phoneFloat {
  0%,100% { transform: translateY(0px) rotate(-1.5deg); }
  50%      { transform: translateY(-14px) rotate(-1.5deg); }
}
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes scrollInvite {
  0%,15%  { transform: translateY(0); }
  45%,60% { transform: translateY(-40%); }
  90%,100%{ transform: translateY(0); }
}
@keyframes glowPulse {
  0%,100% { box-shadow: 0 0 40px rgba(201,169,110,0.2), 0 60px 120px rgba(0,0,0,0.6); }
  50%     { box-shadow: 0 0 80px rgba(201,169,110,0.35), 0 60px 120px rgba(0,0,0,0.6); }
}
.hero-text-1,.hero-text-2,.hero-text-3,.hero-text-4 { opacity: 1; }
`;

/* ─── Roman numeral map ─── */
const ROMAN: Record<number, string> = { 1: "I", 2: "II", 3: "III" };

/* ─── Data ─── */
const COLLECTIONS = [
  { name: "Les Voiles", tagline: "Aérien · Délicat · Textile", img: "/__mockup/images/collection-voiles.jpg", from: "179€" },
  { name: "Les Seuils", tagline: "Passages · Seuils · Transitions", img: "/__mockup/images/collection-seuils.jpg", from: "179€" },
  { name: "Les Écrins", tagline: "Joaillerie · Précieux · Écrin", img: "/__mockup/images/collection-ecrins.jpg", from: "179€" },
  { name: "L'Union",   tagline: "Chaleur · Famille · Promesse",   img: "/__mockup/images/collection-union.jpg",  from: "179€" },
];

const PLANS = [
  {
    name: "L'Essentielle", price: "179€", tag: null,
    features: ["9 séquences de contenu", "RSVP intégré", "Compte à rebours animé", "Lien unique partageable", "Livraison en 7 jours"],
  },
  {
    name: "La Signature", price: "269€", tag: "La plus choisie",
    features: ["Tout L'Essentielle", "Notre histoire", "Dress code animé", "Empreintes personnalisées", "Galerie de mémoires", "Plan interactif"],
  },
  {
    name: "L'Exception", price: "549€", tag: null,
    features: ["Tout La Signature", "Hébergements", "Programme des festivités", "Liste de souhaits", "Album live en temps réel", "Accompagnement prioritaire"],
  },
];

const TESTIMONIALS = [
  { name: "Amélie & Thomas", loc: "Paris · Juin 2025", text: "Nos convives nous en parlent encore. L'effet était total, immédiat, inoubliable." },
  { name: "Chiara & Maxime", loc: "Lyon · Septembre 2025", text: "Rien ne nous avait préparé à quelque chose d'aussi cinématique. Bien au-delà de nos espérances." },
  { name: "Inès & Karim",   loc: "Bordeaux · Avril 2026", text: "Eventia a capturé notre histoire. Chaque seconde ressemblait à un court-métrage." },
];

/* ─── iPhone CSS mockup ─── */
function PhoneMockup() {
  return (
    <div style={{
      width: 260, height: 520,
      background: "#0e0e0e",
      borderRadius: 44,
      border: "10px solid #1c1c1e",
      boxShadow: "0 0 0 1px #333, inset 0 0 0 1px rgba(255,255,255,0.06)",
      position: "relative", overflow: "hidden",
      animation: "phoneFloat 5s ease-in-out infinite, glowPulse 5s ease-in-out infinite",
      flexShrink: 0,
    }}>
      {/* Dynamic island */}
      <div style={{
        position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
        width: 90, height: 26, background: "#0e0e0e",
        borderRadius: 20, zIndex: 10,
      }} />
      {/* Screen content — scrolling invitation */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div style={{
          animation: "scrollInvite 10s ease-in-out infinite",
          background: "linear-gradient(160deg, #12101a 0%, #1e1428 45%, #0d1a12 100%)",
          padding: "52px 20px 32px",
          minHeight: "160%",
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 10,
        }}>
          {/* Floral ornament */}
          <div style={{ fontSize: 28, opacity: 0.6, color: GOLD, lineHeight: 1 }}>✦ ✦ ✦</div>
          <div style={{ width: 60, height: 1, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
          <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 11, color: "rgba(201,169,110,0.7)", letterSpacing: 2, textTransform: "uppercase", textAlign: "center", margin: 0 }}>
            Nous avons l'honneur de vous convier
          </p>
          <p style={{ fontFamily: serif, fontSize: 28, color: "#f9f6f1", textAlign: "center", margin: 0, lineHeight: 1.1 }}>
            Sophie<br />&amp;<br />Alexandre
          </p>
          <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.4 }} />
          <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(249,246,241,0.6)", letterSpacing: 1.5, textTransform: "uppercase", textAlign: "center", margin: 0 }}>
            Le 12 Septembre 2026<br />
            Château de Vaux-le-Vicomte
          </p>
          <div style={{ fontSize: 22, opacity: 0.35, color: GOLD, marginTop: 4 }}>✦</div>
          {/* RSVP button */}
          <button style={{
            marginTop: 8, padding: "8px 24px",
            background: "transparent", border: `1px solid ${GOLD}`,
            color: GOLD, fontFamily: sans, fontSize: 10, letterSpacing: 2,
            textTransform: "uppercase", borderRadius: 0, cursor: "pointer",
          }}>
            RSVP
          </button>
          {/* Second scroll section */}
          <div style={{ marginTop: 24, width: "100%", borderTop: "1px solid rgba(201,169,110,0.15)", paddingTop: 20 }}>
            <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 13, color: "rgba(249,246,241,0.5)", textAlign: "center" }}>
              Programme de la journée
            </p>
            {["14h — Cérémonie", "16h — Cocktail", "19h — Dîner & Bal"].map(t => (
              <p key={t} style={{ fontFamily: sans, fontSize: 10, color: "rgba(249,246,241,0.45)", textAlign: "center", letterSpacing: 1, margin: "6px 0" }}>{t}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Collections carousel ─── */
function CollectionsCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    timerRef.current = setInterval(() => setActive(p => (p + 1) % COLLECTIONS.length), 4000);
  };
  useEffect(() => { start(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  const go = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActive(i);
    start();
  };

  return (
    <div>
      {/* Large featured card + side strip */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, height: 520 }}>
        {/* Featured */}
        <div style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}>
          {COLLECTIONS.map((c, i) => (
            <div key={c.name} style={{
              position: "absolute", inset: 0,
              opacity: i === active ? 1 : 0,
              transition: "opacity 0.9s ease",
            }}>
              <img src={c.img} alt={c.name} style={{
                width: "100%", height: "100%", objectFit: "cover",
                transform: i === active ? "scale(1.04)" : "scale(1)",
                transition: "transform 6s ease, opacity 0.9s ease",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(26,17,10,0.85) 0%, rgba(26,17,10,0.2) 50%, transparent 100%)",
              }} />
              <div style={{ position: "absolute", bottom: 40, left: 48, right: 48 }}>
                <div style={{ fontFamily: serif, fontSize: 44, fontWeight: 400, color: "#F9F6F1", lineHeight: 1 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "rgba(249,246,241,0.6)", letterSpacing: 3, textTransform: "uppercase", marginTop: 8 }}>{c.tagline}</div>
                <div style={{ marginTop: 16, display: "flex", gap: 16, alignItems: "center" }}>
                  <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 20, color: GOLD }}>à partir de {c.from}</span>
                  <span style={{ fontSize: 11, color: "rgba(249,246,241,0.5)", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>
                    Découvrir →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Side thumbnails */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {COLLECTIONS.map((c, i) => (
            <div key={c.name} onClick={() => go(i)} style={{
              position: "relative", overflow: "hidden", flex: 1, cursor: "pointer",
              outline: i === active ? `2px solid ${GOLD}` : "2px solid transparent",
              transition: "outline 0.4s ease",
            }}>
              <img src={c.img} alt={c.name} style={{
                width: "100%", height: "100%", objectFit: "cover",
                filter: i === active ? "none" : "brightness(0.45)",
                transition: "filter 0.4s ease",
              }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 12px",
                background: "linear-gradient(to top, rgba(26,17,10,0.8), transparent)",
              }}>
                <div style={{
                  fontFamily: serif, fontSize: 14, color: i === active ? "#F9F6F1" : "rgba(249,246,241,0.5)",
                  transition: "color 0.4s ease",
                }}>{c.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 24 }}>
        {COLLECTIONS.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{
            width: i === active ? 28 : 8, height: 2,
            background: i === active ? GOLD : "rgba(201,169,110,0.3)",
            border: "none", cursor: "pointer", padding: 0,
            transition: "width 0.4s ease, background 0.4s ease",
          }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Pricing accordion ─── */
function PricingAccordion() {
  const [selected, setSelected] = useState(1);
  return (
    <div style={{ display: "flex", gap: 12, maxWidth: 1080, margin: "0 auto", alignItems: "stretch" }}>
      {PLANS.map((plan, i) => {
        const isActive = i === selected;
        return (
          <div
            key={plan.name}
            onClick={() => setSelected(i)}
            style={{
              cursor: "pointer",
              flex: isActive ? 2.2 : 0.9,
              transition: "flex 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease, transform 0.4s ease",
              opacity: isActive ? 1 : 0.55,
              transform: isActive ? "scale(1)" : "scale(0.97)",
              background: isActive ? DARK : "#F0EBE4",
              color: isActive ? "#F9F6F1" : DARK,
              padding: isActive ? "52px 40px" : "40px 24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {plan.tag && isActive && (
              <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                background: GOLD, color: DARK,
                fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase",
                padding: "5px 18px",
              }}>{plan.tag}</div>
            )}
            <div style={{
              fontFamily: serif, fontSize: isActive ? 24 : 18,
              fontWeight: 400, marginBottom: 6,
              transition: "font-size 0.4s ease",
            }}>{plan.name}</div>
            <div style={{
              fontFamily: serif, fontStyle: "italic",
              fontSize: isActive ? 52 : 36, color: GOLD,
              marginBottom: isActive ? 32 : 16,
              transition: "font-size 0.4s ease, margin 0.4s ease",
            }}>{plan.price}</div>
            {isActive && (
              <div>
                <div style={{ borderTop: "1px solid rgba(249,246,241,0.12)", paddingTop: 24 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ fontSize: 14, marginBottom: 12, display: "flex", gap: 10, color: "rgba(249,246,241,0.8)" }}>
                      <span style={{ color: GOLD }}>◆</span> {f}
                    </div>
                  ))}
                </div>
                <button style={{
                  marginTop: 32, width: "100%", padding: "14px",
                  background: GOLD, border: "none", color: DARK,
                  fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase",
                  cursor: "pointer", fontFamily: sans,
                }}>Composer cette expérience</button>
              </div>
            )}
            {!isActive && (
              <div style={{ fontSize: 12, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 8 }}>
                En savoir plus →
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main component ─── */
export function EditoralePure() {
  return (
    <div style={{ fontFamily: sans, background: IVORY, color: "#1A1514", overflowX: "hidden" }}>
      <style>{STYLES}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(250,248,245,0.94)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(201,169,110,0.12)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 52px", height: 64,
      }}>
        <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 21, color: GOLD, letterSpacing: 0.5 }}>
          Eventia Signature
        </span>
        <div style={{ display: "flex", gap: 40, fontSize: 10.5, letterSpacing: 3, textTransform: "uppercase", color: MUTED }}>
          {["Collections", "Tarifs", "Notre maison", "Contact"].map(l => (
            <span key={l} style={{ cursor: "pointer" }}>{l}</span>
          ))}
        </div>
        <button style={{
          border: `1px solid ${GOLD}`, color: GOLD, background: "transparent",
          padding: "10px 26px", fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", cursor: "pointer",
        }}>Vivre l'expérience</button>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 64, minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", overflow: "hidden" }}>
        {/* Ken Burns background */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `url('/__mockup/images/hero-bg.jpg')`,
          backgroundSize: "cover", backgroundPosition: "center",
          animation: "kenBurns 18s ease-in-out infinite",
          opacity: 0.14,
        }} />
        {/* Directional gradient overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: `linear-gradient(105deg, rgba(250,248,245,0.97) 40%, rgba(250,248,245,0.6) 70%, rgba(250,248,245,0.2) 100%)`,
        }} />

        {/* Left: Text */}
        <div style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "100px 64px",
        }}>
          {/* Overline */}
          <div className="hero-text-1" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            marginBottom: 28, width: "fit-content",
          }}>
            <div style={{ width: 32, height: 1, background: GOLD }} />
            <span style={{ fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase", color: GOLD }}>
              Maison d'art immersif
            </span>
          </div>

          {/* Main headline */}
          <h1 className="hero-text-2" style={{
            fontFamily: serif, fontSize: "clamp(56px, 5.8vw, 88px)",
            fontWeight: 400, lineHeight: 1.0, margin: "0 0 24px",
            letterSpacing: "-0.5px",
          }}>
            L'expérience qui<br />
            <em style={{ fontStyle: "italic", color: GOLD }}>marque à jamais</em>
          </h1>

          {/* Sub */}
          <p className="hero-text-3" style={{
            fontSize: 15.5, color: MUTED, lineHeight: 1.75,
            maxWidth: 400, marginBottom: 44, fontWeight: 300,
          }}>
            Des expériences immersives, conçues comme des œuvres d'art.
            Chaque séquence pensée, chaque détail vivant — pour que vos convives
            traversent un moment, pas un message.
          </p>

          <div className="hero-text-4" style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <button style={{
              background: GOLD, color: "#FAF8F5", border: "none",
              padding: "17px 40px", fontSize: 11, letterSpacing: 2.5,
              textTransform: "uppercase", cursor: "pointer", fontFamily: sans,
            }}>
              Composer votre expérience
            </button>
            <span style={{ fontSize: 13, color: "#A0907A", cursor: "pointer", letterSpacing: 0.5 }}>
              Voir les collections →
            </span>
          </div>

          {/* Social proof — real, no fake press */}
          <div style={{
            marginTop: 52, paddingTop: 28,
            borderTop: "1px solid rgba(201,169,110,0.2)",
            display: "flex", gap: 40, alignItems: "center",
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 28, color: GOLD }}>+500</div>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#A0907A", marginTop: 2 }}>Couples</div>
            </div>
            <div style={{ width: 1, height: 36, background: "rgba(201,169,110,0.25)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 28, color: GOLD }}>4.9★</div>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#A0907A", marginTop: 2 }}>Satisfaction</div>
            </div>
            <div style={{ width: 1, height: 36, background: "rgba(201,169,110,0.25)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 28, color: GOLD }}>7j</div>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#A0907A", marginTop: 2 }}>Livraison</div>
            </div>
          </div>
        </div>

        {/* Right: Phone */}
        <div style={{
          position: "relative", zIndex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "80px 48px",
        }}>
          {/* Glow halo */}
          <div style={{
            position: "absolute", width: 420, height: 420, borderRadius: "50%",
            background: `radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)`,
          }} />
          <PhoneMockup />
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      <section style={{ padding: "110px 64px", background: "#F5F0E8" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 10, letterSpacing: 4.5, textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Nos collections</p>
          <h2 style={{ fontFamily: serif, fontSize: 52, fontWeight: 400, margin: 0 }}>
            Quatre univers,<em style={{ fontStyle: "italic" }}> une seule promesse</em>
          </h2>
          <p style={{ color: MUTED, fontSize: 15, marginTop: 14, fontWeight: 300, maxWidth: 520, margin: "14px auto 0" }}>
            Chaque collection est un monde visuel complet. Ses ambiances, ses mouvements, son récit.
          </p>
        </div>
        <CollectionsCarousel />
      </section>

      {/* ── SAVE THE DATE ── */}
      <section style={{ padding: "0 0 0 0", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 500 }}>
        {/* Image side */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src="/__mockup/images/collection-std.jpg"
            alt="Save the Date"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, transparent 60%, #FAF8F5 100%)",
          }} />
        </div>
        {/* Text side */}
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "80px 72px", background: IVORY,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ width: 28, height: 1, background: GOLD }} />
            <span style={{ fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase", color: GOLD }}>Univers à part</span>
          </div>
          <h2 style={{ fontFamily: serif, fontSize: 44, fontWeight: 400, margin: "0 0 20px", lineHeight: 1.1 }}>
            Save the Date<br />
            <em style={{ fontStyle: "italic", color: GOLD }}>L'annonce qui précède</em>
          </h2>
          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.75, fontWeight: 300, marginBottom: 36, maxWidth: 380 }}>
            Avant même la grande expérience, offrez à vos convives un premier
            frisson. Le Save the Date Eventia pose le ton, installe l'attente,
            crée le désir.
          </p>
          <div style={{ marginBottom: 32 }}>
            <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 36, color: GOLD }}>29€</span>
            <span style={{ fontSize: 12, color: MUTED, marginLeft: 10, letterSpacing: 1 }}>par envoi</span>
          </div>
          <button style={{
            background: "transparent", border: `1px solid ${GOLD}`, color: GOLD,
            padding: "14px 36px", fontSize: 11, letterSpacing: 2.5,
            textTransform: "uppercase", cursor: "pointer", fontFamily: sans,
            width: "fit-content",
          }}>Découvrir Save the Date</button>
        </div>
      </section>

      {/* ── LA SIGNATURE DU MOIS ── */}
      <section style={{
        background: DARK, padding: "100px 64px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background texture */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.06,
          backgroundImage: `url('/__mockup/images/hero-bg.jpg')`,
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left: label + text */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <div style={{ width: 28, height: 1, background: GOLD }} />
              <span style={{ fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase", color: GOLD }}>Édition limitée</span>
            </div>
            <h2 style={{ fontFamily: serif, fontSize: 48, fontWeight: 400, color: "#F9F6F1", margin: "0 0 20px", lineHeight: 1.1 }}>
              La Signature<br />
              <em style={{ fontStyle: "italic", color: GOLD }}>du Mois</em>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(249,246,241,0.6)", lineHeight: 1.75, fontWeight: 300, marginBottom: 36, maxWidth: 400 }}>
              Chaque mois, un modèle unique conçu en édition ultra-limitée.
              Disponible à seulement 12 exemplaires — pour ceux qui refusent
              de partager leur moment avec quiconque.
            </p>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 32 }}>
              <div style={{
                background: GOLD, color: DARK,
                fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase",
                padding: "6px 16px",
              }}>Juillet 2026 · 3 exemplaires restants</div>
            </div>
            <button style={{
              background: GOLD, border: "none", color: DARK,
              padding: "15px 36px", fontSize: 11, letterSpacing: 2.5,
              textTransform: "uppercase", cursor: "pointer", fontFamily: sans,
            }}>Réserver ma place</button>
          </div>
          {/* Right: preview card */}
          <div style={{
            border: `1px solid rgba(201,169,110,0.2)`,
            padding: 40, position: "relative",
          }}>
            {/* Corner ornaments */}
            {["top:0,left:0", "top:0,right:0", "bottom:0,left:0", "bottom:0,right:0"].map((pos, i) => {
              const p = Object.fromEntries(pos.split(",").map(s => s.split(":")));
              const corners = [
                { borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` },
                { borderTop: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` },
                { borderBottom: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` },
                { borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` },
              ];
              return <div key={i} style={{ position: "absolute", width: 20, height: 20, ...corners[i], ...p as any }} />;
            })}
            <img
              src="/__mockup/images/collection-ecrins.jpg"
              alt="Signature du mois"
              style={{ width: "100%", height: 280, objectFit: "cover", display: "block", marginBottom: 24 }}
            />
            <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 22, color: "#F9F6F1", marginBottom: 6 }}>
              « L'Écrin d'Été »
            </div>
            <div style={{ fontSize: 11, color: "rgba(249,246,241,0.45)", letterSpacing: 2, textTransform: "uppercase" }}>
              Juillet 2026 · Édition limitée
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background: "#F2EDE6", padding: "110px 64px", position: "relative", overflow: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{ fontSize: 10, letterSpacing: 4.5, textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Comment ça fonctionne</p>
          <h2 style={{ fontFamily: serif, fontSize: 48, fontWeight: 400, margin: 0 }}>
            Simple. Raffiné. <em style={{ fontStyle: "italic" }}>Inoubliable.</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, maxWidth: 1000, margin: "0 auto" }}>
          {[
            { n: 1, title: "Choisissez votre univers", desc: "Parcourez nos quatre collections et choisissez celui qui vous ressemble. Chaque univers existe en plusieurs variations." },
            { n: 2, title: "Nous composons votre récit", desc: "Vous nous confiez vos textes, vos dates, vos images. Notre atelier intègre chaque détail en 48 heures." },
            { n: 3, title: "Vos convives s'imprègnent", desc: "Un lien unique. Vos convives vivent le moment. Les réponses arrivent directement — vous voyez tout en temps réel." },
          ].map(step => (
            <div key={step.n} style={{ position: "relative", textAlign: "center", paddingTop: 40 }}>
              {/* Roman numeral background */}
              <div style={{
                position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)",
                fontFamily: serif, fontSize: 140, fontWeight: 700,
                color: "rgba(42,31,24,0.06)",
                filter: "blur(2px)",
                lineHeight: 1, zIndex: 0,
                userSelect: "none", pointerEvents: "none",
                letterSpacing: -4,
              }}>{ROMAN[step.n]}</div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  width: 36, height: 36,
                  border: `1px solid rgba(201,169,110,0.4)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px",
                  fontFamily: serif, fontStyle: "italic", fontSize: 16, color: GOLD,
                }}>
                  {ROMAN[step.n]}
                </div>
                <h3 style={{ fontFamily: serif, fontSize: 22, fontWeight: 500, marginBottom: 14 }}>{step.title}</h3>
                <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.75, fontWeight: 300 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: "110px 64px", background: IVORY }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 10, letterSpacing: 4.5, textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Tarifs</p>
          <h2 style={{ fontFamily: serif, fontSize: 48, fontWeight: 400, margin: 0 }}>
            L'excellence, <em style={{ fontStyle: "italic" }}>à votre mesure</em>
          </h2>
          <p style={{ color: MUTED, fontSize: 14, marginTop: 14, fontWeight: 300 }}>
            Cliquez sur une formule pour la découvrir
          </p>
        </div>
        <PricingAccordion />
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: "#F5F0E8", padding: "80px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 10, letterSpacing: 4.5, textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>Ils ont vécu l'expérience</p>
          <h2 style={{ fontFamily: serif, fontSize: 40, fontWeight: 400, margin: 0 }}>
            Ce qu'ils en disent
          </h2>
        </div>
        {/* Compact strip */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, maxWidth: 1100, margin: "0 auto" }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} style={{
              padding: "36px 36px",
              background: i === 1 ? DARK : "#EDE8E1",
              borderLeft: i > 0 ? "none" : undefined,
            }}>
              <div style={{
                fontFamily: serif, fontStyle: "italic",
                fontSize: 20, color: i === 1 ? "#F9F6F1" : "#1A1514",
                lineHeight: 1.6, marginBottom: 20,
              }}>
                « {t.text} »
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 20, height: 1, background: GOLD }} />
                <div>
                  <div style={{ fontSize: 13, color: GOLD, letterSpacing: 0.5 }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: i === 1 ? "rgba(249,246,241,0.4)" : MUTED, marginTop: 2, letterSpacing: 0.5 }}>{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ padding: "130px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('/__mockup/images/hero-bg.jpg')`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.08, animation: "kenBurns 20s ease-in-out infinite",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div style={{ width: 40, height: 1, background: GOLD }} />
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: GOLD }}>Votre moment commence ici</span>
            <div style={{ width: 40, height: 1, background: GOLD }} />
          </div>
          <h2 style={{ fontFamily: serif, fontSize: 60, fontWeight: 400, margin: "0 0 20px", lineHeight: 1.05 }}>
            Votre histoire mérite<br />
            <em style={{ fontStyle: "italic", color: GOLD }}>d'être vécue, pas lue</em>
          </h2>
          <p style={{ color: MUTED, fontSize: 16, marginBottom: 52, fontWeight: 300, maxWidth: 480, margin: "0 auto 52px" }}>
            Sans engagement jusqu'au paiement · Livraison en 7 jours · Satisfaction totale
          </p>
          <button style={{
            background: GOLD, color: "#FAF8F5", border: "none",
            padding: "20px 60px", fontSize: 11, letterSpacing: 3,
            textTransform: "uppercase", cursor: "pointer", fontFamily: sans,
          }}>
            Composer votre expérience
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#140F0C", color: "rgba(249,246,241,0.5)", padding: "64px 64px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 24, color: GOLD, marginBottom: 16 }}>
              Eventia Signature
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 260, color: "rgba(249,246,241,0.45)" }}>
              Maison d'art immersif. Des expériences cinématiques conçues pour les couples
              qui refusent l'ordinaire.
            </p>
          </div>
          {[
            { title: "Collections", links: ["Les Voiles", "Les Seuils", "Les Écrins", "L'Union", "Save the Date"] },
            { title: "La maison", links: ["Notre approche", "L'atelier", "Presse", "Journal"] },
            { title: "Contact", links: ["Nous écrire", "Instagram", "Pinterest", "FAQ"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase", color: GOLD, marginBottom: 18 }}>{col.title}</div>
              {col.links.map(l => (
                <div key={l} style={{ fontSize: 13.5, marginBottom: 9, cursor: "pointer" }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(249,246,241,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", fontSize: 12 }}>
          <span>© 2026 Eventia Signature · eventiasignature.com</span>
          <span>Mentions légales · Confidentialité · CGV</span>
        </div>
      </footer>
    </div>
  );
}
