export function MaisonCinematique() {
  const collections = [
    { name: "Les Voiles", tagline: "Aérien · Délicat", img: "/__mockup/images/collection-voiles.jpg" },
    { name: "Les Seuils", tagline: "Passages · Majesté", img: "/__mockup/images/collection-seuils.jpg" },
    { name: "Les Écrins", tagline: "Joaillerie · Précieux", img: "/__mockup/images/collection-ecrins.jpg" },
    { name: "L'Union", tagline: "Chaleur · Famille", img: "/__mockup/images/collection-union.jpg" },
    { name: "Save the Date", tagline: "Première annonce", img: "/__mockup/images/collection-std.jpg" },
  ];

  return (
    <div className="min-h-screen w-full" style={{ fontFamily: "'Jost', sans-serif", background: "#F5F0E8", color: "#2A1F18" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 56px", height: 72,
        background: "rgba(245,240,232,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(201,169,110,0.2)",
      }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 24, color: "#2A1F18" }}>
          Eventia <span style={{ color: "#C9A96E" }}>Signature</span>
        </span>
        <div style={{ display: "flex", gap: 36, fontSize: 12, letterSpacing: 2.5, textTransform: "uppercase", color: "#7A6858" }}>
          {["Collections", "Tarifs", "Notre approche", "Contact"].map(l => (
            <span key={l} style={{ cursor: "pointer" }}>{l}</span>
          ))}
        </div>
        <button style={{
          background: "#C9A96E", color: "#FBF7F0", border: "none",
          padding: "12px 28px", fontSize: 11, letterSpacing: 2.5,
          textTransform: "uppercase", cursor: "pointer", fontFamily: "'Jost', sans-serif",
        }}>
          Voir les collections
        </button>
      </nav>

      {/* ── HERO FULL BLEED ── */}
      <section style={{
        minHeight: "100vh", paddingTop: 72,
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background photo */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('/__mockup/images/hero-bg.jpg')`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.35) saturate(0.8)",
          zIndex: 0,
        }} />
        {/* Gold overlay gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(42,31,24,0.7) 0%, transparent 60%, rgba(201,169,110,0.1) 100%)",
          zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1, width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          {/* Left content */}
          <div style={{ padding: "80px 64px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#C9A96E", marginBottom: 32 }}>
              Faire-parts digitaux · Mariage de luxe
            </p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(56px, 6vw, 88px)",
              fontWeight: 300,
              color: "#F9F6F1",
              lineHeight: 1.0,
              margin: "0 0 16px",
              letterSpacing: "-1px",
            }}>
              Vos invitations
            </h1>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(56px, 6vw, 88px)",
              fontWeight: 600,
              color: "#F9F6F1",
              lineHeight: 1.0,
              margin: "0 0 40px",
              letterSpacing: "-1px",
            }}>
              SIGNATURE
            </h1>
            <p style={{ fontSize: 17, color: "rgba(249,246,241,0.75)", lineHeight: 1.75, maxWidth: 400, marginBottom: 48, fontWeight: 300 }}>
              Des expériences cinématiques sur-mesure. Vos invités ne reçoivent pas un lien — ils vivent un moment.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <button style={{
                background: "#C9A96E", color: "#2A1F18", border: "none",
                padding: "18px 44px", fontSize: 12, letterSpacing: 3,
                textTransform: "uppercase", cursor: "pointer", fontFamily: "'Jost', sans-serif",
                fontWeight: 500,
              }}>
                Créer mon invitation
              </button>
              <button style={{
                background: "transparent", color: "#F9F6F1",
                border: "1px solid rgba(249,246,241,0.4)",
                padding: "18px 36px", fontSize: 12, letterSpacing: 2,
                textTransform: "uppercase", cursor: "pointer", fontFamily: "'Jost', sans-serif",
              }}>
                Voir les collections
              </button>
            </div>
            <div style={{ marginTop: 48, display: "flex", gap: 40 }}>
              {[{ v: "+500", l: "Couples" }, { v: "4.9★", l: "Note" }, { v: "7j", l: "Livraison" }].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 28, color: "#C9A96E" }}>{s.v}</div>
                  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(249,246,241,0.5)", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: phone */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 64px" }}>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute", inset: -40,
                border: "1px solid rgba(201,169,110,0.25)",
                borderRadius: 4,
              }} />
              <img
                src="/__mockup/images/phone-mockup.jpg"
                alt="Invitation"
                style={{
                  height: 520, objectFit: "cover",
                  borderRadius: 28,
                  boxShadow: "0 60px 120px rgba(0,0,0,0.5), 0 20px 40px rgba(201,169,110,0.2)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS — DARK SECTION ── */}
      <section style={{ background: "#2A1F18", padding: "100px 64px" }}>
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#C9A96E", marginBottom: 20 }}>Collections</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 400, color: "#F9F6F1", margin: 0, lineHeight: 1.1 }}>
              Cinq univers visuels,<br /><em style={{ fontStyle: "italic", color: "#C9A96E" }}>chacun une œuvre</em>
            </h2>
            <span style={{ fontSize: 13, color: "rgba(249,246,241,0.5)", cursor: "pointer", letterSpacing: 1 }}>
              Voir toutes les collections →
            </span>
          </div>
        </div>
        {/* Horizontal scroll cards */}
        <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
          {collections.map((c, i) => (
            <div key={c.name} style={{
              flexShrink: 0, width: 280, position: "relative", overflow: "hidden", cursor: "pointer",
              border: "1px solid rgba(201,169,110,0.2)",
            }}>
              <img src={c.img} alt={c.name} style={{ width: 280, height: 380, objectFit: "cover", display: "block", transition: "transform 0.5s" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(42,31,24,0.85) 0%, rgba(42,31,24,0.2) 50%, transparent 100%)",
              }} />
              <div style={{ position: "absolute", bottom: 24, left: 20, right: 20 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#F9F6F1", marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "rgba(249,246,241,0.6)", letterSpacing: 2, textTransform: "uppercase" }}>{c.tagline}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS — LIGHT SECTION ── */}
      <section style={{ background: "#F5F0E8", padding: "100px 64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <p style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#C9A96E", marginBottom: 20 }}>L'expérience Eventia</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 400, margin: 0 }}>
              De la première idée<br />à l'invitation parfaite
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
            {[
              { n: "I", title: "Choisissez", desc: "Parcourez nos collections et identifiez l'univers qui vous ressemble. Chaque ambiance, chaque mouvement a été pensé pour émouvoir." },
              { n: "II", title: "Personnalisez", desc: "Vous remplissez votre formulaire. Notre équipe intègre vos textes, vos photos, votre histoire. Livraison sous 7 jours." },
              { n: "III", title: "Partagez", desc: "Un lien unique, pour toujours. Vos invités répondent directement. Vous suivez les RSVP en temps réel depuis votre espace." },
            ].map((s, i) => (
              <div key={s.n} style={{
                padding: "48px 40px",
                borderRight: i < 2 ? "1px solid rgba(201,169,110,0.25)" : "none",
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                  fontSize: 80, color: "rgba(201,169,110,0.2)", lineHeight: 1, marginBottom: 24,
                }}>{s.n}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500, marginBottom: 16 }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: "#6B5C54", lineHeight: 1.75, fontWeight: 300 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING — DARK ── */}
      <section style={{ background: "#2A1F18", padding: "100px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#C9A96E", marginBottom: 20 }}>Tarifs</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 400, color: "#F9F6F1", margin: 0 }}>
            L'exception, à votre portée
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, maxWidth: 1000, margin: "0 auto", background: "rgba(201,169,110,0.15)" }}>
          {[
            { name: "L'Essentielle", price: "179€", features: ["9 blocs inclus", "RSVP intégré", "Compte à rebours", "Plan & programme", "Livraison 7 jours"], highlight: false },
            { name: "La Signature", price: "269€", features: ["Tout L'Essentielle", "Notre histoire", "Dress code animé", "Galerie photos", "Empreintes personnalisées", "Plan interactif"], highlight: true },
            { name: "L'Exception", price: "549€", features: ["Tout La Signature", "Hébergements", "Activités & loisirs", "Liste de cadeaux", "Album live invités", "Accompagnement dédié"], highlight: false },
          ].map((t, i) => (
            <div key={t.name} style={{
              padding: "56px 36px",
              background: t.highlight ? "#C9A96E" : "#2A1F18",
              position: "relative",
            }}>
              {t.highlight && (
                <div style={{
                  position: "absolute", top: 16, right: 16,
                  background: "#2A1F18", color: "#C9A96E",
                  fontSize: 10, letterSpacing: 2, padding: "4px 10px",
                  textTransform: "uppercase",
                }}>Le plus choisi</div>
              )}
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, color: t.highlight ? "#2A1F18" : "#F9F6F1", marginBottom: 8 }}>{t.name}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 52, color: t.highlight ? "#2A1F18" : "#C9A96E", marginBottom: 32 }}>{t.price}</div>
              {t.features.map(f => (
                <div key={f} style={{ display: "flex", gap: 10, fontSize: 14, marginBottom: 10, color: t.highlight ? "rgba(42,31,24,0.85)" : "rgba(249,246,241,0.75)" }}>
                  <span style={{ color: t.highlight ? "#2A1F18" : "#C9A96E" }}>◆</span> {f}
                </div>
              ))}
              <button style={{
                marginTop: 32, width: "100%", padding: "14px",
                background: t.highlight ? "#2A1F18" : "transparent",
                border: t.highlight ? "none" : "1px solid rgba(201,169,110,0.4)",
                color: t.highlight ? "#C9A96E" : "#C9A96E",
                fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase",
                cursor: "pointer", fontFamily: "'Jost', sans-serif",
              }}>
                Choisir
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "100px 64px", background: "#F5F0E8" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#C9A96E", marginBottom: 20 }}>Témoignages</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 400, margin: 0 }}>
            Ce qu'ils nous ont confié
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
          {[
            { n: "Sophie & Raphaël", t: "Nos invités nous ont encore parlé de l'invitation six mois après le mariage. L'effet était total.", l: "Paris · Juin 2025" },
            { n: "Chiara & Maxime", t: "On ne s'attendait pas à quelque chose d'aussi cinématique. C'est bien au-delà de ce qu'on imaginait.", l: "Lyon · Septembre 2025" },
            { n: "Inès & Karim", t: "Eventia a capturé notre histoire. L'invitation ressemblait à un vrai court-métrage de notre vie.", l: "Bordeaux · Avril 2026" },
          ].map(t => (
            <div key={t.n} style={{ background: "#FAF8F5", padding: "36px", border: "1px solid rgba(201,169,110,0.2)" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 48, color: "rgba(201,169,110,0.3)", lineHeight: 0.8, marginBottom: 20 }}>«</div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 18, color: "#2A1F18", lineHeight: 1.65, marginBottom: 24 }}>{t.t}</p>
              <div style={{ fontSize: 13, color: "#C9A96E", letterSpacing: 1 }}>{t.n}</div>
              <div style={{ fontSize: 11, color: "#A0907A", marginTop: 4 }}>{t.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#1A1110", color: "rgba(249,246,241,0.55)", padding: "64px 64px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 26, color: "#C9A96E", marginBottom: 16 }}>Eventia Signature</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>Faire-parts digitaux de mariage. Une expérience cinématique, inoubliable, pour le plus beau jour de votre vie.</p>
          </div>
          {[
            { t: "Collections", ls: ["Les Voiles", "Les Seuils", "Les Écrins", "L'Union", "Save the Date"] },
            { t: "Eventia", ls: ["Notre approche", "L'équipe", "Presse", "Blog"] },
            { t: "Contact", ls: ["Nous écrire", "Instagram", "Pinterest", "FAQ"] },
          ].map(col => (
            <div key={col.t}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#C9A96E", marginBottom: 16 }}>{col.t}</div>
              {col.ls.map(l => <div key={l} style={{ fontSize: 14, marginBottom: 8, cursor: "pointer" }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(249,246,241,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", fontSize: 12 }}>
          <span>© 2026 Eventia Signature</span>
          <span>Mentions légales · CGV · Confidentialité</span>
        </div>
      </footer>
    </div>
  );
}
