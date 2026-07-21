import React from 'react';

export function SignaturePrecieuse() {
  return (
    <div className="min-h-screen w-full bg-[#FBF7F0] text-[#2A1F18] overflow-x-hidden font-['Jost',sans-serif]">
      {/* Navigation */}
      <nav className="w-full flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-b border-[#C9A46A]/20">
        <div className="flex flex-col items-start">
          <span className="font-['Cormorant_Garamond',serif] italic text-2xl md:text-3xl text-[#C9A46A] tracking-wider">
            Eventia Signature
          </span>
          <div className="w-12 h-[1px] bg-[#C9A46A] mt-1"></div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-[#A0907A]">
          <a href="#collections" className="hover:text-[#C9A46A] transition-colors">Collections</a>
          <a href="#tarifs" className="hover:text-[#C9A46A] transition-colors">Tarifs</a>
          <a href="#approche" className="hover:text-[#C9A46A] transition-colors">Notre approche</a>
          <a href="#contact" className="hover:text-[#C9A46A] transition-colors">Contact</a>
        </div>
        
        <button className="hidden md:block px-6 py-2 border border-[#C9A46A] text-[#C9A46A] uppercase tracking-widest text-xs hover:bg-[#C9A46A] hover:text-[#FBF7F0] transition-colors">
          Voir les collections
        </button>
        
        {/* Mobile Menu Icon */}
        <button className="md:hidden flex flex-col gap-1.5 p-2">
          <div className="w-6 h-[1px] bg-[#C9A46A]"></div>
          <div className="w-6 h-[1px] bg-[#C9A46A]"></div>
          <div className="w-6 h-[1px] bg-[#C9A46A]"></div>
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full px-6 py-24 md:py-40 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 z-0 opacity-30 flex justify-center items-center pointer-events-none">
          <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] border border-[#C9A46A]/20 rounded-full"></div>
          <div className="absolute w-[400px] h-[400px] md:w-[800px] md:h-[800px] border border-[#C9A46A]/10 rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto border border-[#C9A46A]/40 p-8 md:p-16 rounded-sm bg-[#FBF7F0]/80 backdrop-blur-sm">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#C9A46A]"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#C9A46A]"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#C9A46A]"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C9A46A]"></div>
          
          <h1 className="font-['Cormorant_Garamond',serif] italic text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 text-[#2A1F18]">
            L'Art de l'Invitation<br />
            <span className="text-[#C9A46A]">Digitale d'Exception</span>
          </h1>
          
          <p className="text-[#A0907A] text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
            Une expérience immersive, élégante et sur-mesure pour annoncer le plus beau jour de votre vie. Plus qu'une invitation, un écrin précieux.
          </p>
          
          <button className="px-8 py-3 bg-transparent border border-[#C9A46A] text-[#C9A46A] uppercase tracking-widest text-sm hover:bg-[#C9A46A] hover:text-[#FBF7F0] transition-colors duration-300">
            Découvrir nos invitations
          </button>
        </div>
      </header>

      {/* Intro Section */}
      <section className="py-20 px-6 max-w-3xl mx-auto text-center relative">
        <div className="text-[#C9A46A] mb-8 text-2xl">◆</div>
        <p className="font-['Cormorant_Garamond',serif] italic text-2xl md:text-4xl text-[#2A1F18] leading-relaxed">
          "Chaque faire-part est une histoire cousue de lumière, pensée comme un bijou que l'on offre à ceux qu'on aime."
        </p>
        <p className="mt-8 text-[#A0907A] uppercase tracking-widest text-sm">— Ornelle, Fondatrice</p>
        <div className="text-[#C9A46A] mt-8 text-2xl">◆</div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-24 px-6 md:px-12 lg:px-24 bg-[#2A1F18] text-[#F9F6F1]">
        <div className="text-center mb-16">
          <span className="text-[#C9A46A] uppercase tracking-widest text-xs font-bold mb-4 block">Nos Écrins</span>
          <h2 className="font-['Cormorant_Garamond',serif] italic text-4xl md:text-5xl">Les Collections</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="group flex flex-col items-center border border-[#C9A46A]/20 p-8 hover:border-[#C9A46A] transition-colors duration-500 bg-[#2A1F18] relative overflow-hidden">
            <div className="absolute top-4 right-4 text-[#C9A46A] text-xs uppercase tracking-widest font-bold">Nouveau</div>
            <div className="w-full aspect-[3/4] bg-gradient-to-br from-[#2A1F18] via-[#C9A46A]/20 to-[#2A1F18] mb-8 flex items-center justify-center border border-[#C9A46A]/10">
               <div className="w-24 h-32 border border-[#C9A46A]/40 rotate-3 transition-transform group-hover:rotate-0 duration-500"></div>
            </div>
            <h3 className="font-['Cormorant_Garamond',serif] italic text-3xl mb-2 text-[#C9A46A]">Les Voiles</h3>
            <p className="text-center text-[#A0907A] text-sm mb-6 px-4">
              La légèreté d'un souffle, la transparence de l'amour. Des animations douces et fluides pour une ambiance éthérée.
            </p>
            <span className="text-xs uppercase tracking-widest text-[#F9F6F1] border-b border-[#C9A46A]/50 pb-1 hover:border-[#C9A46A] cursor-pointer transition-colors">Découvrir</span>
          </div>

          {/* Card 2 */}
          <div className="group flex flex-col items-center border border-[#C9A46A]/20 p-8 hover:border-[#C9A46A] transition-colors duration-500 bg-[#2A1F18]">
            <div className="w-full aspect-[3/4] bg-gradient-to-t from-[#C9A46A]/10 to-transparent mb-8 flex items-center justify-center border border-[#C9A46A]/10 relative">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A46A]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               <div className="w-20 h-20 rounded-full border border-[#C9A46A]/40 transition-transform group-hover:scale-110 duration-500"></div>
            </div>
            <h3 className="font-['Cormorant_Garamond',serif] italic text-3xl mb-2 text-[#C9A46A]">Les Seuils</h3>
            <p className="text-center text-[#A0907A] text-sm mb-6 px-4">
              L'élégance architecturale et la géométrie de l'union. Des lignes pures et un design minimaliste structuré.
            </p>
            <span className="text-xs uppercase tracking-widest text-[#F9F6F1] border-b border-[#C9A46A]/50 pb-1 hover:border-[#C9A46A] cursor-pointer transition-colors">Découvrir</span>
          </div>

          {/* Card 3 */}
          <div className="group flex flex-col items-center border border-[#C9A46A]/20 p-8 hover:border-[#C9A46A] transition-colors duration-500 bg-[#2A1F18]">
            <div className="w-full aspect-[3/4] bg-gradient-to-tr from-[#2A1F18] via-[#C9A46A]/10 to-[#C9A46A]/30 mb-8 flex items-center justify-center border border-[#C9A46A]/10">
               <div className="w-24 h-24 rotate-45 border border-[#C9A46A]/40 transition-transform group-hover:rotate-90 duration-700"></div>
            </div>
            <h3 className="font-['Cormorant_Garamond',serif] italic text-3xl mb-2 text-[#C9A46A]">Les Écrins</h3>
            <p className="text-center text-[#A0907A] text-sm mb-6 px-4">
              Le luxe classique réinventé. Des textures riches et des détails dorés pour une annonce majestueuse.
            </p>
            <span className="text-xs uppercase tracking-widest text-[#F9F6F1] border-b border-[#C9A46A]/50 pb-1 hover:border-[#C9A46A] cursor-pointer transition-colors">Découvrir</span>
          </div>
          
          {/* Card 4 */}
          <div className="group flex flex-col items-center border border-[#C9A46A]/20 p-8 hover:border-[#C9A46A] transition-colors duration-500 bg-[#2A1F18] md:col-span-1 lg:col-start-2">
            <div className="w-full aspect-[3/4] bg-[#F9F6F1]/5 mb-8 flex items-center justify-center border border-[#C9A46A]/10 relative overflow-hidden">
               <div className="w-32 h-[1px] bg-[#C9A46A]/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
               <div className="w-32 h-[1px] bg-[#C9A46A]/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
            </div>
            <h3 className="font-['Cormorant_Garamond',serif] italic text-3xl mb-2 text-[#C9A46A]">L'Union</h3>
            <p className="text-center text-[#A0907A] text-sm mb-6 px-4">
              La force des liens éternels. Un design qui célèbre la fusion de deux âmes à travers des motifs entrelacés.
            </p>
            <span className="text-xs uppercase tracking-widest text-[#F9F6F1] border-b border-[#C9A46A]/50 pb-1 hover:border-[#C9A46A] cursor-pointer transition-colors">Découvrir</span>
          </div>

          {/* Card 5 */}
          <div className="group flex flex-col items-center border border-[#C9A46A]/20 p-8 hover:border-[#C9A46A] transition-colors duration-500 bg-[#2A1F18] md:col-span-2 lg:col-span-1">
            <div className="w-full aspect-[3/4] bg-gradient-to-br from-[#C9A46A]/5 to-[#2A1F18] mb-8 flex flex-col items-center justify-center border border-[#C9A46A]/10 gap-4">
               <div className="w-16 h-16 border border-[#C9A46A]/40 rounded-full"></div>
               <div className="w-24 h-[1px] bg-[#C9A46A]/40"></div>
            </div>
            <h3 className="font-['Cormorant_Garamond',serif] italic text-3xl mb-2 text-[#C9A46A]">Save the Date</h3>
            <p className="text-center text-[#A0907A] text-sm mb-6 px-4">
              L'avant-goût de votre mariage. Une annonce percutante pour réserver la date avant l'invitation officielle.
            </p>
            <span className="text-xs uppercase tracking-widest text-[#F9F6F1] border-b border-[#C9A46A]/50 pb-1 hover:border-[#C9A46A] cursor-pointer transition-colors">Découvrir</span>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="approche" className="py-24 px-6 md:px-12 bg-[#FBF7F0]">
        <div className="text-center mb-16">
          <h2 className="font-['Cormorant_Garamond',serif] italic text-4xl md:text-5xl text-[#2A1F18]">L'Expérience</h2>
          <div className="w-16 h-[1px] bg-[#C9A46A] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="text-6xl font-['Cormorant_Garamond',serif] text-[#C9A46A] opacity-80 mb-6">I</div>
            <h3 className="uppercase tracking-widest text-sm font-bold text-[#2A1F18] mb-4">Choisir</h3>
            <p className="text-[#A0907A]">
              Explorez nos collections et sélectionnez le design qui résonne avec l'atmosphère de votre mariage.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="text-6xl font-['Cormorant_Garamond',serif] text-[#C9A46A] opacity-80 mb-6">II</div>
            <h3 className="uppercase tracking-widest text-sm font-bold text-[#2A1F18] mb-4">Personnaliser</h3>
            <p className="text-[#A0907A]">
              Confiez-nous vos textes et photographies. Notre atelier confectionne votre invitation sur-mesure.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="text-6xl font-['Cormorant_Garamond',serif] text-[#C9A46A] opacity-80 mb-6">III</div>
            <h3 className="uppercase tracking-widest text-sm font-bold text-[#2A1F18] mb-4">Partager</h3>
            <p className="text-[#A0907A]">
              Recevez votre lien privé et éblouissez vos invités. Suivez leurs confirmations depuis votre espace.
            </p>
          </div>
        </div>
      </section>

      {/* Tarifs Section */}
      <section id="tarifs" className="py-24 px-6 md:px-12 bg-white relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A46A10_1px,transparent_1px),linear-gradient(to_bottom,#C9A46A10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="text-center mb-16 relative z-10">
          <span className="text-[#C9A46A] uppercase tracking-widest text-xs font-bold mb-4 block">Nos Offres</span>
          <h2 className="font-['Cormorant_Garamond',serif] italic text-4xl md:text-5xl text-[#2A1F18]">Invitations Digitales</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
          {/* Pricing 1 */}
          <div className="border border-[#C9A46A]/20 p-10 flex flex-col bg-[#FBF7F0]/50">
            <h3 className="font-['Cormorant_Garamond',serif] italic text-3xl text-[#2A1F18] mb-2">L'Essentielle</h3>
            <div className="text-[#C9A46A] text-2xl mb-8">179€</div>
            <ul className="space-y-4 mb-10 flex-grow text-sm text-[#A0907A]">
              <li className="flex items-start gap-3"><span className="text-[#C9A46A] text-lg leading-none">◆</span> Design au choix</li>
              <li className="flex items-start gap-3"><span className="text-[#C9A46A] text-lg leading-none">◆</span> Animations d'entrée</li>
              <li className="flex items-start gap-3"><span className="text-[#C9A46A] text-lg leading-none">◆</span> Formulaire RSVP basique</li>
              <li className="flex items-start gap-3"><span className="text-[#C9A46A] text-lg leading-none">◆</span> Intégration de 3 photos</li>
              <li className="flex items-start gap-3"><span className="text-[#C9A46A] text-lg leading-none">◆</span> Hébergement 1 an</li>
            </ul>
            <button className="w-full py-3 border border-[#C9A46A] text-[#C9A46A] uppercase tracking-widest text-xs hover:bg-[#C9A46A] hover:text-[#FBF7F0] transition-colors">
              Sélectionner
            </button>
          </div>

          {/* Pricing 2 */}
          <div className="border border-[#C9A46A] p-10 flex flex-col bg-[#2A1F18] text-[#F9F6F1] shadow-2xl relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C9A46A] text-[#FBF7F0] px-4 py-1 text-xs uppercase tracking-widest font-bold">
              Recommandé
            </div>
            <h3 className="font-['Cormorant_Garamond',serif] italic text-3xl text-[#C9A46A] mb-2">La Signature</h3>
            <div className="text-[#F9F6F1] text-2xl mb-8">269€</div>
            <ul className="space-y-4 mb-10 flex-grow text-sm text-[#A0907A]">
              <li className="flex items-start gap-3"><span className="text-[#C9A46A] text-lg leading-none">◆</span> Tout de L'Essentielle</li>
              <li className="flex items-start gap-3"><span className="text-[#C9A46A] text-lg leading-none">◆</span> Vidéo cinématique d'introduction</li>
              <li className="flex items-start gap-3"><span className="text-[#C9A46A] text-lg leading-none">◆</span> Compte à rebours animé</li>
              <li className="flex items-start gap-3"><span className="text-[#C9A46A] text-lg leading-none">◆</span> RSVP avancé (menus, allergies)</li>
              <li className="flex items-start gap-3"><span className="text-[#C9A46A] text-lg leading-none">◆</span> Programme détaillé</li>
            </ul>
            <button className="w-full py-3 bg-[#C9A46A] text-[#FBF7F0] uppercase tracking-widest text-xs hover:bg-[#b08f5a] transition-colors">
              Sélectionner
            </button>
          </div>

          {/* Pricing 3 */}
          <div className="border border-[#C9A46A]/20 p-10 flex flex-col bg-[#FBF7F0]/50">
            <h3 className="font-['Cormorant_Garamond',serif] italic text-3xl text-[#2A1F18] mb-2">L'Exception</h3>
            <div className="text-[#C9A46A] text-2xl mb-8">549€</div>
            <ul className="space-y-4 mb-10 flex-grow text-sm text-[#A0907A]">
              <li className="flex items-start gap-3"><span className="text-[#C9A46A] text-lg leading-none">◆</span> Tout de La Signature</li>
              <li className="flex items-start gap-3"><span className="text-[#C9A46A] text-lg leading-none">◆</span> Design 100% sur-mesure</li>
              <li className="flex items-start gap-3"><span className="text-[#C9A46A] text-lg leading-none">◆</span> Animations GSAP complexes</li>
              <li className="flex items-start gap-3"><span className="text-[#C9A46A] text-lg leading-none">◆</span> Espace invités privé</li>
              <li className="flex items-start gap-3"><span className="text-[#C9A46A] text-lg leading-none">◆</span> Accompagnement prioritaire</li>
            </ul>
            <button className="w-full py-3 border border-[#C9A46A] text-[#C9A46A] uppercase tracking-widest text-xs hover:bg-[#C9A46A] hover:text-[#FBF7F0] transition-colors">
              Sélectionner
            </button>
          </div>
        </div>

        {/* Save the date small banner */}
        <div className="max-w-4xl mx-auto mt-16 border-t border-b border-[#C9A46A]/20 py-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <h4 className="font-['Cormorant_Garamond',serif] italic text-2xl text-[#2A1F18]">Save the Date</h4>
            <p className="text-[#A0907A] text-sm mt-1">À partir de 29€ pour annoncer la date en beauté.</p>
          </div>
          <button className="text-xs uppercase tracking-widest text-[#C9A46A] border-b border-[#C9A46A]/50 pb-1 hover:border-[#C9A46A] transition-colors">
            Voir les options
          </button>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-24 px-6 md:px-12 bg-[#2A1F18] text-[#F9F6F1] overflow-hidden relative">
        <div className="absolute top-0 right-0 text-[#C9A46A]/5 text-[20rem] font-['Cormorant_Garamond',serif] leading-none pointer-events-none select-none">»</div>
        <div className="absolute bottom-0 left-0 text-[#C9A46A]/5 text-[20rem] font-['Cormorant_Garamond',serif] leading-none pointer-events-none select-none">«</div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            
            {/* Testimonial 1 */}
            <div className="flex-1 relative">
              <span className="text-6xl text-[#C9A46A] font-['Cormorant_Garamond',serif] absolute -top-8 -left-6 opacity-50">«</span>
              <p className="font-['Cormorant_Garamond',serif] italic text-2xl md:text-3xl text-[#F9F6F1] mb-6 relative z-10">
                Nos invités ont été époustouflés. Le rendu est d'une élégance rare, digne d'une véritable œuvre d'art digitale.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-[1px] bg-[#C9A46A]"></div>
                <div className="uppercase tracking-widest text-xs text-[#A0907A]">Éléonore &amp; Thomas</div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="flex-1 relative">
              <span className="text-6xl text-[#C9A46A] font-['Cormorant_Garamond',serif] absolute -top-8 -left-6 opacity-50">«</span>
              <p className="font-['Cormorant_Garamond',serif] italic text-2xl md:text-3xl text-[#F9F6F1] mb-6 relative z-10">
                Le soin apporté aux détails, la fluidité des animations... Tout était parfait. Merci Ornelle pour ce travail d'orfèvre.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-[1px] bg-[#C9A46A]"></div>
                <div className="uppercase tracking-widest text-xs text-[#A0907A]">Juliette &amp; Marc</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1C1410] text-[#F9F6F1] pt-20 pb-10 px-6 md:px-12 border-t border-[#C9A46A]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="col-span-1 md:col-span-1">
            <span className="font-['Cormorant_Garamond',serif] italic text-2xl text-[#C9A46A] block mb-4">
              Eventia Signature
            </span>
            <p className="text-[#A0907A] text-sm">
              Maison française de faire-parts digitaux haut de gamme pour des annonces mémorables.
            </p>
          </div>
          
          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold text-[#F9F6F1] mb-6">Collections</h4>
            <ul className="space-y-3 text-sm text-[#A0907A]">
              <li><a href="#" className="hover:text-[#C9A46A] transition-colors">Les Voiles</a></li>
              <li><a href="#" className="hover:text-[#C9A46A] transition-colors">Les Seuils</a></li>
              <li><a href="#" className="hover:text-[#C9A46A] transition-colors">Les Écrins</a></li>
              <li><a href="#" className="hover:text-[#C9A46A] transition-colors">L'Union</a></li>
              <li><a href="#" className="hover:text-[#C9A46A] transition-colors">Save the Date</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold text-[#F9F6F1] mb-6">À propos</h4>
            <ul className="space-y-3 text-sm text-[#A0907A]">
              <li><a href="#" className="hover:text-[#C9A46A] transition-colors">Notre Atelier</a></li>
              <li><a href="#" className="hover:text-[#C9A46A] transition-colors">Comment ça marche</a></li>
              <li><a href="#" className="hover:text-[#C9A46A] transition-colors">Tarifs</a></li>
              <li><a href="#" className="hover:text-[#C9A46A] transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold text-[#F9F6F1] mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-[#A0907A]">
              <li><a href="#" className="hover:text-[#C9A46A] transition-colors">bonjour@eventiasignature.com</a></li>
              <li><a href="#" className="hover:text-[#C9A46A] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#C9A46A] transition-colors">Pinterest</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#C9A46A]/10 text-xs text-[#A0907A]">
          <p>&copy; {new Date().getFullYear()} Eventia Signature. Tous droits réservés.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#C9A46A] transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-[#C9A46A] transition-colors">CGV</a>
            <a href="#" className="hover:text-[#C9A46A] transition-colors">Confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
