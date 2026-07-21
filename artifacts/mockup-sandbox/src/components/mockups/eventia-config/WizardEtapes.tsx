import React, { useState } from 'react';

export default function WizardEtapes() {
  const [activeStep, setActiveStep] = useState(3);
  const [expandedLocation, setExpandedLocation] = useState(1);

  const steps = [
    { id: 1, name: 'Identité', completed: true },
    { id: 2, name: 'Programme', completed: true },
    { id: 3, name: 'Vos lieux', completed: false },
    { id: 4, name: 'Code vestimentaire', completed: false },
    { id: 5, name: 'Cadeaux', completed: false },
    { id: 6, name: 'Hébergement', completed: false },
    { id: 7, name: 'RSVP', completed: false },
    { id: 8, name: 'Validation', completed: false },
  ];

  const locations = [
    {
      id: 1,
      title: 'Cérémonie civile',
      fields: {
        name: 'Mairie de Gordes',
        address: 'Place du Château',
        city: 'Gordes, 84220',
        maps: 'https://maps.google.com/?q=Mairie+Gordes',
        time: '14h30',
      },
    },
    {
      id: 2,
      title: 'Cérémonie religieuse',
      fields: {
        name: '',
        address: '',
        city: '',
        maps: '',
        time: '',
      },
    },
    {
      id: 3,
      title: 'Réception',
      fields: {
        name: '',
        address: '',
        city: '',
        maps: '',
        time: '',
      },
    },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1A1610',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Jost, sans-serif',
      color: '#F5F1EB'
    }}>
      {/* Progress Bar Top */}
      <div style={{
        height: '3px',
        backgroundColor: 'rgba(201,169,110,0.15)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: '37.5%',
          backgroundColor: '#C9A96E',
          transition: 'width 0.4s ease'
        }} />
      </div>

      {/* Header */}
      <div style={{
        padding: '24px 40px',
        borderBottom: '1px solid rgba(201,169,110,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '28px',
            fontWeight: 600,
            color: '#F5F1EB',
            margin: 0
          }}>
            Configurateur · Sophie & Lucas Moreau
          </h1>
        </div>
        <div style={{
          backgroundColor: 'rgba(201,169,110,0.15)',
          color: '#C9A96E',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.3px'
        }}>
          Étape {activeStep} / {steps.length}
        </div>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <div style={{
          width: '280px',
          backgroundColor: '#2A221F',
          borderRight: '1px solid rgba(201,169,110,0.2)',
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: '#9B8B7E',
              marginBottom: '24px',
              fontWeight: 600
            }}>
              Progression
            </div>
            
            {/* Steps List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    backgroundColor: step.id === activeStep ? 'rgba(201,169,110,0.12)' : 'transparent',
                    border: step.id === activeStep ? '1px solid #C9A96E' : '1px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: step.completed ? '#C9A96E' : step.id === activeStep ? 'rgba(201,169,110,0.2)' : 'rgba(155,139,126,0.1)',
                    border: step.id === activeStep && !step.completed ? '2px solid #C9A96E' : 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: step.completed ? '#1A1610' : step.id === activeStep ? '#C9A96E' : '#9B8B7E',
                    flexShrink: 0
                  }}>
                    {step.completed ? '✓' : step.id}
                  </div>
                  <span style={{
                    fontSize: '15px',
                    fontWeight: step.id === activeStep ? 500 : 400,
                    color: step.completed ? '#C9A96E' : step.id === activeStep ? '#F5F1EB' : '#9B8B7E'
                  }}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Vertical Progress Bar */}
            <div style={{
              marginTop: '32px',
              height: '4px',
              backgroundColor: 'rgba(201,169,110,0.15)',
              borderRadius: '2px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: '37.5%',
                backgroundColor: '#C9A96E',
                borderRadius: '2px',
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>

          {/* Save Button */}
          <button style={{
            width: '100%',
            padding: '14px',
            backgroundColor: 'rgba(201,169,110,0.1)',
            border: '1px solid rgba(201,169,110,0.3)',
            borderRadius: '8px',
            color: '#C9A96E',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'Jost, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(201,169,110,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(201,169,110,0.1)';
          }}
          >
            Enregistrer
          </button>
        </div>

        {/* Main Content */}
        <div style={{
          flex: 1,
          backgroundColor: '#1E1814',
          padding: '48px 56px',
          overflowY: 'auto'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Section Title */}
            <div style={{ marginBottom: '12px' }}>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '42px',
                fontWeight: 500,
                color: '#C9A96E',
                margin: 0,
                letterSpacing: '-0.5px'
              }}>
                Vos lieux
              </h2>
            </div>
            <p style={{
              fontSize: '16px',
              color: '#9B8B7E',
              lineHeight: '1.6',
              marginBottom: '48px',
              fontWeight: 400
            }}>
              Indiquez où aura lieu chaque moment de votre journée. Vos invités recevront ces informations avec les indications GPS.
            </p>

            {/* Location Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {locations.map((location) => (
                <div
                  key={location.id}
                  style={{
                    backgroundColor: expandedLocation === location.id ? '#2A221F' : 'rgba(42,34,31,0.5)',
                    border: expandedLocation === location.id ? '1px solid #C9A96E' : '1px solid rgba(201,169,110,0.2)',
                    borderRadius: '12px',
                    padding: expandedLocation === location.id ? '28px' : '20px 28px',
                    cursor: expandedLocation === location.id ? 'default' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => expandedLocation !== location.id && setExpandedLocation(location.id)}
                >
                  {/* Card Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: expandedLocation === location.id ? '24px' : 0
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: expandedLocation === location.id ? '#C9A96E' : '#6B5B4E'
                      }} />
                      <h3 style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '24px',
                        fontWeight: 500,
                        color: expandedLocation === location.id ? '#F5F1EB' : '#9B8B7E',
                        margin: 0
                      }}>
                        {location.title}
                      </h3>
                    </div>
                    {expandedLocation !== location.id && location.fields.name && (
                      <span style={{ fontSize: '14px', color: '#9B8B7E' }}>
                        {location.fields.name}
                      </span>
                    )}
                    {expandedLocation !== location.id && (
                      <span style={{ color: '#9B8B7E', fontSize: '20px' }}>+</span>
                    )}
                  </div>

                  {/* Expanded Form */}
                  {expandedLocation === location.id && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{
                          display: 'block',
                          fontSize: '13px',
                          color: '#9B8B7E',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: 500
                        }}>
                          Nom du lieu
                        </label>
                        <input
                          type="text"
                          defaultValue={location.fields.name}
                          placeholder="Ex: Château de la Marquise"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            border: '1px solid rgba(201,169,110,0.2)',
                            borderRadius: '6px',
                            color: '#F5F1EB',
                            fontSize: '15px',
                            fontFamily: 'Jost, sans-serif',
                            outline: 'none',
                            transition: 'border-color 0.2s ease'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#C9A96E'}
                          onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)'}
                        />
                      </div>

                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{
                          display: 'block',
                          fontSize: '13px',
                          color: '#9B8B7E',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: 500
                        }}>
                          Adresse
                        </label>
                        <input
                          type="text"
                          defaultValue={location.fields.address}
                          placeholder="Ex: Route des Châteaux"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            border: '1px solid rgba(201,169,110,0.2)',
                            borderRadius: '6px',
                            color: '#F5F1EB',
                            fontSize: '15px',
                            fontFamily: 'Jost, sans-serif',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#C9A96E'}
                          onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)'}
                        />
                      </div>

                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '13px',
                          color: '#9B8B7E',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: 500
                        }}>
                          Ville
                        </label>
                        <input
                          type="text"
                          defaultValue={location.fields.city}
                          placeholder="Ex: Gordes, 84220"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            border: '1px solid rgba(201,169,110,0.2)',
                            borderRadius: '6px',
                            color: '#F5F1EB',
                            fontSize: '15px',
                            fontFamily: 'Jost, sans-serif',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#C9A96E'}
                          onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)'}
                        />
                      </div>

                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '13px',
                          color: '#9B8B7E',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: 500
                        }}>
                          Heure d'arrivée
                        </label>
                        <input
                          type="text"
                          defaultValue={location.fields.time}
                          placeholder="Ex: 14h30"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            border: '1px solid rgba(201,169,110,0.2)',
                            borderRadius: '6px',
                            color: '#F5F1EB',
                            fontSize: '15px',
                            fontFamily: 'Jost, sans-serif',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#C9A96E'}
                          onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)'}
                        />
                      </div>

                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{
                          display: 'block',
                          fontSize: '13px',
                          color: '#9B8B7E',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: 500
                        }}>
                          Lien Google Maps
                        </label>
                        <input
                          type="text"
                          defaultValue={location.fields.maps}
                          placeholder="Ex: https://maps.google.com/?q=..."
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            border: '1px solid rgba(201,169,110,0.2)',
                            borderRadius: '6px',
                            color: '#F5F1EB',
                            fontSize: '15px',
                            fontFamily: 'Jost, sans-serif',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#C9A96E'}
                          onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)'}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Add Location Button */}
              <button style={{
                padding: '16px',
                backgroundColor: 'transparent',
                border: '1px dashed rgba(201,169,110,0.4)',
                borderRadius: '12px',
                color: '#C9A96E',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'Jost, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(201,169,110,0.05)';
                e.currentTarget.style.borderColor = '#C9A96E';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)';
              }}
              >
                <span style={{ fontSize: '20px', lineHeight: '1' }}>+</span>
                Ajouter un lieu
              </button>
            </div>

            {/* Navigation Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '56px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(201,169,110,0.15)'
            }}>
              <button style={{
                padding: '14px 32px',
                backgroundColor: 'transparent',
                border: '1px solid rgba(201,169,110,0.3)',
                borderRadius: '8px',
                color: '#C9A96E',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'Jost, sans-serif',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(201,169,110,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              >
                ← Précédent
              </button>
              <button style={{
                padding: '14px 40px',
                backgroundColor: '#C9A96E',
                border: 'none',
                borderRadius: '8px',
                color: '#1A1610',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Jost, sans-serif',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#D4B67F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#C9A96E';
              }}
              >
                Suivant →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
