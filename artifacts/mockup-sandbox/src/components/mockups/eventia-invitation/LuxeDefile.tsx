import { useEffect, useState } from "react";

export default function LuxeDefile() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("2026-07-12T14:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#2A221F", color: "#F5F1EB" }}>
      {/* HERO Section */}
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
          src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1280&q=80"
          alt="Château"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
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
            background: "linear-gradient(to bottom, rgba(26,20,16,0.4), rgba(26,20,16,0.85))",
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 2rem" }}>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "4rem",
              color: "#C9A96E",
              marginBottom: "1.5rem",
              fontWeight: 300,
            }}
          >
            S ✦ L
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "6rem",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#F5F1EB",
              margin: "0 0 1rem 0",
              lineHeight: 1.1,
            }}
          >
            Sophie & Lucas
          </h1>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              color: "#C9A96E",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            12 · JUILLET · 2026
          </div>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.875rem",
              color: "#F5F1EB",
              opacity: 0.9,
            }}
          >
            Château de la Marquise · Provence
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            zIndex: 2,
            animation: "float 2s ease-in-out infinite",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(10px); }
          }
        `}</style>
      </section>

      {/* COUNTDOWN Section */}
      <section
        style={{
          backgroundColor: "#1A1410",
          padding: "6rem 2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2.5rem",
            color: "#C9A96E",
            fontWeight: 300,
            margin: 0,
          }}
        >
          Dans moins de...
        </h2>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { value: timeLeft.days, label: "JOURS" },
            { value: timeLeft.hours, label: "HEURES" },
            { value: timeLeft.minutes, label: "MINUTES" },
            { value: timeLeft.seconds, label: "SECONDES" },
          ].map((unit, idx, arr) => (
            <div key={unit.label} style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "5rem",
                    color: "#C9A96E",
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.625rem",
                    color: "#9B8B7E",
                    letterSpacing: "0.2em",
                    marginTop: "0.5rem",
                  }}
                >
                  {unit.label}
                </div>
              </div>
              {idx < arr.length - 1 && (
                <div style={{ fontSize: "3rem", color: "#C9A96E", opacity: 0.5 }}>·</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* NOTRE HISTOIRE Section */}
      <section
        style={{
          backgroundColor: "#F9F6F1",
          color: "#2A221F",
          padding: "6rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "3rem",
                fontWeight: 300,
                marginBottom: "2rem",
                color: "#2A221F",
              }}
            >
              Notre histoire
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.25rem",
                fontStyle: "italic",
                lineHeight: 1.8,
                color: "#6B5B4E",
              }}
            >
              Tout a commencé lors d'un dîner à Paris en 2021. Un regard échangé dans la lumière
              tamisée d'un restaurant de Montmartre. Depuis ce soir-là, nos chemins ne se sont plus
              jamais séparés. Aujourd'hui, nous vous invitons à célébrer avec nous le début de notre
              nouvelle aventure.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1280&q=80"
              alt="Sophie et Lucas"
              style={{
                width: "100%",
                height: "600px",
                objectFit: "cover",
                borderRadius: "4px",
                border: "1px solid rgba(201,169,110,0.2)",
              }}
            />
          </div>
        </div>
      </section>

      {/* PROGRAMME Section */}
      <section
        style={{
          backgroundColor: "#2A221F",
          padding: "6rem 2rem",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "3rem",
              fontWeight: 300,
              marginBottom: "4rem",
              textAlign: "center",
              color: "#C9A96E",
            }}
          >
            Programme de la journée
          </h2>
          <div style={{ position: "relative", paddingLeft: "3rem" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "2px",
                backgroundColor: "#C9A96E",
                opacity: 0.3,
              }}
            />
            {[
              { time: "14h00", title: "Cérémonie civile", desc: "Salle des mariages" },
              { time: "15h30", title: "Cérémonie religieuse", desc: "Chapelle du château" },
              { time: "17h00", title: "Vin d'honneur", desc: "Jardins à la française" },
              { time: "19h30", title: "Dîner", desc: "Grande salle de réception" },
              { time: "23h00", title: "Soirée dansante", desc: "Jusqu'au bout de la nuit" },
            ].map((event, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  marginBottom: "3rem",
                  paddingLeft: "1rem",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "-0.5rem",
                    top: "0.5rem",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#C9A96E",
                    border: "2px solid #2A221F",
                  }}
                />
                <div
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.875rem",
                    color: "#C9A96E",
                    letterSpacing: "0.1em",
                    marginBottom: "0.5rem",
                  }}
                >
                  {event.time}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.75rem",
                    fontWeight: 400,
                    color: "#F5F1EB",
                    margin: "0 0 0.25rem 0",
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIEU & TRANSPORT Section */}
      <section
        style={{
          backgroundColor: "#F9F6F1",
          color: "#2A221F",
          padding: "6rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "3rem",
              fontWeight: 300,
              marginBottom: "3rem",
              textAlign: "center",
            }}
          >
            Lieu de réception
          </h2>
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid rgba(201,169,110,0.2)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "400px",
                backgroundColor: "#EDE8E0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.75rem",
                  color: "#9B8B7E",
                }}
              >
                Carte interactive à venir
              </div>
            </div>
            <div style={{ padding: "2rem" }}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}
              >
                Château de la Marquise
              </h3>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "1rem",
                  color: "#6B5B4E",
                  marginBottom: "2rem",
                }}
              >
                Route des Lavandes, 84220 Gordes, Provence
              </p>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.875rem",
                  fontStyle: "italic",
                  color: "#9B8B7E",
                  lineHeight: 1.6,
                }}
              >
                Une navette sera mise à disposition depuis la gare d'Avignon TGV à 13h00.
                Un parking privé est disponible sur place pour ceux qui viennent en voiture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP CTA Section */}
      <section
        style={{
          backgroundColor: "#2A221F",
          padding: "6rem 2rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "3rem",
            fontWeight: 300,
            color: "#C9A96E",
            marginBottom: "1.5rem",
          }}
        >
          Nous espérons vous y voir
        </h2>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "1rem",
            color: "#F5F1EB",
            marginBottom: "3rem",
            opacity: 0.9,
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
            backgroundColor: "#C9A96E",
            color: "#2A221F",
            padding: "1.25rem 3rem",
            border: "none",
            borderRadius: "2px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#D4B57E";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#C9A96E";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Répondre à l'invitation →
        </button>
      </section>

      {/* MUSIQUE Section */}
      <section
        style={{
          backgroundColor: "#1A1410",
          padding: "6rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.5rem",
              fontWeight: 300,
              marginBottom: "3rem",
              textAlign: "center",
              color: "#C9A96E",
            }}
          >
            Notre playlist de mariage
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              { title: "La Vie en Rose", artist: "Édith Piaf" },
              { title: "At Last", artist: "Etta James" },
              { title: "Can't Help Falling in Love", artist: "Elvis Presley" },
              { title: "Beyond", artist: "Léon Bridges" },
            ].map((song, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(201,169,110,0.2)",
                  borderRadius: "4px",
                  padding: "1.5rem",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.25rem",
                    color: "#F5F1EB",
                    marginBottom: "0.5rem",
                    fontWeight: 400,
                  }}
                >
                  {song.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.875rem",
                    color: "#9B8B7E",
                    marginBottom: "1rem",
                  }}
                >
                  {song.artist}
                </p>
                <div
                  style={{
                    height: "4px",
                    backgroundColor: "rgba(201,169,110,0.2)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.random() * 60 + 20}%`,
                      backgroundColor: "#C9A96E",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "#2A221F",
          padding: "3rem 2rem",
          textAlign: "center",
          borderTop: "1px solid rgba(201,169,110,0.2)",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2rem",
            color: "#C9A96E",
            marginBottom: "1rem",
          }}
        >
          S ✦ L
        </div>
        <div
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.75rem",
            color: "#9B8B7E",
          }}
        >
          Réalisé par Eventia Atelier · eventia.app
        </div>
      </footer>
    </div>
  );
}
