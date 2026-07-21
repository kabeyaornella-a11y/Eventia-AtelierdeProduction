import React from 'react';
import { Home, Users, Calendar, Settings, Bell, ChevronRight, Download, Share, QrCode, ArrowRight } from 'lucide-react';

export default function MacWindowDark() {
  const steps = [
    { label: "Briefing", status: "done" },
    { label: "Création", status: "active" },
    { label: "Votre avis", status: "pending" },
    { label: "Prête", status: "pending" },
    { label: "Livrée", status: "pending" }
  ];

  const guests = [
    { initials: "AD", name: "Antoine Dupont", count: "1 invité", status: "Confirmé", statusColor: "text-green-500", statusBg: "bg-green-500/10" },
    { initials: "CL", name: "Claire & Marc Lemaire", count: "2 invités", status: "En attente", statusColor: "text-orange-500", statusBg: "bg-orange-500/10" },
    { initials: "IM", name: "Isabelle Martin", count: "1 invité", status: "Confirmé", statusColor: "text-green-500", statusBg: "bg-green-500/10" },
    { initials: "TB", name: "Thomas Bernard", count: "1 invité", status: "Décliné", statusColor: "text-red-500", statusBg: "bg-red-500/10" },
    { initials: "FD", name: "Famille Dubois", count: "4 invités", status: "Confirmé", statusColor: "text-green-500", statusBg: "bg-green-500/10" },
    { initials: "CR", name: "Camille Rousseau", count: "1 invité", status: "En attente", statusColor: "text-orange-500", statusBg: "bg-orange-500/10" },
  ];

  return (
    <div className="min-h-screen flex text-[#F5F1EB] font-sans" style={{ backgroundColor: '#1A1610', fontFamily: 'Jost, sans-serif' }}>
      {/* Sidebar */}
      <div className="w-16 bg-[#111111] border-r border-[#C9A96E]/20 flex flex-col items-center py-6 gap-8 shrink-0">
        <div className="w-10 h-10 rounded-full border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E] text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>E</div>
        <div className="flex flex-col gap-4 w-full px-2">
          {[Home, Users, Calendar, Settings].map((Icon, i) => (
            <button key={i} className="w-full aspect-square rounded-xl flex items-center justify-center text-[#9B8B7E] hover:text-[#111111] hover:bg-[#C9A96E] transition-all duration-300">
              <Icon size={20} strokeWidth={1.5} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden relative">
        {/* Header */}
        <header className="h-20 px-10 border-b border-[#C9A96E]/10 flex items-center justify-between shrink-0 sticky top-0 bg-[#1A1610]/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-medium tracking-wide">Mon espace <span className="text-[#9B8B7E] font-light mx-2">·</span> Sophie & Lucas Moreau</h1>
            <span className="px-3 py-1 rounded-full text-xs bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/20 uppercase tracking-widest font-medium">En création</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-[#9B8B7E] hover:text-[#C9A96E] transition-colors">
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#C9A96E]"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-[#2A221F] border border-[#C9A96E]/30 flex items-center justify-center text-sm font-medium text-[#C9A96E]">
              SL
            </div>
          </div>
        </header>

        <div className="flex-1 p-10 max-w-7xl w-full mx-auto flex flex-col gap-10">
          
          {/* Status Bar */}
          <div className="w-full">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-[#C9A96E]/20 z-0"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[35%] h-[1px] bg-[#C9A96E] z-0 transition-all duration-1000"></div>
              
              {steps.map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-medium transition-all duration-300 ${
                    step.status === 'done' ? 'bg-[#C9A96E] border-[#C9A96E] text-[#111]' :
                    step.status === 'active' ? 'bg-[#2A221F] border-[#C9A96E] text-[#C9A96E] shadow-[0_0_15px_rgba(201,169,110,0.3)]' :
                    'bg-[#1A1610] border-[#9B8B7E]/40 text-[#9B8B7E]'
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-xs uppercase tracking-wider ${
                    step.status === 'active' ? 'text-[#C9A96E]' :
                    step.status === 'done' ? 'text-[#F5F1EB]' :
                    'text-[#9B8B7E]'
                  }`}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button className="px-6 py-2.5 rounded-full bg-[#C9A96E] text-[#111111] text-sm font-medium hover:bg-[#b5955a] transition-colors flex items-center gap-2">
              <ChevronRight size={16} />
              Mon invitation
            </button>
            <button className="px-6 py-2.5 rounded-full bg-white/5 border border-[#C9A96E]/20 text-[#C9A96E] text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
              <Settings size={16} />
              Configurer
            </button>
            <button className="px-6 py-2.5 rounded-full bg-white/5 border border-[#C9A96E]/20 text-[#C9A96E] text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
              <Share size={16} />
              Partager le lien
            </button>
            <button className="px-6 py-2.5 rounded-full bg-white/5 border border-[#C9A96E]/20 text-[#C9A96E] text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
              <QrCode size={16} />
              QR Code
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Mac Window RSVP */}
            <div className="xl:col-span-2 rounded-[14px] bg-[#2A221F] border border-[#C9A96E]/20 shadow-2xl flex flex-col overflow-hidden">
              <div className="h-10 bg-[#1A1610]/50 border-b border-[#C9A96E]/10 flex items-center px-4 relative shrink-0">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]/80"></div>
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80"></div>
                  <div className="w-3 h-3 rounded-full bg-[#22C55E]/80"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[11px] text-[#9B8B7E] font-medium tracking-widest uppercase">Tableau de Bord</span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col gap-8 flex-1">
                <div className="flex justify-between items-end flex-wrap gap-4">
                  <h2 className="text-3xl text-[#C9A96E]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Suivi des Réponses</h2>
                  <div className="text-sm text-[#9B8B7E]">87 invités au total</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-2 relative overflow-hidden group hover:border-[#22C55E]/30 transition-colors">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#22C55E]/10 rounded-full blur-2xl group-hover:bg-[#22C55E]/20 transition-colors"></div>
                    <div className="text-4xl text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>54</div>
                    <div className="text-sm text-[#9B8B7E] flex items-center gap-2 uppercase tracking-widest text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span> Confirmés
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-2 relative overflow-hidden group hover:border-[#F59E0B]/30 transition-colors">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#F59E0B]/10 rounded-full blur-2xl group-hover:bg-[#F59E0B]/20 transition-colors"></div>
                    <div className="text-4xl text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>12</div>
                    <div className="text-sm text-[#9B8B7E] flex items-center gap-2 uppercase tracking-widest text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span> En attente
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-2 relative overflow-hidden group hover:border-[#EF4444]/30 transition-colors">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#EF4444]/10 rounded-full blur-2xl group-hover:bg-[#EF4444]/20 transition-colors"></div>
                    <div className="text-4xl text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>8</div>
                    <div className="text-sm text-[#9B8B7E] flex items-center gap-2 uppercase tracking-widest text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span> Déclinés
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <div className="grid grid-cols-12 px-4 py-2 text-[11px] uppercase tracking-widest text-[#9B8B7E] border-b border-white/5 mb-2">
                    <div className="col-span-6">Invité</div>
                    <div className="col-span-3 text-center">Nombre</div>
                    <div className="col-span-3 text-right">Statut</div>
                  </div>
                  {guests.map((guest, i) => (
                    <div key={i} className="grid grid-cols-12 items-center px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-colors group cursor-pointer">
                      <div className="col-span-6 flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full bg-[#1A1610] border border-[#C9A96E]/20 flex items-center justify-center text-xs text-[#C9A96E] font-medium group-hover:border-[#C9A96E]/50 transition-colors">
                          {guest.initials}
                        </div>
                        <span className="text-sm font-medium">{guest.name}</span>
                      </div>
                      <div className="col-span-3 text-center text-sm text-[#9B8B7E]">{guest.count}</div>
                      <div className="col-span-3 flex justify-end">
                        <span className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-medium ${guest.statusBg} ${guest.statusColor}`}>
                          {guest.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button className="mt-4 text-[#C9A96E] text-sm flex items-center gap-2 justify-center py-3 hover:bg-white/[0.02] rounded-xl transition-colors">
                    Voir tous les invités <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Side Grid */}
            <div className="flex flex-col gap-8">
              
              <div className="rounded-[14px] bg-white/[0.02] border border-[#C9A96E]/20 p-8 flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex items-center gap-3 text-[#C9A96E]">
                  <Download size={20} />
                  <h3 className="font-medium text-lg">Invitations envoyées</h3>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-[#9B8B7E]">Progression</span>
                    <span className="text-[#C9A96E]">87 / 87</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#C9A96E] w-full rounded-full relative">
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-xs text-[#9B8B7E] mt-4 leading-relaxed">Toutes vos invitations ont été distribuées. La réception des réponses est en cours.</p>
                </div>
              </div>

              <div className="rounded-[14px] bg-white/[0.02] border border-[#C9A96E]/20 p-8 flex flex-col gap-6 flex-1">
                <div className="flex items-center gap-3 text-[#F5F1EB]">
                  <Calendar size={20} className="text-[#C9A96E]" />
                  <h3 className="font-medium text-lg">Prochaine action</h3>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-4xl text-[#C9A96E] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>15 Mai</div>
                  <div className="text-[#9B8B7E] text-sm uppercase tracking-widest mb-6">Date limite de réponse</div>
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-[#F5F1EB] flex items-start gap-3">
                    <Bell size={16} className="text-[#F59E0B] mt-0.5 shrink-0" />
                    <p>Un rappel automatique sera envoyé le <strong>10 Mai</strong> aux invités n'ayant pas encore répondu.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}