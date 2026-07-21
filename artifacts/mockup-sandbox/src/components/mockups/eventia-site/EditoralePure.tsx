export function EditoralePure() {
  const collections = [
    { name: "Les Voiles", tagline: "Aérien · Délicat · Textile", img: "/__mockup/images/collection-voiles.jpg", from: "179€" },
    { name: "Les Seuils", tagline: "Passages · Portes · Transitions", img: "/__mockup/images/collection-seuils.jpg", from: "179€" },
    { name: "Les Écrins", tagline: "Joaillerie · Précieux · Écrin", img: "/__mockup/images/collection-ecrins.jpg", from: "179€" },
    { name: "L'Union", tagline: "Chaleur · Famille · Promesse", img: "/__mockup/images/collection-union.jpg", from: "179€" },
    { name: "Save the Date", tagline: "Impact · Première annonce", img: "/__mockup/images/collection-std.jpg", from: "29€" },
  ];

  const testimonials = [
    { name: "Amélie & Thomas", text: "Nos invités nous ont encore parlé de l'invitation six mois après. L'effet wow était total.", location: "Paris · Juin 2025" },
    { name: "Chiara & Maxime", text: "On ne s'attendait pas à quelque chose d'aussi cinématique. C'est bien au-delà de ce qu'on espérait.", location: "Lyon · Septembre 2025" },
    { name: "Inès & Karim", text: "Eventia a compris exactement notre histoire. L'invitation ressemblait à un court-métrage.", location: "Bordeaux · Avril 2026" },
  ];

  return (
    <div
      className="min-h-screen w-full"
      style={{ fontFamily: "'Jost', sans-serif", background: "#FAF8F5", color: "#1A1514" }}
    >
      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(250,248,245,0.96)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(201,169,110,0.15)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: 64,
      }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 22, color: "#C9A96E", letterSpacing: 0.5 }}>
          Eventia Signature
        </span>
        <div style={{ display: "flex", gap: 40, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#6B5C54" }}>
          {["Collections", "Tarifs", "Notre approche", "Contact"].map(l => (
            <span key={l} style={{ cursor: "pointer" }}>{l}</span>
          ))}
        </div>
        <button style={{
          border: "1px solid #C9A96E", color: "#C9A96E", background: "transparent",
          padding: "10px 24px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
        }}>
          Voir les collections
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 64, minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", overflow: "hidden" }}>
        {/* Background texture layer */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('/__mockup/images/hero-bg.jpg')`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.12, zIndex: 0,
        }} />

        {/* Left: Text */}
        <div style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "80px 64px 80px 64px",
        }}>
          {/* Promo badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid rgba(201,169,110,0.4)", borderRadius: 40,
            padding: "6px 16px", marginBottom: 32, width: "fit-content",
            fontSize: 12, color: "#8A7060", letterSpacing: 1,
          }}>
            <span style={{ color: "#C9A96E" }}>★ 4.9</span>
            &nbsp;· Choisi par +500 couples en France
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(52px, 5.5vw, 80px)",
            fontWeight: 400, lineHeight: 1.05,
            margin: "0 0 28px",
            letterSpacing: "-0.5px",
          }}>
            L'invitation de mariage<br />
            <em style={{ fontStyle: "italic", color: "#C9A96E" }}>qui fait battre les cœurs</em>
          </h1>

          <p style={{ fontSize: 16, color: "#6B5C54", lineHeight: 1.7, maxWidth: 420, marginBottom: 40, fontWeight: 300 }}>
            Des faire-parts digitaux conçus comme des œuvres cinématiques.
            Animations sur-mesure, RSVP intégré, expérience inoubliable pour vos invités.
          </p>

          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <button style={{
              background: "#C9A96E", color: "#FBF7F0", border: "none",
              padding: "16px 36px", fontSize: 12, letterSpacing: 2.5,
              textTransform: "uppercase", cursor: "pointer", fontFamily: "'Jost', sans-serif",
            }}>
              Créer mon invitation
            </button>
            <span style={{ fontSize: 13, color: "#A0907A", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 4 }}>
              Voir les collections &rarr;
            </span>
          </div>

          <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(201,169,110,0.2)", display: "flex", gap: 32, alignItems: "center" }}>
            <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#A0907A" }}>À paraître dans</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
              fontSize: 18, color: "#6B5C54", letterSpacing: 1,
            }}>Vogue Wedding Guide</span>
          </div>
        </div>

        {/* Right: Phone mockup */}
        <div style={{
          position: "relative", zIndex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "80px 48px",
        }}>
          {/* Decorative blob behind phone */}
          <div style={{
            position: "absolute", width: 480, height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)",
          }} />
          <img
            src="/__mockup/images/phone-mockup.jpg"
            alt="Invitation digitale sur téléphone"
            style={{
              height: 540, objectFit: "cover", objectPosition: "center",
              borderRadius: 32, boxShadow: "0 40px 80px rgba(42,31,24,0.25)",
              position: "relative", zIndex: 1,
            }}
          />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{
        background: "#2A1F18", color: "#F9F6F1",
        display: "flex", justifyContent: "center", gap: 80,
        padding: "32px 64px",
      }}>
        {[
          { val: "+500", label: "Couples accompagnés" },
          { val: "5", label: "Collections exclusives" },
          { val: "4.9★", label: "Note moyenne" },
          { val: "100%", label: "Livraison en 7 jours" },
        ].map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 32, color: "#C9A96E" }}>{s.val}</div>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(249,246,241,0.6)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── COLLECTIONS ── */}
      <section style={{ padding: "100px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#C9A96E", marginBottom: 16 }}>Nos collections</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 400, margin: 0 }}>
            Cinq univers,<em style={{ fontStyle: "italic" }}> une seule promesse</em>
          </h2>
          <p style={{ color: "#6B5C54", fontSize: 16, marginTop: 16, fontWeight: 300 }}>Chaque collection est un monde visuel complet, avec ses ambiances, ses mouvements, son histoire.</p>
        </div>

        {/* First row: 3 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 24 }}>
          {collections.slice(0, 3).map(c => (
            <div key={c.name} style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}>
              <img src={c.img} alt={c.name} style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(42,31,24,0.75) 0%, transparent 50%)",
              }} />
              <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "#F9F6F1", fontWeight: 400 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "rgba(249,246,241,0.7)", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{c.tagline}</div>
                <div style={{ fontSize: 13, color: "#C9A96E", marginTop: 8 }}>à partir de {c.from}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Second row: 2 wider */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {collections.slice(3).map(c => (
            <div key={c.name} style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}>
              <img src={c.img} alt={c.name} style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(42,31,24,0.75) 0%, transparent 50%)",
              }} />
              <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "#F9F6F1" }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "rgba(249,246,241,0.7)", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{c.tagline}</div>
                <div style={{ fontSize: 13, color: "#C9A96E", marginTop: 8 }}>à partir de {c.from}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background: "#F2EDE6", padding: "100px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#C9A96E", marginBottom: 16 }}>Comment ça marche</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 400, margin: 0 }}>
            Simple. Rapide. <em style={{ fontStyle: "italic" }}>Exceptionnel.</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, maxWidth: 960, margin: "0 auto" }}>
          {[
            { num: "01", title: "Choisissez votre collection", desc: "Parcourez nos 5 univers visuels et choisissez celui qui vous ressemble. Chaque collection existe en plusieurs variantes." },
            { num: "02", title: "Personnalisez votre histoire", desc: "Remplissez votre formulaire en ligne : textes, dates, lieux, photos. Notre équipe intègre tout sous 48h." },
            { num: "03", title: "Partagez avec vos invités", desc: "Recevez votre lien unique. Vos invités répondent directement depuis l'invitation. Vous voyez tout en temps réel." },
          ].map(step => (
            <div key={step.num} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 64, color: "rgba(201,169,110,0.35)", lineHeight: 1, marginBottom: 20 }}>{step.num}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500, marginBottom: 12 }}>{step.title}</h3>
              <p style={{ fontSize: 15, color: "#6B5C54", lineHeight: 1.7, fontWeight: 300 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: "100px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#C9A96E", marginBottom: 16 }}>Tarifs</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 400, margin: 0 }}>
            L'excellence, à votre mesure
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, maxWidth: 1000, margin: "0 auto" }}>
          {[
            { name: "L'Essentielle", price: "179€", tag: null, features: ["9 blocs de contenu", "RSVP intégré", "Compte à rebours", "Lien unique partageable", "Livraison en 7 jours"] },
            { name: "La Signature", price: "269€", tag: "Le plus choisi", features: ["Tout L'Essentielle", "Notre histoire", "Dress code animé", "Empreintes personnalisées", "Galerie photos", "Plan interactif"] },
            { name: "L'Exception", price: "549€", tag: null, features: ["Tout La Signature", "Hébergements", "Activités", "Liste de cadeaux", "Album photos live", "Assistance prioritaire"] },
          ].map((tier, i) => (
            <div key={tier.name} style={{
              padding: "48px 36px",
              background: i === 1 ? "#2A1F18" : "#FAF8F5",
              color: i === 1 ? "#F9F6F1" : "#1A1514",
              position: "relative",
              border: i !== 1 ? "1px solid rgba(201,169,110,0.2)" : "none",
            }}>
              {tier.tag && (
                <div style={{
                  position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)",
                  background: "#C9A96E", color: "#2A1F18",
                  fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
                  padding: "5px 16px",
                }}>
                  {tier.tag}
                </div>
              )}
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, marginBottom: 8 }}>{tier.name}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 48, color: "#C9A96E", marginBottom: 32 }}>{tier.price}</div>
              <div style={{ borderTop: `1px solid ${i === 1 ? "rgba(249,246,241,0.15)" : "rgba(201,169,110,0.2)"}`, paddingTop: 24 }}>
                {tier.features.map(f => (
                  <div key={f} style={{ fontSize: 14, marginBottom: 12, display: "flex", gap: 10, alignItems: "flex-start", color: i === 1 ? "rgba(249,246,241,0.85)" : "#6B5C54" }}>
                    <span style={{ color: "#C9A96E", flexShrink: 0 }}>◆</span> {f}
                  </div>
                ))}
              </div>
              <button style={{
                marginTop: 32, width: "100%", padding: "14px",
                background: i === 1 ? "#C9A96E" : "transparent",
                border: i === 1 ? "none" : "1px solid #C9A96E",
                color: i === 1 ? "#2A1F18" : "#C9A96E",
                fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase",
                cursor: "pointer", fontFamily: "'Jost', sans-serif",
              }}>
                Choisir cette offre
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: "#2A1F18", padding: "100px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#C9A96E", marginBottom: 16 }}>Témoignages</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 400, color: "#F9F6F1", margin: 0 }}>
            Ils nous ont fait confiance
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32, maxWidth: 1100, margin: "0 auto" }}>
          {testimonials.map(t => (
            <div key={t.name} style={{ padding: "36px", border: "1px solid rgba(201,169,110,0.2)" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 56, color: "rgba(201,169,110,0.3)", lineHeight: 0.8, marginBottom: 16 }}>«</div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 18, color: "#F9F6F1", lineHeight: 1.6, marginBottom: 24 }}>{t.text}</p>
              <div style={{ fontSize: 13, color: "#C9A96E", letterSpacing: 1 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: "rgba(249,246,241,0.4)", marginTop: 4, letterSpacing: 1 }}>{t.location}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ padding: "120px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('/__mockup/images/hero-bg.jpg')`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.07,
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#C9A96E", marginBottom: 24 }}>Prête à commencer ?</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, fontWeight: 400, margin: "0 0 20px" }}>
            Votre histoire mérite<br /><em style={{ fontStyle: "italic", color: "#C9A96E" }}>d'être racontée avec éclat</em>
          </h2>
          <p style={{ color: "#6B5C54", fontSize: 16, marginBottom: 48, fontWeight: 300 }}>Sans engagement jusqu'au paiement · Livraison en 7 jours · Satisfaction garantie</p>
          <button style={{
            background: "#C9A96E", color: "#FBF7F0", border: "none",
            padding: "20px 56px", fontSize: 12, letterSpacing: 3,
            textTransform: "uppercase", cursor: "pointer", fontFamily: "'Jost', sans-serif",
          }}>
            Créer mon invitation
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#1A1110", color: "rgba(249,246,241,0.6)", padding: "64px 64px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 24, color: "#C9A96E", marginBottom: 16 }}>Eventia Signature</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>Faire-parts digitaux de mariage conçus avec soin. Une expérience cinématique pour le plus beau jour de votre vie.</p>
          </div>
          {[
            { title: "Collections", links: ["Les Voiles", "Les Seuils", "Les Écrins", "L'Union", "Save the Date"] },
            { title: "À propos", links: ["Notre approche", "L'équipe", "Presse", "Blog"] },
            { title: "Contact", links: ["Nous écrire", "Instagram", "Pinterest", "FAQ"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#C9A96E", marginBottom: 16 }}>{col.title}</div>
              {col.links.map(l => <div key={l} style={{ fontSize: 14, marginBottom: 8, cursor: "pointer" }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(249,246,241,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", fontSize: 12 }}>
          <span>© 2026 Eventia Signature · eventiasignature.com</span>
          <span>Mentions légales · Confidentialité · CGV</span>
        </div>
      </footer>
    </div>
  );
}
