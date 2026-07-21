import React, { useState } from 'react';

export default function ScrollElegant() {
  const [expandedSection, setExpandedSection] = useState(1);

  const sections = [
    {
      id: 1,
      title: 'Identité & message de bienvenue',
      icon: '✦',
      preview: 'Sophie & Lucas Moreau · 12 Juillet 2026',
      fields: [
        { label: 'Vos noms', type: 'text', placeholder: 'Sophie & Lucas Moreau', value: 'Sophie & Lucas Moreau' },
        { label: 'Sous-titre', type: 'text', placeholder: 'Ex: Nous nous marions', value: 'Célébrons ensemble notre union' },
        { label: 'Message de bienvenue', type: 'textarea', placeholder: 'Un mot pour vos invités...', value: 'Chers amis, chère famille,\n\nC'est avec une joie immense que nous vous invitons à partager ce jour si spécial à nos côtés. Votre présence sera le plus beau des cadeaux.' },
        { label: 'Notre histoire', type: 'textarea', placeholder: 'Optionnel', value: '' },
      ],
    },
    {
      id: 2,
      title: 'Programme de la journée',
      icon: '✦',
      preview: '3 moments · Cérémonie civile, Vin d'honneur, Dîner',
      fields: [],
    },
    {
      id: 3,
      title: 'Vos lieux',
      icon: '✦',
      preview: 'Château de la Marquise, Provence',
      fields: [],
    },
    {
      id: 4,
      title: 'Code vestimentaire',
      icon: '✦',
      preview: 'Non renseigné',
      fields: [],
    },
    {
      id: 5,
      title: 'Cadeaux & voyage de noces',
      icon: '✦',
      preview: 'Non renseigné',
      fields: [],
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F9F6F1',
      fontFamily: 'Jost, sans-serif',
      color: '#2A221F'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#2A221F',
        padding: '32px 48px',
        borderBottom: '2px solid #C9A96E'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#C9A96E',
            marginBottom: '8px',
            fontWeight: 600
          }}>
            ✦ Configurateur
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '38px',
              fontWeight: 500,
              color: '#F9F6F1',
              margin: 0,
              letterSpacing: '-0.3px'
            }}>
              Sophie & Lucas Moreau
            </h1>
            <div style={{
              backgroundColor: 'rgba(201,169,110,0.2)',
              color: '#C9A96E',
              padding: '8px 18px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.5px',
              border: '1px solid rgba(201,169,110,0.3)'
            }}>
              En attente de vos informations
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '56px 48px 80px'
      }}>
        {/* Intro */}
        <div style={{
          marginBottom: '48px',
          paddingBottom: '32px',
          borderBottom: '1px solid rgba(201,169,110,0.25)'
        }}>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '22px',
            fontStyle: 'italic',
            color: '#6B5B4E',
            lineHeight: '1.7',
            margin: 0,
            fontWeight: 400
          }}>
            Remplissez chaque section avec vos informations personnelles. Nous créerons votre faire-part sur mesure et vous enverrons une preview pour validation. Vous pouvez revenir modifier à tout moment.
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {sections.map((section) => (
            <div
              key={section.id}
              style={{
                backgroundColor: expandedSection === section.id ? 'rgba(201,169,110,0.08)' : '#FFFFFF',
                border: expandedSection === section.id ? '2px solid #C9A96E' : '1px solid rgba(201,169,110,0.2)',
                borderRadius: '12px',
                padding: expandedSection === section.id ? '32px' : '24px 28px',
                cursor: expandedSection === section.id ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: expandedSection === section.id ? '0 4px 16px rgba(201,169,110,0.12)' : 'none'
              }}
              onClick={() => expandedSection !== section.id && setExpandedSection(section.id)}
            >
              {/* Section Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: expandedSection === section.id ? '28px' : 0
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    fontSize: '20px',
                    color: expandedSection === section.id ? '#C9A96E' : '#9B8B7E'
                  }}>
                    {section.icon}
                  </span>
                  <h2 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: expandedSection === section.id ? '28px' : '24px',
                    fontWeight: 500,
                    color: expandedSection === section.id ? '#2A221F' : '#6B5B4E',
                    margin: 0,
                    transition: 'all 0.2s ease'
                  }}>
                    {section.title}
                  </h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {expandedSection !== section.id && (
                    <span style={{
                      fontSize: '14px',
                      color: '#9B8B7E',
                      fontStyle: 'italic'
                    }}>
                      {section.preview}
                    </span>
                  )}
                  {expandedSection !== section.id && (
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(201,169,110,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#C9A96E',
                      fontSize: '18px'
                    }}>
                      +
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Form */}
              {expandedSection === section.id && section.fields.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {section.fields.map((field, index) => (
                    <div key={index}>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        color: '#6B5B4E',
                        marginBottom: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: 600
                      }}>
                        {field.label}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          defaultValue={field.value}
                          placeholder={field.placeholder}
                          rows={field.label === 'Message de bienvenue' ? 5 : 3}
                          style={{
                            width: '100%',
                            padding: '14px 18px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid rgba(201,169,110,0.3)',
                            borderRadius: '8px',
                            color: '#2A221F',
                            fontSize: '15px',
                            fontFamily: 'Jost, sans-serif',
                            outline: 'none',
                            resize: 'vertical',
                            lineHeight: '1.6',
                            transition: 'border-color 0.2s ease'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#C9A96E';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.1)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      ) : (
                        <input
                          type={field.type}
                          defaultValue={field.value}
                          placeholder={field.placeholder}
                          style={{
                            width: '100%',
                            padding: '14px 18px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid rgba(201,169,110,0.3)',
                            borderRadius: '8px',
                            color: '#2A221F',
                            fontSize: '15px',
                            fontFamily: 'Jost, sans-serif',
                            outline: 'none',
                            transition: 'border-color 0.2s ease'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#C9A96E';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.1)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {expandedSection === section.id && section.fields.length === 0 && (
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#9B8B7E',
                  fontStyle: 'italic'
                }}>
                  Contenu à venir dans cette section
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{
          marginTop: '56px',
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          paddingTop: '40px',
          borderTop: '1px solid rgba(201,169,110,0.25)'
        }}>
          <button style={{
            padding: '16px 40px',
            backgroundColor: 'transparent',
            border: '2px solid rgba(201,169,110,0.4)',
            borderRadius: '8px',
            color: '#6B5B4E',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'Jost, sans-serif',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(201,169,110,0.08)';
            e.currentTarget.style.borderColor = '#C9A96E';
            e.currentTarget.style.color = '#2A221F';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)';
            e.currentTarget.style.color = '#6B5B4E';
          }}
          >
            Enregistrer le brouillon
          </button>
          <button style={{
            padding: '16px 48px',
            backgroundColor: '#2A221F',
            border: 'none',
            borderRadius: '8px',
            color: '#F9F6F1',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Jost, sans-serif',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(42,34,31,0.15)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#3A3230';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(42,34,31,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2A221F';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(42,34,31,0.15)';
          }}
          >
            Envoyer à Eventia
          </button>
        </div>

        {/* Footer Note */}
        <div style={{
          marginTop: '40px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <span style={{ color: '#C9A96E', fontSize: '16px' }}>✦</span>
          <p style={{
            fontSize: '14px',
            color: '#9B8B7E',
            margin: 0,
            fontStyle: 'italic'
          }}>
            Vous pouvez revenir modifier à tout moment
          </p>
        </div>
      </div>
    </div>
  );
}
