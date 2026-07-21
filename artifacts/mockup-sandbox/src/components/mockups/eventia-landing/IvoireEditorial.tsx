export default function IvoireEditorial() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#F9F6F1",
      color: "#2A221F",
      fontFamily: "'Jost', sans-serif"
    }}>
      {/* Navigation */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(249, 246, 241, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #C9A96E"
      }}>
        <div style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "1.75rem 3rem",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "2rem"
        }}>
          {/* Left Links */}
          <div style={{
            display: "flex",
            gap: "2.5rem",
            fontSize: "0.625rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 400
          }}>
            <a href="#" style={{ color: "#2A221F", textDecoration: "none", opacity: 0.8 }}>Créations</a>
            <a href="#" style={{ color: "#2A221F", textDecoration: "none", opacity: 0.8 }}>Atelier</a>
          </div>

          {/* Centered Logo */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.75rem",
            color: "#2A221F",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            fontWeight: 300,
            textAlign: "center"
          }}>
            EVENTIA
          </div>

          {/* Right Links */}
          <div style={{
            display: "flex",
            gap: "2.5rem",
            fontSize: "0.625rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 400,
            justifyContent: "flex-end"
          }}>
            <a href="#" style={{ color: "#2A221F", textDecoration: "none", opacity: 0.8 }}>Tarifs</a>
            <a href="#" style={{ color: "#2A221F", textDecoration: "none", opacity: 0.8 }}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Split Layout */}
      <section style={{
        marginTop: "5rem",
        minHeight: "calc(100vh - 5rem)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0
      }}>
        {/* Left Side - Text */}
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "4rem 5rem 4rem 8%"
        }}>
          <div>
            <div style={{
              fontSize: "0.5625rem",
              letterSpacing: "0.35em",
              color: "#C9A96E",
              textTransform: "uppercase",
              marginBottom: "2rem",
              fontWeight: 400
            }}>
              ✦ ATELIER PARISIEN
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              lineHeight: 1.25,
              marginBottom: "2rem",
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "-0.01em"
            }}>
              Votre amour<br />mérite une invitation<br />à sa hauteur
            </h1>

            <p style={{
              fontSize: "1.0625rem",
              lineHeight: 1.8,
              color: "#6B5B4E",
              marginBottom: "3rem",
              maxWidth: "480px"
            }}>
              Plus qu'un simple faire-part digital, nous créons une expérience immersive qui capture l'essence de votre histoire et émerveille vos invités avant même le jour J.
            </p>

            <button style={{
              padding: "1.25rem 3rem",
              backgroundColor: "#2A221F",
              color: "#F9F6F1",
              border: "none",
              fontSize: "0.625rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontWeight: 500,
              transition: "all 0.3s ease"
            }}>
              Créer mon invitation
            </button>

            <div style={{
              marginTop: "3rem",
              paddingTop: "2.5rem",
              borderTop: "1px solid rgba(201, 169, 110, 0.3)",
              display: "flex",
              gap: "2rem",
              fontSize: "0.75rem",
              color: "#9B8B7E"
            }}>
              <div>
                <span style={{ 
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.75rem",
                  color: "#C9A96E",
                  display: "block",
                  marginBottom: "0.25rem"
                }}>
                  4.9
                </span>
                ★★★★★
              </div>
              <div style={{
                borderLeft: "1px solid rgba(201, 169, 110, 0.3)",
                paddingLeft: "2rem"
              }}>
                <span style={{ 
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.75rem",
                  color: "#C9A96E",
                  display: "block",
                  marginBottom: "0.25rem"
                }}>
                  2000+
                </span>
                Couples
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div style={{
          position: "relative",
          padding: "4rem 8% 4rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            position: "relative",
            width: "100%",
            maxWidth: "600px",
            aspectRatio: "3/4"
          }}>
            {/* Gold Frame */}
            <div style={{
              position: "absolute",
              inset: "-1rem",
              border: "1px solid #C9A96E",
              pointerEvents: "none"
            }} />
            
            <img 
              src="https://images.unsplash.com/photo-1606216840279-f1ce89d9fa42?w=1280&q=80"
              alt="Arche florale"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section style={{
        backgroundColor: "white",
        padding: "2.5rem 2rem",
        borderTop: "1px solid rgba(201, 169, 110, 0.2)",
        borderBottom: "1px solid rgba(201, 169, 110, 0.2)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          flexWrap: "wrap",
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#9B8B7E"
        }}>
          <div>4.9 ★ sur 237 avis</div>
          <div style={{ color: "#C9A96E" }}>✦</div>
          <div>2 000+ couples accompagnés</div>
          <div style={{ color: "#C9A96E" }}>✦</div>
          <div>Vogue Mariage</div>
          <div style={{ color: "#C9A96E" }}>✦</div>
          <div>ELLE Décoration</div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section style={{
        backgroundColor: "white",
        padding: "8rem 2rem"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: "5rem"
          }}>
            <div style={{
              fontSize: "0.5625rem",
              letterSpacing: "0.3em",
              color: "#C9A96E",
              textTransform: "uppercase",
              marginBottom: "1.5rem"
            }}>
              ✦ Notre process
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.3
            }}>
              Comment ça marche
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "4rem"
          }}>
            {[
              {
                num: "01",
                title: "Briefing créatif",
                desc: "Nous échangeons sur votre histoire, vos goûts esthétiques et vos besoins spécifiques."
              },
              {
                num: "02",
                title: "Création sur-mesure",
                desc: "Notre atelier design conçoit votre invitation unique avec animations et interactions."
              },
              {
                num: "03",
                title: "Validation & ajustements",
                desc: "Vous validez chaque détail. Nous affinons jusqu'à la perfection absolue."
              },
              {
                num: "04",
                title: "Livraison & suivi",
                desc: "Votre site est en ligne. Tableau de bord temps réel pour gérer les RSVP."
              }
            ].map((step, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "5rem",
                  color: "#EDE8E0",
                  fontWeight: 300,
                  lineHeight: 1,
                  marginBottom: "1.5rem"
                }}>
                  {step.num}
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.75rem",
                  marginBottom: "1rem",
                  color: "#2A221F"
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                  color: "#6B5B4E"
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section style={{
        backgroundColor: "#F9F6F1",
        padding: "8rem 0"
      }}>
        <div style={{
          paddingLeft: "8%",
          marginBottom: "4rem"
        }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 400,
            marginBottom: "1rem"
          }}>
            Nos œuvres
          </h2>
          <p style={{
            fontSize: "0.9375rem",
            color: "#6B5B4E",
            letterSpacing: "0.05em"
          }}>
            Chaque création est unique, pensée pour son couple
          </p>
        </div>

        <div style={{
          display: "flex",
          gap: "2rem",
          overflowX: "auto",
          paddingLeft: "8%",
          paddingRight: "8%",
          scrollSnapType: "x mandatory"
        }}>
          {[
            { img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1280&q=80", names: "Sophie & Lucas Moreau", date: "12 Juillet 2026" },
            { img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1280&q=80", names: "Camille & Thomas", date: "15 Août 2026" },
            { img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1280&q=80", names: "Léa & Alexandre", date: "22 Juin 2026" },
            { img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1280&q=80", names: "Marine & Julien", date: "5 Septembre 2026" },
            { img: "https://images.unsplash.com/photo-1490750967868-88df5691cc3a?w=800&q=80", names: "Emma & Nicolas", date: "18 Mai 2026" }
          ].map((item, i) => (
            <div key={i} style={{
              minWidth: "340px",
              scrollSnapAlign: "start",
              flexShrink: 0
            }}>
              <div style={{
                aspectRatio: "4/5",
                backgroundColor: "white",
                border: "1px solid rgba(201, 169, 110, 0.2)",
                marginBottom: "1.5rem",
                overflow: "hidden"
              }}>
                <img 
                  src={item.img}
                  alt={item.names}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
                fontStyle: "italic",
                color: "#2A221F"
              }}>
                {item.names}
              </div>
              <div style={{
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#9B8B7E"
              }}>
                {item.date}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Témoignage */}
      <section style={{
        backgroundColor: "white",
        padding: "8rem 2rem"
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <div style={{
            width: "60px",
            height: "1px",
            backgroundColor: "#C9A96E",
            margin: "0 auto 3rem"
          }} />
          
          <blockquote style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            lineHeight: 1.6,
            fontStyle: "italic",
            color: "#2A221F",
            marginBottom: "3rem",
            fontWeight: 300
          }}>
            "Eventia a transformé notre faire-part en une véritable œuvre d'art digitale. Nos invités en parlent encore. Le niveau de personnalisation et l'élégance des animations ont dépassé toutes nos attentes."
          </blockquote>

          <div style={{
            fontSize: "0.9375rem",
            color: "#6B5B4E"
          }}>
            <div style={{ 
              fontWeight: 500,
              marginBottom: "0.5rem",
              color: "#2A221F"
            }}>
              Sophie & Lucas Moreau
            </div>
            <div style={{ 
              fontSize: "0.8125rem",
              color: "#9B8B7E",
              letterSpacing: "0.05em"
            }}>
              Château de la Marquise, Provence — Juillet 2024
            </div>
          </div>

          <div style={{
            marginTop: "2rem",
            color: "#C9A96E",
            fontSize: "1rem"
          }}>
            ★★★★★
          </div>

          <div style={{
            width: "60px",
            height: "1px",
            backgroundColor: "#C9A96E",
            margin: "3rem auto 0"
          }} />
        </div>
      </section>

      {/* Pricing */}
      <section style={{
        backgroundColor: "#F9F6F1",
        padding: "8rem 2rem"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: "5rem"
          }}>
            <div style={{
              fontSize: "0.5625rem",
              letterSpacing: "0.3em",
              color: "#C9A96E",
              textTransform: "uppercase",
              marginBottom: "1.5rem"
            }}>
              ✦ Nos formules
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400
            }}>
              Investissez dans l'excellence
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            alignItems: "start"
          }}>
            {/* Plan 1 */}
            <div style={{
              padding: "3.5rem 3rem",
              backgroundColor: "white",
              border: "1px solid rgba(201, 169, 110, 0.25)"
            }}>
              <div style={{
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#9B8B7E",
                marginBottom: "1rem"
              }}>
                Invitation
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "3.5rem",
                color: "#2A221F",
                marginBottom: "0.5rem"
              }}>
                290€
              </div>
              <div style={{
                fontSize: "0.875rem",
                color: "#6B5B4E",
                marginBottom: "2.5rem",
                paddingBottom: "2.5rem",
                borderBottom: "1px solid rgba(201, 169, 110, 0.2)"
              }}>
                L'essentiel avec élégance
              </div>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.9375rem",
                lineHeight: 2.2,
                color: "#6B5B4E"
              }}>
                <li>Page d'invitation personnalisée</li>
                <li>Formulaire RSVP en ligne</li>
                <li>Carte interactive du lieu</li>
                <li>Galerie photos (20 max)</li>
                <li>Support par email</li>
              </ul>
              <button style={{
                marginTop: "2.5rem",
                width: "100%",
                padding: "1rem",
                backgroundColor: "transparent",
                border: "1px solid #C9A96E",
                color: "#C9A96E",
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer"
              }}>
                Choisir cette formule
              </button>
            </div>

            {/* Plan 2 - Featured */}
            <div style={{
              padding: "3.5rem 3rem",
              backgroundColor: "#2A221F",
              border: "1px solid #2A221F",
              position: "relative",
              transform: "scale(1.05)"
            }}>
              <div style={{
                position: "absolute",
                top: "-1px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#C9A96E",
                padding: "0.5rem 1.5rem",
                fontSize: "0.5rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#2A221F",
                fontWeight: 500
              }}>
                Recommandé
              </div>
              <div style={{
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#9B8B7E",
                marginBottom: "1rem"
              }}>
                Signature
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "3.5rem",
                color: "#C9A96E",
                marginBottom: "0.5rem"
              }}>
                650€
              </div>
              <div style={{
                fontSize: "0.875rem",
                color: "#9B8B7E",
                marginBottom: "2.5rem",
                paddingBottom: "2.5rem",
                borderBottom: "1px solid rgba(201, 169, 110, 0.2)"
              }}>
                L'expérience Eventia complète
              </div>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.9375rem",
                lineHeight: 2.2,
                color: "#EDE8E0"
              }}>
                <li>Site complet multi-pages</li>
                <li>Animations cinématiques</li>
                <li>RSVP + gestion des menus</li>
                <li>Galerie photos illimitée</li>
                <li>Timeline de votre histoire</li>
                <li>Liste de mariage intégrée</li>
                <li>Support prioritaire & suivi</li>
              </ul>
              <button style={{
                marginTop: "2.5rem",
                width: "100%",
                padding: "1rem",
                backgroundColor: "#C9A96E",
                border: "none",
                color: "#2A221F",
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontWeight: 500
              }}>
                Choisir cette formule
              </button>
            </div>

            {/* Plan 3 */}
            <div style={{
              padding: "3.5rem 3rem",
              backgroundColor: "white",
              border: "1px solid rgba(201, 169, 110, 0.25)"
            }}>
              <div style={{
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#9B8B7E",
                marginBottom: "1rem"
              }}>
                Prestige
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "3.5rem",
                color: "#2A221F",
                marginBottom: "0.5rem"
              }}>
                950€
              </div>
              <div style={{
                fontSize: "0.875rem",
                color: "#6B5B4E",
                marginBottom: "2.5rem",
                paddingBottom: "2.5rem",
                borderBottom: "1px solid rgba(201, 169, 110, 0.2)"
              }}>
                Le sur-mesure absolu
              </div>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.9375rem",
                lineHeight: 2.2,
                color: "#6B5B4E"
              }}>
                <li>Tout de la formule Signature</li>
                <li>Design 100% sur-mesure</li>
                <li>Développements Three.js custom</li>
                <li>Vidéo d'intro cinématique</li>
                <li>Intégrations API avancées</li>
                <li>Nom de domaine personnalisé</li>
                <li>Accompagnement dédié</li>
              </ul>
              <button style={{
                marginTop: "2.5rem",
                width: "100%",
                padding: "1rem",
                backgroundColor: "transparent",
                border: "1px solid #C9A96E",
                color: "#C9A96E",
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer"
              }}>
                Choisir cette formule
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{
        backgroundColor: "#2A221F",
        padding: "6rem 2rem",
        textAlign: "center"
      }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            fontWeight: 400,
            color: "#F9F6F1",
            marginBottom: "2rem",
            fontStyle: "italic"
          }}>
            Prêts à créer une invitation<br />inoubliable ?
          </h2>
          <p style={{
            fontSize: "1.0625rem",
            color: "#9B8B7E",
            marginBottom: "3rem",
            lineHeight: 1.7
          }}>
            Réservez un appel découverte gratuit de 30 minutes avec notre équipe créative
          </p>
          <button style={{
            padding: "1.25rem 3rem",
            backgroundColor: "#C9A96E",
            color: "#2A221F",
            border: "none",
            fontSize: "0.625rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontWeight: 500
          }}>
            Réserver mon appel
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#F9F6F1",
        padding: "4rem 2rem 2rem",
        borderTop: "1px solid rgba(201, 169, 110, 0.25)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem"
          }}>
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2rem",
                color: "#2A221F",
                marginBottom: "1rem",
                letterSpacing: "0.3em"
              }}>
                EVENTIA
              </div>
              <p style={{
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "#6B5B4E"
              }}>
                L'excellence parisienne<br />au service de votre amour
              </p>
            </div>
            <div>
              <h4 style={{
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                color: "#2A221F",
                fontWeight: 500
              }}>
                Produit
              </h4>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.875rem",
                lineHeight: 2.5,
                color: "#6B5B4E"
              }}>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Créations</a></li>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Tarifs</a></li>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Process</a></li>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                color: "#2A221F",
                fontWeight: 500
              }}>
                Atelier
              </h4>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.875rem",
                lineHeight: 2.5,
                color: "#6B5B4E"
              }}>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Notre histoire</a></li>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Équipe</a></li>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Presse</a></li>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                color: "#2A221F",
                fontWeight: 500
              }}>
                Suivez-nous
              </h4>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.875rem",
                lineHeight: 2.5,
                color: "#6B5B4E"
              }}>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Instagram</a></li>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Pinterest</a></li>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div style={{
            paddingTop: "2rem",
            borderTop: "1px solid rgba(201, 169, 110, 0.25)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.75rem",
            color: "#9B8B7E",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <div>
              Made with love in Paris ✦ © 2024 Eventia
            </div>
            <div style={{
              display: "flex",
              gap: "2rem"
            }}>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Mentions légales</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>CGV</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
