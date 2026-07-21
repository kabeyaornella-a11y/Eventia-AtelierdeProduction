import React from 'react';
import { ArrowRight, User, Check, Clock, X } from 'lucide-react';

export default function StudioOpera() {
  const steps = [
    { num: "I.", label: "Briefing", status: "done" },
    { num: "II.", label: "Création", status: "active" },
    { num: "III.", label: "Votre avis", status: "pending" },
    { num: "IV.", label: "Prête", status: "pending" },
    { num: "V.", label: "Livrée", status: "pending" }
  ];

  const guests = [
    { name: "Antoine Dupont", count: "1 invité", status: "Confirmé", type: 'confirm' },
    { name: "Claire & Marc Lemaire", count: "2 invités", status: "En attente", type: 'pending' },
    { name: "Isabelle Martin", count: "1 invité", status: "Confirmé", type: 'confirm' },
    { name: "Thomas Bernard", count: "1 invité", status: "Décliné", type: 'decline' },
    { name: "Famille Dubois", count: "4 invités", status: "Confirmé", type: 'confirm' },
    { name: "Camille Rousseau", count: "1 invité", status: "En attente", type: 'pending' },
    { name: "Nicolas & Sarah Petit", count: "2 invités", status: "Confirmé", type: 'confirm' },
    { name: "Julien & Marie Richard", count: "2 invités", status: "En attente", type: 'pending' },
  ];

  return (
    <div className="min-h-screen text-[#2A221F] font-sans flex flex-col" style={{ backgroundColor: '#F9F6F1', fontFamily: 'Jost, sans-serif' }}>
      
      {/* Header Editorial */}
      <header className="border-b border-[#C9A96E]/30 bg-white relative shrink-0">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A96E]"></div>
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 md:w-1/3 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#9B8B7E]">Espace de</span>
            <span className="text-lg font-medium tracking-wide">Sophie & Lucas Moreau</span>
          </div>
          
          <div className="md:w-1/3 flex justify-center">
            <h1 className="text-3xl text-[#C9A96E] tracking-[0.15em]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>EVENTIA</h1>
          </div>
          
          <div className="md:w-1/3 flex md:justify-end items-center gap-6 text-center md:text-right">
            <div>
              <div className="text-xs uppercase tracking-[0.15em] text-[#9B8B7E] mb-1">12 Juillet 2026</div>
              <div className="text-2xl text-[#2A221F] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>J-356</div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-8 py-16 flex flex-col gap-16">
        
        {/* Status Section */}
        <section className="bg-white border border-[#C9A96E]/20 p-12 flex flex-col items-center text-center shadow-[0_10px_40px_rgba(42,34,31,0.03)] relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent"></div>
          
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] mb-4">Statut</span>
          <h2 className="text-4xl mb-12" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Votre invitation est en cours de création</h2>
          
          <div className="w-full max-w-4xl relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[1px] bg-[#EDE8E0] z-0"></div>
            <div className="hidden md:block absolute top-8 left-[10%] w-[25%] h-[1px] bg-[#C9A96E] z-0 transition-all duration-1000"></div>
            
            <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-4 bg-white px-4">
                  <div className={`text-2xl italic ${
                    step.status === 'active' ? 'text-[#C9A96E]' :
                    step.status === 'done' ? 'text-[#2A221F]' :
                    'text-[#EDE8E0]'
                  }`} style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.num}</div>
                  
                  <span className={`text-[11px] uppercase tracking-[0.15em] ${
                    step.status === 'active' ? 'text-[#C9A96E] font-medium' :
                    step.status === 'done' ? 'text-[#2A221F]' :
                    'text-[#9B8B7E]'
                  }`}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats RSVP - Horizontal */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-8 border-b border-[#C9A96E]/20 pb-4 gap-4">
            <h2 className="text-3xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Suivi des Réponses</h2>
            <button className="text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] hover:text-[#2A221F] transition-colors flex items-center gap-2">
              Voir la liste complète <ArrowRight size={14} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-[#C9A96E]/20 p-8 flex flex-col justify-center items-center text-center group hover:border-[#C9A96E]/50 transition-colors shadow-sm">
              <div className="text-[#9B8B7E] mb-2"><User size={24} strokeWidth={1} /></div>
              <div className="text-5xl text-[#2A221F] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>87</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#9B8B7E]">Invités au total</div>
            </div>
            
            <div className="bg-white border border-[#C9A96E]/20 p-8 flex flex-col justify-center items-center text-center group hover:border-[#C9A96E]/50 transition-colors shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-[#22C55E]/5 rotate-12"><Check size={120} strokeWidth={0.5} /></div>
              <div className="text-[#22C55E] mb-2 relative z-10"><Check size={24} strokeWidth={1.5} /></div>
              <div className="text-5xl text-[#2A221F] mb-3 relative z-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>54</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#9B8B7E] relative z-10">Confirmés</div>
            </div>

            <div className="bg-white border border-[#C9A96E]/20 p-8 flex flex-col justify-center items-center text-center group hover:border-[#C9A96E]/50 transition-colors shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-[#F59E0B]/5 rotate-12"><Clock size={120} strokeWidth={0.5} /></div>
              <div className="text-[#F59E0B] mb-2 relative z-10"><Clock size={24} strokeWidth={1.5} /></div>
              <div className="text-5xl text-[#2A221F] mb-3 relative z-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>12</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#9B8B7E] relative z-10">En attente</div>
            </div>

            <div className="bg-white border border-[#C9A96E]/20 p-8 flex flex-col justify-center items-center text-center group hover:border-[#C9A96E]/50 transition-colors shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-[#EF4444]/5 rotate-12"><X size={120} strokeWidth={0.5} /></div>
              <div className="text-[#EF4444] mb-2 relative z-10"><X size={24} strokeWidth={1.5} /></div>
              <div className="text-5xl text-[#2A221F] mb-3 relative z-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>8</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#9B8B7E] relative z-10">Déclinés</div>
            </div>
          </div>
        </section>

        {/* Guest List Elegant */}
        <section className="bg-white border border-[#C9A96E]/20 shadow-sm p-1 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-12 px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-[#9B8B7E] border-b border-[#C9A96E]/20 bg-[#F9F6F1]/50">
                <div className="col-span-6">Nom de l'invité</div>
                <div className="col-span-3 text-center">Nombre</div>
                <div className="col-span-3 text-right">Statut</div>
              </div>
              <div className="divide-y divide-[#EDE8E0]">
                {guests.map((guest, i) => (
                  <div key={i} className="grid grid-cols-12 items-center px-8 py-4 hover:bg-[#F9F6F1]/50 transition-colors group">
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="text-[#2A221F] text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{guest.name}</div>
                    </div>
                    <div className="col-span-3 text-center text-sm text-[#6B5B4E]">{guest.count}</div>
                    <div className="col-span-3 flex justify-end">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.15em] border whitespace-nowrap ${
                        guest.type === 'confirm' ? 'bg-[#22C55E]/5 text-[#22C55E] border-[#22C55E]/20' :
                        guest.type === 'pending' ? 'bg-[#F59E0B]/5 text-[#F59E0B] border-[#F59E0B]/20' :
                        'bg-[#EF4444]/5 text-[#EF4444] border-[#EF4444]/20'
                      }`}>
                        {guest.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Prochaines Etapes */}
        <section className="bg-[#2A221F] text-[#F9F6F1] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 border-b border-[#C9A96E]/20 pb-6 relative z-10 gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] mb-4 block">Action requise</span>
              <h2 className="text-4xl text-[#C9A96E]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Prochaines Étapes</h2>
            </div>
            <div className="md:text-right">
              <span className="text-sm text-[#9B8B7E] block mb-1">Date limite de réponse</span>
              <span className="text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>15 Mai 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div className="group cursor-pointer">
              <div className="text-6xl text-[#C9A96E]/30 mb-6 group-hover:text-[#C9A96E] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>01</div>
              <h3 className="text-xl mb-4 font-medium">Finaliser votre liste</h3>
              <p className="text-[#9B8B7E] text-sm leading-relaxed mb-6">Assurez-vous que tous les noms, adresses email et numéros de téléphone sont corrects avant l'envoi.</p>
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] flex items-center gap-2 group-hover:gap-4 transition-all">
                Gérer les invités <ArrowRight size={14} />
              </span>
            </div>

            <div className="group cursor-pointer">
              <div className="text-6xl text-[#C9A96E]/30 mb-6 group-hover:text-[#C9A96E] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>02</div>
              <h3 className="text-xl mb-4 font-medium">Configurer le contenu</h3>
              <p className="text-[#9B8B7E] text-sm leading-relaxed mb-6">Personnalisez le message d'accueil, les détails de l'événement et les questions du formulaire RSVP.</p>
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] flex items-center gap-2 group-hover:gap-4 transition-all">
                Personnaliser <ArrowRight size={14} />
              </span>
            </div>

            <div className="group cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
              <div className="text-6xl text-[#C9A96E]/30 mb-6 group-hover:text-[#C9A96E] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>03</div>
              <h3 className="text-xl mb-4 font-medium">Envoyer les invitations</h3>
              <p className="text-[#9B8B7E] text-sm leading-relaxed mb-6">Une fois l'invitation validée, lancez la distribution automatique par email et SMS à votre liste.</p>
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] flex items-center gap-2 group-hover:gap-4 transition-all">
                Lancer l'envoi <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}