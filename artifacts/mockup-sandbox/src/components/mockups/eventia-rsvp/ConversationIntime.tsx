import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export default function ConversationIntime() {
  const [response, setResponse] = useState<string | null>(null);
  const [guests, setGuests] = useState(1);

  return (
    <div 
      className="min-h-screen flex flex-col font-sans relative overflow-hidden" 
      style={{ backgroundColor: '#F9F6F1', color: '#2A221F', fontFamily: "'Jost', sans-serif" }}
    >
      {/* Subtle Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#2A221F 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      ></div>

      <div className="relative z-10 max-w-[640px] mx-auto w-full px-6 py-12 md:py-20 flex flex-col">
        {/* Header Letter */}
        <header className="flex flex-col items-center mb-16">
          <div className="text-sm tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A96E' }}>
            Eventia
          </div>
          <div className="text-xs tracking-widest uppercase mb-6" style={{ color: '#9B8B7E' }}>
            12 Juillet 2026
          </div>
          <div className="w-12 h-px" style={{ backgroundColor: '#C9A96E' }}></div>
        </header>

        {/* Greeting */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-2xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Cher(e) invité(e),
          </h2>
          <p 
            className="text-2xl md:text-3xl leading-relaxed italic" 
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#6B5B4E' }}
          >
            "Nous avons hâte de vous voir le 12 juillet pour célébrer cette journée inoubliable au Château de la Marquise."
          </p>
        </div>

        {/* Conversational Form */}
        <div className="flex flex-col gap-12">
          
          {/* Q1 */}
          <div className="flex flex-col gap-4 border-b border-[#EDE8E0] pb-10">
            <label className="text-lg md:text-xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}>
              Comment vous appelez-vous ?
            </label>
            <input 
              type="text" 
              placeholder="Votre prénom et nom"
              className="w-full bg-transparent outline-none text-xl md:text-2xl py-2 placeholder-[#9B8B7E] transition-colors focus:border-[#2A221F]"
              style={{ borderBottom: '1px solid #C9A96E', fontFamily: "'Cormorant Garamond', serif" }}
            />
          </div>

          {/* Q2 */}
          <div className="flex flex-col gap-6 border-b border-[#EDE8E0] pb-10">
            <label className="text-lg md:text-xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}>
              Serez-vous des nôtres ce jour-là ?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => setResponse('yes')}
                className="py-5 px-6 rounded-sm text-sm uppercase tracking-widest transition-all"
                style={{ 
                  backgroundColor: response === 'yes' ? '#2A221F' : 'transparent',
                  color: response === 'yes' ? '#F9F6F1' : '#2A221F',
                  border: `1px solid ${response === 'yes' ? '#2A221F' : '#2A221F'}`
                }}
              >
                OUI, avec joie !
              </button>
              <button 
                onClick={() => setResponse('no')}
                className="py-5 px-6 rounded-sm text-sm uppercase tracking-widest transition-all"
                style={{ 
                  backgroundColor: response === 'no' ? '#EDE8E0' : 'transparent',
                  color: '#2A221F',
                  border: `1px solid ${response === 'no' ? '#EDE8E0' : '#EDE8E0'}`
                }}
              >
                Je ne pourrai pas
              </button>
            </div>
          </div>

          {/* Q3 */}
          <div className="flex flex-col gap-6 border-b border-[#EDE8E0] pb-10">
            <label className="text-lg md:text-xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}>
              Viendrez-vous accompagné(e) ?
            </label>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => guests > 0 && setGuests(guests - 1)}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-[#EDE8E0] hover:border-[#C9A96E] transition-colors"
                style={{ color: '#2A221F' }}
              >
                <Minus size={18} />
              </button>
              <span className="text-3xl w-8 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {guests}
              </span>
              <button 
                onClick={() => setGuests(guests + 1)}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-[#EDE8E0] hover:border-[#C9A96E] transition-colors"
                style={{ color: '#2A221F' }}
              >
                <Plus size={18} />
              </button>
              <span className="text-sm uppercase tracking-widest ml-2" style={{ color: '#9B8B7E' }}>
                Personne(s)
              </span>
            </div>
          </div>

          {/* Q4 */}
          <div className="flex flex-col gap-4 border-b border-[#EDE8E0] pb-10">
            <label className="text-lg md:text-xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}>
              Des allergies ou régimes à nous signaler ?
            </label>
            <textarea 
              rows={2}
              placeholder="Végétarien, sans gluten, allergies..."
              className="w-full bg-transparent border-none outline-none text-xl md:text-2xl py-2 placeholder-[#9B8B7E] resize-none leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif", borderBottom: '1px solid #C9A96E', backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, #EDE8E0 39px, #EDE8E0 40px)', lineHeight: '40px' }}
            />
          </div>

          {/* Q5 */}
          <div className="flex flex-col gap-4 mb-8">
            <label className="text-lg md:text-xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}>
              Un mot pour nous ?
            </label>
            <textarea 
              rows={3}
              placeholder="Une pensée, une blague, une chanson à passer..."
              className="w-full bg-transparent border-none outline-none text-xl md:text-2xl py-2 placeholder-[#9B8B7E] resize-none leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif", borderBottom: '1px solid #C9A96E', backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, #EDE8E0 39px, #EDE8E0 40px)', lineHeight: '40px' }}
            />
          </div>
          
        </div>

        {/* Signature */}
        <div className="mt-8 flex flex-col items-center">
          <button 
            className="w-full md:w-auto md:min-w-[320px] py-5 px-10 mb-8 rounded-sm text-sm uppercase tracking-widest transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: '#2A221F', color: '#F9F6F1' }}
          >
            Envoyer ma réponse
          </button>
          
          <p className="text-sm italic text-center" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#6B5B4E' }}>
            Sophie & Lucas vous lisent personnellement chaque message ✦
          </p>
        </div>

      </div>
    </div>
  );
}
