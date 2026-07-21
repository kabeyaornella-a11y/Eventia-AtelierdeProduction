import React, { useState, useEffect } from 'react';

export default function CompteARebours() {
  const targetDate = new Date('2026-07-12T16:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0D0A08',
      fontFamily: "'Jost', sans-serif",
      color: '#F5F1EB'
    }}>
      {/* Hero section with background image */}
      <div style={{
        height: '60vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background image */}
        <img 
          src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1280&q=80"
          alt="Château"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(13,10,8,0.85) 0%, rgba(13,10,8,0.75) 50%, #0D0A08 100%)'
        }} />

        {/* Hero content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '0 2rem'
        }}>
          <div style={{
            fontSize: '0.625rem',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: '1.5rem',
            fontWeight: 400
          }}>
            Save the Date
          </div>
          
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#FFFFFF',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '0.02em'
          }}>
            Sophie & Lucas Moreau
          </h1>
        </div>
      </div>

      {/* Countdown section */}
      <div style={{
        padding: 'clamp(3rem, 8vh, 6rem) 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3rem'
      }}>
        {/* Timer blocks */}
        <div style={{
          display: 'flex',
          gap: 'clamp(1rem, 3vw, 2rem)',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Days */}
          <div style={{
            backgroundColor: '#1A1410',
            border: '1px solid rgba(201,169,110,0.3)',
            borderRadius: '4px',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            minWidth: 'clamp(100px, 15vw, 140px)',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(3.5rem, 8vw, 5rem)',
              fontWeight: 700,
              color: '#C9A96E',
              lineHeight: 1,
              marginBottom: '0.5rem'
            }}>
              {String(timeLeft.days).padStart(3, '0')}
            </div>
            <div style={{
              fontSize: '0.625rem',
              letterSpacing: '0.2em',
              color: 'rgba(249,246,241,0.5)',
              textTransform: 'uppercase'
            }}>
              Jours
            </div>
          </div>

          {/* Separator */}
          <div style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#C9A96E',
            fontWeight: 300,
            opacity: 0.6
          }}>:</div>

          {/* Hours */}
          <div style={{
            backgroundColor: '#1A1410',
            border: '1px solid rgba(201,169,110,0.3)',
            borderRadius: '4px',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            minWidth: 'clamp(100px, 15vw, 140px)',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(3.5rem, 8vw, 5rem)',
              fontWeight: 700,
              color: '#C9A96E',
              lineHeight: 1,
              marginBottom: '0.5rem'
            }}>
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div style={{
              fontSize: '0.625rem',
              letterSpacing: '0.2em',
              color: 'rgba(249,246,241,0.5)',
              textTransform: 'uppercase'
            }}>
              Heures
            </div>
          </div>

          {/* Separator */}
          <div style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#C9A96E',
            fontWeight: 300,
            opacity: 0.6
          }}>:</div>

          {/* Minutes */}
          <div style={{
            backgroundColor: '#1A1410',
            border: '1px solid rgba(201,169,110,0.3)',
            borderRadius: '4px',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            minWidth: 'clamp(100px, 15vw, 140px)',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(3.5rem, 8vw, 5rem)',
              fontWeight: 700,
              color: '#C9A96E',
              lineHeight: 1,
              marginBottom: '0.5rem'
            }}>
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div style={{
              fontSize: '0.625rem',
              letterSpacing: '0.2em',
              color: 'rgba(249,246,241,0.5)',
              textTransform: 'uppercase'
            }}>
              Minutes
            </div>
          </div>

          {/* Separator */}
          <div style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#C9A96E',
            fontWeight: 300,
            opacity: 0.6
          }}>:</div>

          {/* Seconds */}
          <div style={{
            backgroundColor: '#1A1410',
            border: '1px solid rgba(201,169,110,0.3)',
            borderRadius: '4px',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            minWidth: 'clamp(100px, 15vw, 140px)',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(3.5rem, 8vw, 5rem)',
              fontWeight: 700,
              color: '#C9A96E',
              lineHeight: 1,
              marginBottom: '0.5rem'
            }}>
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div style={{
              fontSize: '0.625rem',
              letterSpacing: '0.2em',
              color: 'rgba(249,246,241,0.5)',
              textTransform: 'uppercase'
            }}>
              Secondes
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          color: '#EDE8E0',
          textAlign: 'center',
          fontStyle: 'italic',
          fontWeight: 300
        }}>
          Jusqu'au 12 Juillet 2026
        </div>

        {/* Details */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.875rem',
          color: '#9B8B7E',
          letterSpacing: '0.05em'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Château de la Marquise
          </div>
          <div style={{
            width: '1px',
            height: '16px',
            background: 'rgba(201,169,110,0.3)'
          }} />
          <div>Provence</div>
        </div>

        {/* CTA */}
        <button style={{
          marginTop: '2rem',
          fontFamily: "'Jost', sans-serif",
          padding: '1rem 3rem',
          border: '1px solid #C9A96E',
          background: 'transparent',
          color: '#C9A96E',
          fontSize: '0.875rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          borderRadius: '2px',
          fontWeight: 500
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(201,169,110,0.1)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,169,110,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          Ajouter à mon calendrier
        </button>

        {/* Footer */}
        <div style={{
          marginTop: '4rem',
          fontSize: '0.75rem',
          color: 'rgba(155,139,126,0.6)',
          letterSpacing: '0.05em',
          textAlign: 'center'
        }}>
          Invitation officielle à venir · eventia.app
        </div>
      </div>
    </div>
  );
}
