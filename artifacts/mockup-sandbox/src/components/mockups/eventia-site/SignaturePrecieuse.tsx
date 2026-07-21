export function SignaturePrecieuse() {
  const collections = [
    { name: "Les Voiles", tagline: "Aérien · Textile · Lumière", img: "/__mockup/images/collection-voiles.jpg", from: "179€" },
    { name: "Les Seuils", tagline: "Passages · Portes · Transitions", img: "/__mockup/images/collection-seuils.jpg", from: "179€" },
    { name: "Les Écrins", tagline: "Joaillerie · Velours · Précieux", img: "/__mockup/images/collection-ecrins.jpg", from: "179€" },
    { name: "L'Union", tagline: "Chaleur · Famille · Amour", img: "/__mockup/images/collection-union.jpg", from: "179€" },
    { name: "Save the Date", tagline: "Première annonce · Cachet doré", img: "/__mockup/images/collection-std.jpg", from: "29€" },
  ];

  const ornament = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", margin: "32px 0" }}>
      <div style={{ height: 1, width: 80, background: "linear-gradient(to right, transparent, #C9A96E)" }} />
      <span style={{ color: "#C9A96E", fontSize: 10 }}>◆</span>
      <div style={{ height: 1, width: 80, background: "linear-gradient(to left, transparent, #C9A96E)" }} />
    </div>
  );

  return (
    <div className="min-h-screen w-full" style={{ fontFamily: "'Jost', sans-serif", background: "#FBF7F0", color: "#2A1F18" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(251,247,240,0.96)", backdropFilter: "blur(12px)",
        padding: "0 56px", height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(201,169,110,0.2)",
      }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 22, color: "#2A1F18", lineHeight: 1 }}>
            Eventia <span style={{ color: "#C9A96E" }}>Signature</span>
          </div>
          <div style={{ height: 1, background: "linear-gradient(to right, #C9A96E, transparent)", marginTop: 3 }} />
        </div>
        <div style={{ display: "flex", gap: 36, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#8A7060" }}>
          {["Collections", "Tarifs", "Notre approche", "Contact"].map(l => (
            <span key={l} style={{ cursor: "pointer" }}>{l}</span>
          ))}
        </div>
        <button style={{
          border: "1px solid #C9A96E", color: "#C9A96E", background: "transparent",
          padding: "10px 24px", fontSize: 11, letterSpacing: 2.5,
          textTransform: "uppercase", cursor: "pointer", fontFamily: "'Jost', sans-serif",
        }}>
          Voir les collections
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 68, minHeight: "100vh", position: "relative", overflow: "hidden" }}>
        {/* Subtle background */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('/__mockup/images/hero-bg.jpg')`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.08, zIndex: 0,
        }} />

        <div style={{
          position: "relative", zIndex: 1,
          display: "grid", gridTemplateColumns: "1fr 1fr",
          minHeight: "calc(100vh - 68px)",
        }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 64px" }}>
            {/* Ornamental frame around headline */}
            <div style={{
              border: "1px solid rgba(201,169,110,0.4)",
              padding: "48px 40px",
              position: "relative",
              marginBottom: 40,
            }}>
              {/* Corner ornaments */}
              {["top:0;left:0", "top:0;right:0", "bottom:0;left:0", "bottom:0;right:0"].map((pos, i) => (
                <div key={i} style={{
                  position: "absolute",
                  ...(Object.fromEntries(pos.split(";").map(p => p.split(":")))),
                  width: 12, height: 12,
                  border: `1px solid #C9A96E`,
                  transform: "translate(-50%, -50%) rotate(45deg)",
                  background: "#FBF7F0",
                }} />
              ))}
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#C9A96E", marginBottom: 24, margin: "0 0 24px" }}>
                L'Art de l'Invitation
              </p>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(42px, 4.5vw, 64px)",
                fontWeight: 400, lineHeight: 1.1, margin: "0 0 12px",
              }}>
                Votre mariage mérite
              </h1>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(42px, 4.5vw, 64px)",
                fontWeight: 300, lineHeight: 1.1, margin: "0 0 24px",
                color: "#C9A96E",
              }}>
                d'être inoubliable
              </h1>
              <p style={{ fontSize: 15, color: "#7A6858", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                Des faire-parts digitaux de mariage conçus comme des écrins précieux. Animations cinématiques, RSVP intégré, une expérience qui émeut.
              </p>
            </div>

            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <button style={{
                background: "#2A1F18", color: "#C9A96E", border: "none",
                padding: "16px 40px", fontSize: 11, letterSpacing: 3,
                textTransform: "uppercase", cursor: "pointer", fontFamily: "'Jost', sans-serif",
              }}>
                Créer mon invitation
              </button>
              <span style={{ fontSize: 13, color: "#A0907A", cursor: "pointer", letterSpacing: 1 }}>
                Voir les tarifs →
              </span>
            </div>

            <div style={{ display: "flex", gap: 32, marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(201,169,110,0.2)" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ color: "#C9A96E" }}>★★★★★</span>
                <span style={{ fontSize: 13, color: "#7A6858" }}>4.9 · +500 couples</span>
              </div>
              <div style={{ width: 1, background: "rgba(201,169,110,0.3)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#A0907A" }}>À paraître dans</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: "#6B5C54" }}>Vogue Wedding</span>
              </div>
            </div>
          </div>

          {/* Right: phone with frame */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 48px", position: "relative" }}>
            <div style={{
              position: "absolute", width: 320, height: 320,
              border: "1px solid rgba(201,169,110,0.2)",
              borderRadius: "50%",
            }} />
            <div style={{
              position: "absolute", width: 380, height: 380,
              border: "1px solid rgba(201,169,110,0.1)",
              borderRadius: "50%",
            }} />
            <img
              src="/__mockup/images/phone-mockup.jpg"
              alt="Invitation"
              style={{
                height: 500, objectFit: "cover",
                borderRadius: 28,
                boxShadow: "0 40px 80px rgba(42,31,24,0.2), 0 0 0 8px rgba(201,169,110,0.15)",
                position: "relative", zIndex: 1,
              }}
            />
          </div>
        </div>
      </section>

      {/* ── INTRO POETIQUE ── */}
      <section style={{ background: "#2A1F18", padding: "80px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ color: "#C9A96E", fontSize: 10, letterSpacing: 5, textTransform: "uppercase", marginBottom: 28 }}>Notre vision</div>
          <blockquote style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: 26, fontWeight: 300,
            color: "#F9F6F1", lineHeight: 1.6,
            margin: 0,
          }}>
            « Chaque mariage est une histoire unique. Nous créons l'écrin numérique qui la raconte avec l'élégance qu'elle mérite. »
          </blockquote>
          <div style={{ marginTop: 24, fontSize: 13, color: "#C9A96E", letterSpacing: 2 }}>— Ornelle · Fondatrice d'Eventia Signature</div>
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      <section style={{ padding: "100px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#C9A96E", marginBottom: 20 }}>Nos collections</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 400, margin: 0 }}>
            Cinq univers, <em style={{ fontStyle: "italic" }}>un seul standard</em>
          </h2>
          <p style={{ color: "#7A6858", fontSize: 15, marginTop: 16, fontWeight: 300, maxWidth: 500, margin: "16px auto 0" }}>
            Chaque collection est un monde visuel complet. Ambiances, couleurs, typographies, animations — tout est pensé comme un bijou.
          </p>
        </div>
        {ornament()}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 20 }}>
          {collections.slice(0, 3).map(c => (
            <div key={c.name} style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}>
              <img src={c.img} alt={c.name} style={{ width: "100%", height: 340, objectFit: "cover", display: "block" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(42,31,24,0.82) 0%, rgba(42,31,24,0.1) 50%, transparent 100%)",
              }} />
              <div style={{ position: "absolute", top: 20, right: 20 }}>
                <div style={{
                  background: "rgba(201,169,110,0.9)", color: "#2A1F18",
                  fontSize: 11, padding: "4px 12px", letterSpacing: 1,
                }}>à partir de {c.from}</div>
              </div>
              <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: "#F9F6F1", marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "rgba(249,246,241,0.65)", letterSpacing: 2, textTransform: "uppercase" }}>{c.tagline}</div>
                <div style={{ marginTop: 12, fontSize: 12, color: "#C9A96E", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>Découvrir →</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {collections.slice(3).map(c => (
            <div key={c.name} style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}>
              <img src={c.img} alt={c.name} style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(42,31,24,0.82) 0%, transparent 50%)" }} />
              <div style={{ position: "absolute", top: 20, right: 20 }}>
                <div style={{ background: "rgba(201,169,110,0.9)", color: "#2A1F18", fontSize: 11, padding: "4px 12px" }}>à partir de {c.from}</div>
              </div>
              <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: "#F9F6F1" }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "rgba(249,246,241,0.65)", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{c.tagline}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background: "#F2EDE5", padding: "100px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#C9A96E", marginBottom: 20 }}>Le parcours</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 400, margin: 0 }}>
            Simple comme une <em style={{ fontStyle: "italic" }}>déclaration d'amour</em>
          </h2>
        </div>
        {ornament()}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, maxWidth: 900, margin: "0 auto" }}>
          {[
            { n: "I", t: "Choisissez", d: "Explorez nos univers et trouvez celui qui raconte votre histoire. Chaque collection existe en plusieurs variantes exclusives." },
            { n: "II", t: "Personnalisez", d: "Remplissez votre formulaire en ligne. Notre équipe intègre votre contenu avec soin et vous livre sous 7 jours." },
            { n: "III", t: "Partagez", d: "Un lien précieux, pour toujours. Vos invités RSVP depuis l'invitation. Vous gérez tout depuis votre espace privé." },
          ].map(s => (
            <div key={s.n} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                fontSize: 72, color: "rgba(201,169,110,0.25)", lineHeight: 1, marginBottom: 20,
              }}>{s.n}</div>
              <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, #C9A96E, transparent)", margin: "0 auto 20px" }} />
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 500, marginBottom: 14 }}>{s.t}</h3>
              <p style={{ fontSize: 14, color: "#7A6858", lineHeight: 1.75, fontWeight: 300 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: "100px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#C9A96E", marginBottom: 20 }}>Nos offres</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 400, margin: 0 }}>
            L'excellence, <em style={{ fontStyle: "italic" }}>à votre mesure</em>
          </h2>
        </div>
        {ornament()}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, maxWidth: 1050, margin: "0 auto" }}>
          {[
            { n: "L'Essentielle", p: "179€", tag: null, f: ["9 blocs de contenu inclus", "RSVP intégré", "Compte à rebours", "Programme & lieux", "Partage par lien unique", "Livraison sous 7 jours"] },
            { n: "La Signature", p: "269€", tag: "Recommandé", f: ["Tout L'Essentielle", "Notre histoire animée", "Dress code illustré", "Galerie photos premium", "Empreintes personnalisées", "Plan interactif"] },
            { n: "L'Exception", p: "549€", tag: null, f: ["Tout La Signature", "Hébergements & navettes", "Activités & loisirs", "Liste de cadeaux", "Album live invités", "Assistance dédiée"] },
          ].map(t => (
            <div key={t.n} style={{
              border: t.tag ? "1px solid #C9A96E" : "1px solid rgba(201,169,110,0.3)",
              padding: "44px 32px",
              position: "relative",
              background: t.tag ? "linear-gradient(135deg, rgba(201,169,110,0.06), rgba(201,169,110,0.02))" : "transparent",
            }}>
              {t.tag && (
                <div style={{
                  position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                  background: "#C9A96E", color: "#2A1F18",
                  fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase",
                  padding: "5px 20px",
                }}>{t.tag}</div>
              )}
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, marginBottom: 8 }}>{t.n}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 52, color: "#C9A96E", marginBottom: 8 }}>{t.p}</div>
              <div style={{ fontSize: 12, color: "#A0907A", marginBottom: 28, letterSpacing: 1 }}>Inclus :</div>
              {t.f.map(f => (
                <div key={f} style={{ display: "flex", gap: 10, fontSize: 14, marginBottom: 10, color: "#6B5C54", alignItems: "flex-start" }}>
                  <span style={{ color: "#C9A96E", flexShrink: 0, marginTop: 1 }}>◆</span> {f}
                </div>
              ))}
              <button style={{
                marginTop: 28, width: "100%", padding: "14px",
                background: t.tag ? "#2A1F18" : "transparent",
                border: t.tag ? "none" : "1px solid rgba(201,169,110,0.5)",
                color: t.tag ? "#C9A96E" : "#C9A96E",
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
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#C9A96E", marginBottom: 20 }}>Ils nous ont fait confiance</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 400, color: "#F9F6F1", margin: 0 }}>
            Leurs mots, <em style={{ fontStyle: "italic", color: "#C9A96E" }}>notre fierté</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
          {[
            { n: "Amélie & Thomas", t: "Nos invités nous en parlent encore six mois plus tard. L'effet était total, inattendu, bouleversant.", l: "Paris · Juin 2025" },
            { n: "Chiara & Maxime", t: "On ne s'attendait pas à quelque chose d'aussi cinématique. C'est vraiment bien au-delà de ce qu'on espérait.", l: "Lyon · Septembre 2025" },
            { n: "Inès & Karim", t: "Eventia a compris notre histoire mieux que nous. L'invitation ressemblait à un court-métrage sur notre amour.", l: "Bordeaux · Avril 2026" },
          ].map(t => (
            <div key={t.n} style={{ padding: "36px 32px", border: "1px solid rgba(201,169,110,0.2)", position: "relative" }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                fontSize: 60, color: "rgba(201,169,110,0.2)", lineHeight: 0.7, marginBottom: 20,
              }}>«</div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 17, color: "#F9F6F1", lineHeight: 1.65, marginBottom: 24 }}>{t.t}</p>
              <div style={{ height: 1, background: "rgba(201,169,110,0.2)", marginBottom: 16 }} />
              <div style={{ fontSize: 13, color: "#C9A96E", letterSpacing: 1 }}>{t.n}</div>
              <div style={{ fontSize: 11, color: "rgba(249,246,241,0.4)", marginTop: 4, letterSpacing: 1 }}>{t.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#16100E", color: "rgba(249,246,241,0.5)", padding: "64px 64px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 24, color: "#C9A96E", marginBottom: 8 }}>Eventia Signature</div>
            <div style={{ height: 1, width: 60, background: "#C9A96E", opacity: 0.4, marginBottom: 16 }} />
            <p style={{ fontSize: 14, lineHeight: 1.75, maxWidth: 280 }}>Faire-parts digitaux de mariage. Une expérience précieuse, pour le plus beau jour de votre vie.</p>
          </div>
          {[
            { t: "Collections", ls: ["Les Voiles", "Les Seuils", "Les Écrins", "L'Union", "Save the Date"] },
            { t: "Eventia", ls: ["Notre vision", "L'équipe", "Presse", "Blog & conseils"] },
            { t: "Contact", ls: ["Nous écrire", "Instagram", "Pinterest", "FAQ"] },
          ].map(col => (
            <div key={col.t}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#C9A96E", marginBottom: 16 }}>{col.t}</div>
              {col.ls.map(l => <div key={l} style={{ fontSize: 14, marginBottom: 10, cursor: "pointer" }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(249,246,241,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", fontSize: 12 }}>
          <span>© 2026 Eventia Signature · eventiasignature.com</span>
          <span>Mentions légales · CGV · Confidentialité</span>
        </div>
      </footer>
    </div>
  );
}
