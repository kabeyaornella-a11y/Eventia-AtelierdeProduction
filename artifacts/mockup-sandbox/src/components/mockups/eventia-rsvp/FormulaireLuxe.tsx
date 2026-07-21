import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';

export default function FormulaireLuxe() {
  const [response, setResponse] = useState<string | null>(null);
  const [needShuttle, setNeedShuttle] = useState(false);

  return (
    <div 
      className="min-h-screen flex flex-col font-sans" 
      style={{ backgroundColor: '#2A221F', color: '#F5F1EB', fontFamily: "'Jost', sans-serif" }}
    >
      {/* Header */}
      <header 
        className="w-full flex flex-col items-center justify-center py-6"
        style={{ backgroundColor: '#1A1410' }}
      >
        <div className="text-xl tracking-[0.3em] uppercase mb-4" style={{ color: '#C9A96E' }}>
          Eventia
        </div>
        <div className="w-16 h-px" style={{ backgroundColor: '#C9A96E' }}></div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-[520px] mx-auto px-4 py-12 flex flex-col gap-8">
        
        {/* Invitation Card */}
        <div 
          className="rounded-sm flex flex-col items-center text-center p-8"
          style={{ 
            backgroundColor: '#F9F6F1', 
            borderTop: '3px solid #C9A96E',
            color: '#2A221F'
          }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: '#6B5B4E' }}>
            Vous êtes invité(e) au mariage de
          </span>
          <h1 
            className="text-4xl md:text-5xl mb-4" 
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}
          >
            Sophie & Lucas<br />Moreau
          </h1>
          <p className="text-sm tracking-wide" style={{ color: '#6B5B4E' }}>
            12 Juillet 2026 · Château de la Marquise, Provence
          </p>
        </div>

        {/* Form */}
        <div 
          className="rounded-sm p-6 md:p-8 flex flex-col gap-8"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.04)', 
            border: '1px solid rgba(201,169,110,0.2)' 
          }}
        >
          {/* Name Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm tracking-wide" style={{ color: '#C9A96E' }}>
              Votre prénom et nom
            </label>
            <input 
              type="text" 
              placeholder="Ex: Marie Dubois"
              className="w-full bg-transparent outline-none pb-2 transition-colors placeholder-[#9B8B7E]"
              style={{ borderBottom: '1px solid #C9A96E', color: '#F5F1EB' }}
            />
          </div>

          {/* Response Selection */}
          <div className="flex flex-col gap-3">
            <label className="text-sm tracking-wide mb-1" style={{ color: '#C9A96E' }}>
              Votre présence
            </label>
            
            <button 
              onClick={() => setResponse('yes')}
              className={`w-full text-left p-4 rounded-sm border transition-all flex items-center justify-between ${response === 'yes' ? 'border-[#22C55E]' : 'border-white/10 hover:border-white/30'}`}
              style={{ backgroundColor: response === 'yes' ? 'rgba(34, 197, 94, 0.1)' : 'transparent' }}
            >
              <span style={{ color: response === 'yes' ? '#22C55E' : '#F5F1EB' }}>Oui, avec joie !</span>
              {response === 'yes' && <Check size={18} color="#22C55E" />}
            </button>

            <button 
              onClick={() => setResponse('no')}
              className={`w-full text-left p-4 rounded-sm border transition-all flex items-center justify-between ${response === 'no' ? 'border-[#EF4444]' : 'border-white/10 hover:border-white/30'}`}
              style={{ backgroundColor: response === 'no' ? 'rgba(239, 68, 68, 0.1)' : 'transparent' }}
            >
              <span style={{ color: response === 'no' ? '#EF4444' : '#F5F1EB' }}>Je ne pourrai pas</span>
              {response === 'no' && <Check size={18} color="#EF4444" />}
            </button>

            <button 
              onClick={() => setResponse('maybe')}
              className={`w-full text-left p-4 rounded-sm border transition-all flex items-center justify-between ${response === 'maybe' ? 'border-[#F59E0B]' : 'border-white/10 hover:border-white/30'}`}
              style={{ backgroundColor: response === 'maybe' ? 'rgba(245, 158, 11, 0.1)' : 'transparent' }}
            >
              <span style={{ color: response === 'maybe' ? '#F59E0B' : '#F5F1EB' }}>Peut-être</span>
              {response === 'maybe' && <Check size={18} color="#F59E0B" />}
            </button>
          </div>

          {/* Accompanying */}
          <div className="flex flex-col gap-2 border-t border-white/10 pt-6">
            <label className="text-sm tracking-wide" style={{ color: '#C9A96E' }}>
              Accompagnants
            </label>
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-sm border border-[#C9A96E] hover:bg-[#C9A96E]/10 transition-colors text-sm uppercase tracking-wider" style={{ color: '#C9A96E' }}>
              <Plus size={16} /> Ajouter un accompagnant
            </button>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6 border-t border-white/10 pt-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm tracking-wide" style={{ color: '#C9A96E' }}>
                Allergies & Régimes
              </label>
              <textarea 
                rows={2}
                placeholder="Régimes alimentaires, allergies..."
                className="w-full bg-transparent border border-white/20 rounded-sm p-3 outline-none focus:border-[#C9A96E] transition-colors placeholder-[#9B8B7E] resize-none"
                style={{ color: '#F5F1EB' }}
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div 
                className="w-5 h-5 flex items-center justify-center border transition-colors"
                style={{ 
                  borderColor: needShuttle ? '#C9A96E' : 'rgba(255,255,255,0.3)',
                  backgroundColor: needShuttle ? '#C9A96E' : 'transparent'
                }}
                onClick={() => setNeedShuttle(!needShuttle)}
              >
                {needShuttle && <Check size={14} color="#2A221F" />}
              </div>
              <span className="text-sm tracking-wide group-hover:text-white transition-colors" style={{ color: '#F5F1EB' }}>
                J'ai besoin d'une navette pour le retour
              </span>
            </label>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm tracking-wide" style={{ color: '#C9A96E' }}>
                Message aux mariés
              </label>
              <textarea 
                rows={3}
                placeholder="Un mot pour les mariés (optionnel)"
                className="w-full bg-transparent border border-white/20 rounded-sm p-3 outline-none focus:border-[#C9A96E] transition-colors placeholder-[#9B8B7E] resize-none"
                style={{ color: '#F5F1EB' }}
              />
            </div>
          </div>

          {/* Submit */}
          <button 
            className="w-full py-4 mt-2 rounded-sm text-sm uppercase tracking-widest font-medium transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: '#C9A96E', color: '#2A221F' }}
          >
            Envoyer ma réponse
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs tracking-widest uppercase mt-4" style={{ color: '#9B8B7E' }}>
          Merci de répondre avant le 1er juin 2026
        </footer>
      </main>
    </div>
  );
}
