export default function CinematiqueSombre() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#1A1410",
      color: "#F5F1EB",
      fontFamily: "'Jost', sans-serif"
    }}>
      {/* Navigation */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(26, 20, 16, 0.85)",
        borderBottom: "1px solid rgba(201, 169, 110, 0.1)"
      }}>
        <div style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "1.5rem 3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.75rem",
            fontStyle: "italic",
            color: "#F5F1EB",
            letterSpacing: "0.02em"
          }}>
            eventia
          </div>
          
          <div style={{
            display: "flex",
            gap: "2.5rem",
            fontSize: "0.625rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 400
          }}>
            <a href="#" style={{ color: "#F5F1EB", textDecoration: "none", opacity: 0.9 }}>Nos créations</a>
            <a href="#" style={{ color: "#F5F1EB", textDecoration: "none", opacity: 0.9 }}>Atelier</a>
            <a href="#" style={{ color: "#F5F1EB", textDecoration: "none", opacity: 0.9 }}>Contact</a>
          </div>

          <button style={{
            padding: "0.75rem 1.75rem",
            border: "1px solid #C9A96E",
            backgroundColor: "transparent",
            color: "#C9A96E",
            fontSize: "0.625rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}>
            Commencer
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}>
        {/* Background Image */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 0
        }}>
          <img 
            src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1280&q=80"
            alt="Château"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
          {/* Dark Gradient Overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(26, 20, 16, 0.95) 0%, rgba(26, 20, 16, 0.7) 40%, rgba(26, 20, 16, 0.4) 100%)"
          }} />
        </div>

        {/* Hero Content */}
        <div style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: "900px",
          padding: "0 2rem"
        }}>
          <div style={{
            fontSize: "0.5625rem",
            letterSpacing: "0.35em",
            color: "#C9A96E",
            textTransform: "uppercase",
            marginBottom: "2rem",
            fontWeight: 400
          }}>
            ✦ ATELIER DE PRODUCTION DIGITALE
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            lineHeight: 1.15,
            marginBottom: "1.5rem",
            fontWeight: 400,
            letterSpacing: "-0.01em"
          }}>
            L'invitation qui restera<br />dans les mémoires
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.5rem",
            fontStyle: "italic",
            color: "#C9A96E",
            marginBottom: "3rem",
            opacity: 0.95
          }}>
            Chaque détail, pensé comme une scène.
          </p>

          <div style={{
            display: "flex",
            gap: "1.25rem",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <button style={{
              padding: "1.125rem 2.75rem",
              backgroundColor: "#C9A96E",
              color: "#1A1410",
              border: "none",
              fontSize: "0.625rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontWeight: 500,
              transition: "all 0.3s ease"
            }}>
              Découvrir nos créations
            </button>
            <button style={{
              padding: "1.125rem 2.75rem",
              backgroundColor: "transparent",
              color: "#C9A96E",
              border: "1px solid #C9A96E",
              fontSize: "0.625rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontWeight: 400,
              transition: "all 0.3s ease"
            }}>
              Comment ça marche →
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: "absolute",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "#C9A96E",
          fontSize: "0.5rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase"
        }}>
          <span>Découvrir</span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <path d="M6 0V18M6 18L1 13M6 18L11 13" stroke="#C9A96E" strokeWidth="1.5"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        backgroundColor: "#2A221F",
        padding: "4rem 2rem",
        borderTop: "1px solid rgba(201, 169, 110, 0.15)",
        borderBottom: "1px solid rgba(201, 169, 110, 0.15)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "3rem",
          textAlign: "center"
        }}>
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "3.5rem",
              color: "#C9A96E",
              marginBottom: "0.5rem",
              fontWeight: 300
            }}>
              2000+
            </div>
            <div style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9B8B7E"
            }}>
              Couples accompagnés
            </div>
          </div>
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "3.5rem",
              color: "#C9A96E",
              marginBottom: "0.5rem",
              fontWeight: 300
            }}>
              98%
            </div>
            <div style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9B8B7E"
            }}>
              Satisfaction clients
            </div>
          </div>
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "3.5rem",
              color: "#C9A96E",
              marginBottom: "0.5rem",
              fontWeight: 300
            }}>
              48h
            </div>
            <div style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9B8B7E"
            }}>
              Livraison moyenne
            </div>
          </div>
        </div>
      </section>

      {/* Notre différence */}
      <section style={{
        backgroundColor: "#2F2420",
        padding: "7rem 2rem"
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
              ✦ Notre différence
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.2
            }}>
              Plus qu'une invitation,<br />une expérience immersive
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "3rem"
          }}>
            {/* Feature 1 */}
            <div style={{
              padding: "3rem 2rem",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(201, 169, 110, 0.2)",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "3rem",
                marginBottom: "1.5rem"
              }}>🎬</div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.75rem",
                marginBottom: "1rem",
                color: "#C9A96E"
              }}>
                Moteur cinématique
              </h3>
              <p style={{
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: "#9B8B7E"
              }}>
                Animations GSAP et Three.js pour des transitions dignes du grand écran. Chaque page raconte votre histoire.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{
              padding: "3rem 2rem",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(201, 169, 110, 0.2)",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "3rem",
                marginBottom: "1.5rem"
              }}>📱</div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.75rem",
                marginBottom: "1rem",
                color: "#C9A96E"
              }}>
                RSVP intelligent
              </h3>
              <p style={{
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: "#9B8B7E"
              }}>
                Suivi en temps réel des confirmations, gestion des menus, allergies et coordonnées. Tout centralisé.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{
              padding: "3rem 2rem",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(201, 169, 110, 0.2)",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "3rem",
                marginBottom: "1.5rem"
              }}>🎨</div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.75rem",
                marginBottom: "1rem",
                color: "#C9A96E"
              }}>
                Sur-mesure
              </h3>
              <p style={{
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: "#9B8B7E"
              }}>
                Pas de template générique. Notre atelier humain adapte chaque détail à votre identité visuelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section style={{
        backgroundColor: "#1A1410",
        padding: "7rem 2rem"
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto"
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: "4rem"
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              marginBottom: "1rem"
            }}>
              Nos dernières créations
            </h2>
            <p style={{
              fontSize: "0.9375rem",
              color: "#9B8B7E",
              letterSpacing: "0.05em"
            }}>
              Chaque couple mérite une invitation unique
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem"
          }}>
            {[
              { img: "https://images.unsplash.com/photo-1606216840279-f1ce89d9fa42?w=1280&q=80", names: "Sophie & Lucas" },
              { img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1280&q=80", names: "Camille & Thomas" },
              { img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1280&q=80", names: "Léa & Alexandre" },
              { img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1280&q=80", names: "Marine & Julien" },
              { img: "https://images.unsplash.com/photo-1490750967868-88df5691cc3a?w=800&q=80", names: "Emma & Nicolas" },
              { img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1280&q=80", names: "Clara & Antoine" }
            ].map((item, i) => (
              <div key={i} style={{
                position: "relative",
                aspectRatio: "3/4",
                overflow: "hidden",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(201, 169, 110, 0.15)",
                cursor: "pointer"
              }}>
                <img 
                  src={item.img}
                  alt={item.names}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease"
                  }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(26, 20, 16, 0.9) 0%, transparent 60%)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "2rem",
                  opacity: 0.85,
                  transition: "opacity 0.3s ease"
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    color: "#C9A96E",
                    fontStyle: "italic"
                  }}>
                    {item.names}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section style={{
        backgroundColor: "#2A221F",
        padding: "7rem 2rem"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: "4rem"
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400
            }}>
              Ils nous ont fait confiance
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2.5rem"
          }}>
            {[
              {
                quote: "Une invitation qui a bluffé tous nos invités. Le niveau de détail et les animations sont incroyables.",
                author: "Sophie & Lucas Moreau",
                date: "Juillet 2024"
              },
              {
                quote: "Eventia a su capturer l'essence de notre histoire d'amour. Le résultat dépasse nos espérances.",
                author: "Camille & Thomas Dubois",
                date: "Juin 2024"
              },
              {
                quote: "Un service impeccable, une équipe à l'écoute et un résultat qui nous ressemble vraiment.",
                author: "Léa & Alexandre Martin",
                date: "Mai 2024"
              }
            ].map((testimonial, i) => (
              <div key={i} style={{
                padding: "3rem 2.5rem",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(201, 169, 110, 0.2)"
              }}>
                <div style={{
                  color: "#C9A96E",
                  marginBottom: "1.5rem",
                  fontSize: "1.5rem"
                }}>
                  ★★★★★
                </div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.25rem",
                  lineHeight: 1.7,
                  color: "#C9A96E",
                  fontStyle: "italic",
                  marginBottom: "2rem"
                }}>
                  "{testimonial.quote}"
                </p>
                <div style={{
                  fontSize: "0.875rem",
                  color: "#9B8B7E"
                }}>
                  <div style={{ marginBottom: "0.25rem" }}>{testimonial.author}</div>
                  <div style={{ fontSize: "0.75rem" }}>{testimonial.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{
        backgroundColor: "#1A1410",
        padding: "7rem 2rem"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: "4rem"
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
              Trouvez votre formule idéale
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
              padding: "3rem 2.5rem",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(201, 169, 110, 0.2)"
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
                color: "#C9A96E",
                marginBottom: "0.5rem"
              }}>
                290€
              </div>
              <div style={{
                fontSize: "0.875rem",
                color: "#9B8B7E",
                marginBottom: "2.5rem",
                paddingBottom: "2.5rem",
                borderBottom: "1px solid rgba(201, 169, 110, 0.15)"
              }}>
                L'essentiel pour annoncer votre jour J
              </div>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.9375rem",
                lineHeight: 2,
                color: "#9B8B7E"
              }}>
                <li>✓ Page d'invitation personnalisée</li>
                <li>✓ RSVP en ligne</li>
                <li>✓ Carte interactive</li>
                <li>✓ Galerie photos (20)</li>
                <li>✓ Support par email</li>
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
                Choisir
              </button>
            </div>

            {/* Plan 2 - Featured */}
            <div style={{
              padding: "3rem 2.5rem",
              backgroundColor: "#C9A96E",
              border: "1px solid #C9A96E",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                top: "-1px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#1A1410",
                padding: "0.5rem 1.5rem",
                fontSize: "0.5rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C9A96E"
              }}>
                Populaire
              </div>
              <div style={{
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#1A1410",
                marginBottom: "1rem",
                opacity: 0.7
              }}>
                Signature
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "3.5rem",
                color: "#1A1410",
                marginBottom: "0.5rem"
              }}>
                650€
              </div>
              <div style={{
                fontSize: "0.875rem",
                color: "#1A1410",
                marginBottom: "2.5rem",
                paddingBottom: "2.5rem",
                borderBottom: "1px solid rgba(26, 20, 16, 0.2)",
                opacity: 0.8
              }}>
                L'expérience complète Eventia
              </div>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.9375rem",
                lineHeight: 2,
                color: "#1A1410",
                opacity: 0.85
              }}>
                <li>✓ Site complet multi-pages</li>
                <li>✓ Animations cinématiques</li>
                <li>✓ RSVP + gestion menus</li>
                <li>✓ Galerie illimitée</li>
                <li>✓ Timeline interactive</li>
                <li>✓ Liste de mariage intégrée</li>
                <li>✓ Support prioritaire</li>
              </ul>
              <button style={{
                marginTop: "2.5rem",
                width: "100%",
                padding: "1rem",
                backgroundColor: "#1A1410",
                border: "none",
                color: "#C9A96E",
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer"
              }}>
                Choisir
              </button>
            </div>

            {/* Plan 3 */}
            <div style={{
              padding: "3rem 2.5rem",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(201, 169, 110, 0.2)"
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
                color: "#C9A96E",
                marginBottom: "0.5rem"
              }}>
                950€
              </div>
              <div style={{
                fontSize: "0.875rem",
                color: "#9B8B7E",
                marginBottom: "2.5rem",
                paddingBottom: "2.5rem",
                borderBottom: "1px solid rgba(201, 169, 110, 0.15)"
              }}>
                Le sur-mesure absolu
              </div>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.9375rem",
                lineHeight: 2,
                color: "#9B8B7E"
              }}>
                <li>✓ Tout de Signature</li>
                <li>✓ Design 100% sur-mesure</li>
                <li>✓ Développement Three.js custom</li>
                <li>✓ Vidéo d'intro cinématique</li>
                <li>✓ Intégrations API avancées</li>
                <li>✓ Nom de domaine personnalisé</li>
                <li>✓ Accompagnement dédié</li>
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
                Choisir
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#2A221F",
        padding: "4rem 2rem 2rem",
        borderTop: "1px solid rgba(201, 169, 110, 0.15)"
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
                fontStyle: "italic",
                color: "#C9A96E",
                marginBottom: "1rem"
              }}>
                eventia
              </div>
              <p style={{
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "#9B8B7E"
              }}>
                L'atelier parisien d'invitations digitales qui révolutionne le mariage.
              </p>
            </div>
            <div>
              <h4 style={{
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                color: "#C9A96E"
              }}>
                Produit
              </h4>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.875rem",
                lineHeight: 2.2,
                color: "#9B8B7E"
              }}>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Nos créations</a></li>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Tarifs</a></li>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                color: "#C9A96E"
              }}>
                Société
              </h4>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.875rem",
                lineHeight: 2.2,
                color: "#9B8B7E"
              }}>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>À propos</a></li>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Contact</a></li>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Mentions légales</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                color: "#C9A96E"
              }}>
                Suivez-nous
              </h4>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.875rem",
                lineHeight: 2.2,
                color: "#9B8B7E"
              }}>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Instagram</a></li>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Pinterest</a></li>
                <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div style={{
            paddingTop: "2rem",
            borderTop: "1px solid rgba(201, 169, 110, 0.15)",
            textAlign: "center",
            fontSize: "0.75rem",
            color: "#9B8B7E",
            letterSpacing: "0.05em"
          }}>
            Made with love in Paris ✦ © 2024 Eventia. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
