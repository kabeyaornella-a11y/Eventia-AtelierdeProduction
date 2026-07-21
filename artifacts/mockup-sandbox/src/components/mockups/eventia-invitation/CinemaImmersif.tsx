export default function CinemaImmersif() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0D0A08", color: "#F5F1EB" }}>
      {/* HERO - Générique de film */}
      <section
        style={{
          height: "100vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1606216840279-f1ce89d9fa42?w=1280&q=80"
          alt="Arche florale"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.25,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, rgba(13,10,8,0.7), rgba(13,10,8,0.9))",
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 2rem" }}>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.5em",
              color: "#C9A96E",
              textTransform: "uppercase",
              marginBottom: "3rem",
            }}
          >
            Une invitation de
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "8rem",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#C9A96E",
              margin: 0,
              lineHeight: 1,
            }}
          >
            Sophie & Lucas
          </h1>
          <svg
            width="200"
            height="40"
            viewBox="0 0 200 40"
            style={{ margin: "2rem 0" }}
          >
            <path
              d="M 10 20 Q 50 10, 100 20 T 190 20"
              stroke="#C9A96E"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
            />
          </svg>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.875rem",
              color: "#F5F1EB",
              letterSpacing: "0.2em",
              marginBottom: "0.5rem",
            }}
          >
            12 JUILLET 2026
          </div>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.875rem",
              color: "#C9A96E",
              opacity: 0.8,
            }}
          >
            Château de la Marquise · Provence
          </div>
        </div>
      </section>

      {/* INTERTITRE - Chapitre I */}
      <section
        style={{
          backgroundColor: "#0D0A08",
          padding: "8rem 2rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.625rem",
            letterSpacing: "0.3em",
            color: "#C9A96E",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}
        >
          Chapitre I
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "3.5rem",
            fontWeight: 300,
            color: "#C9A96E",
            marginBottom: "3rem",
          }}
        >
          Notre histoire
        </h2>
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.375rem",
            fontStyle: "italic",
            lineHeight: 2,
            color: "#EDE8E0",
            opacity: 0.9,
          }}
        >
          Tout a commencé lors d'un dîner à Paris en 2021. Un regard échangé dans la lumière
          tamisée d'un restaurant de Montmartre. Depuis ce soir-là, nos chemins ne se sont plus
          jamais séparés. Aujourd'hui, nous vous invitons à célébrer avec nous le début de notre
          nouvelle aventure.
        </div>
      </section>

      {/* INTERTITRE - Chapitre II */}
      <section
        style={{
          backgroundColor: "#111111",
          padding: "6rem 2rem 3rem 2rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.625rem",
            letterSpacing: "0.3em",
            color: "#C9A96E",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}
        >
          Chapitre II
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "3.5rem",
            fontWeight: 300,
            color: "#C9A96E",
            marginBottom: "4rem",
          }}
        >
          Programme
        </h2>
      </section>

      {/* PROGRAMME - Chaque moment sur fond différent */}
      {[
        { time: "14h00", title: "Cérémonie civile", desc: "Salle des mariages", bg: "#111111" },
        { time: "15h30", title: "Cérémonie religieuse", desc: "Chapelle du château", bg: "#141414" },
        { time: "17h00", title: "Vin d'honneur", desc: "Jardins à la française", bg: "#0F0F0F" },
        { time: "19h30", title: "Dîner", desc: "Grande salle de réception", bg: "#121212" },
        { time: "23h00", title: "Soirée dansante", desc: "Jusqu'au bout de la nuit", bg: "#0D0A08" },
      ].map((event, idx) => (
        <section
          key={idx}
          style={{
            backgroundColor: event.bg,
            padding: "4rem 2rem",
            textAlign: "center",
            borderTop: idx > 0 ? "1px solid rgba(201,169,110,0.1)" : "none",
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "5rem",
              fontWeight: 300,
              color: "#C9A96E",
              lineHeight: 1,
              marginBottom: "1rem",
            }}
          >
            {event.time}
          </div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.5rem",
              fontWeight: 300,
              color: "#F5F1EB",
              margin: "0 0 0.5rem 0",
            }}
          >
            {event.title}
          </h3>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.875rem",
              color: "#9B8B7E",
              margin: 0,
            }}
          >
            {event.desc}
          </p>
        </section>
      ))}

      {/* LIEUX - Cartes côte à côte */}
      <section
        style={{
          backgroundColor: "#0D0A08",
          padding: "6rem 2rem",
        }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "3.5rem",
            fontWeight: 300,
            color: "#C9A96E",
            marginBottom: "4rem",
            textAlign: "center",
          }}
        >
          Lieu de réception
        </h2>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#1A1410",
              border: "1px solid rgba(201,169,110,0.2)",
              padding: "2.5rem",
              borderRadius: "2px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2rem",
                fontWeight: 400,
                color: "#C9A96E",
                marginBottom: "1rem",
              }}
            >
              Château de la Marquise
            </h3>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "1rem",
                color: "#EDE8E0",
                marginBottom: "1.5rem",
                lineHeight: 1.6,
              }}
            >
              Route des Lavandes<br />
              84220 Gordes<br />
              Provence
            </p>
            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.75rem",
                color: "#9B8B7E",
                fontStyle: "italic",
              }}
            >
              GPS: 43.9108° N, 5.2014° E
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#1A1410",
              border: "1px solid rgba(201,169,110,0.2)",
              padding: "2.5rem",
              borderRadius: "2px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2rem",
                fontWeight: 400,
                color: "#C9A96E",
                marginBottom: "1rem",
              }}
            >
              Transport
            </h3>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.9375rem",
                color: "#EDE8E0",
                marginBottom: "1rem",
                lineHeight: 1.7,
              }}
            >
              Navette disponible depuis la gare d'Avignon TGV à 13h00.
            </p>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.9375rem",
                color: "#EDE8E0",
                lineHeight: 1.7,
              }}
            >
              Parking privé sur place pour les véhicules personnels.
            </p>
          </div>
        </div>
      </section>

      {/* CTA RSVP - Fond gold inversé */}
      <section
        style={{
          backgroundColor: "#C9A96E",
          padding: "6rem 2rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "3.5rem",
            fontWeight: 300,
            color: "#2A221F",
            marginBottom: "1.5rem",
          }}
        >
          Nous espérons vous y voir
        </h2>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "1rem",
            color: "#2A221F",
            marginBottom: "3rem",
            opacity: 0.8,
          }}
        >
          Merci de confirmer votre présence avant le 1er juin 2026
        </p>
        <button
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.875rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            backgroundColor: "#2A221F",
            color: "#C9A96E",
            padding: "1.25rem 3rem",
            border: "2px solid #2A221F",
            borderRadius: "2px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#2A221F";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#2A221F";
            e.currentTarget.style.color = "#C9A96E";
          }}
        >
          Répondre à l'invitation →
        </button>
      </section>

      {/* GALERIE PHOTOS - Grille asymétrique */}
      <section
        style={{
          backgroundColor: "#0D0A08",
          padding: "6rem 2rem",
        }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "3.5rem",
            fontWeight: 300,
            color: "#C9A96E",
            marginBottom: "4rem",
            textAlign: "center",
          }}
        >
          Aperçu
        </h2>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gridTemplateRows: "400px 400px",
            gap: "1rem",
          }}
        >
          <div
            style={{
              gridRow: "1 / 3",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1280&q=80"
              alt="Réception"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.85,
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1490750967868-88df5691cc3a?w=800&q=80"
              alt="Bouquet"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.85,
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80"
              alt="Alliances"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.85,
              }}
            />
          </div>
        </div>
      </section>

      {/* GALERIE SUPPLÉMENTAIRE - Rangée horizontale */}
      <section
        style={{
          backgroundColor: "#0D0A08",
          padding: "0 2rem 6rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
          }}
        >
          <div style={{ height: "300px", overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1280&q=80"
              alt="Floraux"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.85,
              }}
            />
          </div>
          <div style={{ height: "300px", overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1280&q=80"
              alt="Cérémonie"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.85,
              }}
            />
          </div>
          <div style={{ height: "300px", overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1606216840279-f1ce89d9fa42?w=1280&q=80"
              alt="Arche"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.85,
              }}
            />
          </div>
        </div>
      </section>

      {/* FOOTER minimaliste */}
      <footer
        style={{
          backgroundColor: "#0D0A08",
          padding: "4rem 2rem",
          textAlign: "center",
          borderTop: "1px solid rgba(201,169,110,0.1)",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.5rem",
            color: "#C9A96E",
            marginBottom: "1rem",
            letterSpacing: "0.2em",
          }}
        >
          S & L · 12.07.2026
        </div>
        <div
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.625rem",
            color: "#6B5B4E",
            letterSpacing: "0.1em",
          }}
        >
          Réalisé par Eventia Atelier · eventia.app
        </div>
      </footer>
    </div>
  );
}
