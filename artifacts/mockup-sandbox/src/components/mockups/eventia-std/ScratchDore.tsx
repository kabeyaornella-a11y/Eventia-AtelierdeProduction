import React from 'react';

export default function ScratchDore() {
  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: '#1A1410',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: "'Jost', sans-serif",
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background subtle pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,169,110,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(201,169,110,0.02) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '600px' }}>
        
        {/* Intro text */}
        <div style={{
          color: '#C9A96E',
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '3rem',
          fontWeight: 400
        }}>
          S & L vous réservent une surprise
        </div>

        {/* Scratch card zone */}
        <div style={{
          position: 'relative',
          width: '480px',
          maxWidth: '100%',
          height: '320px',
          margin: '0 auto 3rem',
          background: 'linear-gradient(135deg, #1A1410 0%, #2A221F 100%)',
          borderRadius: '8px',
          border: '2px solid #C9A96E',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,169,110,0.3)',
          overflow: 'hidden'
        }}>
          {/* Corner ornaments */}
          <svg style={{ position: 'absolute', top: 8, left: 8, width: 24, height: 24 }} viewBox="0 0 24 24" fill="none">
            <path d="M0 0 L20 0 L0 20 Z" fill="#C9A96E" opacity="0.3" />
          </svg>
          <svg style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24 }} viewBox="0 0 24 24" fill="none">
            <path d="M24 0 L4 0 L24 20 Z" fill="#C9A96E" opacity="0.3" />
          </svg>
          <svg style={{ position: 'absolute', bottom: 8, left: 8, width: 24, height: 24 }} viewBox="0 0 24 24" fill="none">
            <path d="M0 24 L20 24 L0 4 Z" fill="#C9A96E" opacity="0.3" />
          </svg>
          <svg style={{ position: 'absolute', bottom: 8, right: 8, width: 24, height: 24 }} viewBox="0 0 24 24" fill="none">
            <path d="M24 24 L4 24 L24 4 Z" fill="#C9A96E" opacity="0.3" />
          </svg>

          {/* Scratch texture overlay (simulated scratched-off gold) */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 20% 30%, rgba(201,169,110,0.15) 0%, transparent 15%),
              radial-gradient(circle at 60% 50%, rgba(201,169,110,0.1) 0%, transparent 20%),
              radial-gradient(circle at 80% 70%, rgba(201,169,110,0.12) 0%, transparent 18%),
              radial-gradient(circle at 40% 80%, rgba(201,169,110,0.08) 0%, transparent 15%),
              radial-gradient(circle at 15% 65%, rgba(201,169,110,0.1) 0%, transparent 12%)
            `,
            pointerEvents: 'none',
            animation: 'shimmer 3s ease-in-out infinite'
          }} />

          {/* Revealed content */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            animation: 'reveal 1.5s ease-out'
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 700,
              color: '#C9A96E',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              textShadow: '0 2px 20px rgba(201,169,110,0.5)',
              animation: 'glow 2s ease-in-out infinite'
            }}>
              12 JUILLET 2026
            </div>
            
            <div style={{
              width: '60px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
              margin: '0.5rem 0'
            }} />
            
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              color: '#F9F6F1',
              fontWeight: 500,
              letterSpacing: '0.03em'
            }}>
              Château de la Marquise
            </div>
            
            <div style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.875rem',
              color: '#9B8B7E',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              Provence, France
            </div>
          </div>
        </div>

        {/* Message */}
        <div style={{
          color: '#EDE8E0',
          fontSize: '1rem',
          lineHeight: 1.6,
          marginBottom: '2.5rem',
          maxWidth: '420px',
          margin: '0 auto 2.5rem'
        }}>
          Réservez cette date — l'invitation officielle arrive bientôt.
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '4rem'
        }}>
          <button style={{
            fontFamily: "'Jost', sans-serif",
            padding: '0.875rem 2rem',
            border: '1px solid #C9A96E',
            background: 'transparent',
            color: '#C9A96E',
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            borderRadius: '2px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201,169,110,0.1)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            Ajouter au calendrier
          </button>
          
          <button style={{
            fontFamily: "'Jost', sans-serif",
            padding: '0.875rem 2rem',
            border: '1px solid rgba(249,246,241,0.3)',
            background: 'transparent',
            color: '#F9F6F1',
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            borderRadius: '2px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(249,246,241,0.05)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            Partager
          </button>
        </div>

        {/* Monogram */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(3rem, 6vw, 4.5rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: '#C9A96E',
          letterSpacing: '0.1em',
          opacity: 0.9
        }}>
          S ✦ L
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 2px 20px rgba(201,169,110,0.4); }
          50% { text-shadow: 0 2px 30px rgba(201,169,110,0.7), 0 0 40px rgba(201,169,110,0.3); }
        }
        
        @keyframes reveal {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
