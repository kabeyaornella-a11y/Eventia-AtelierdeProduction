export function EditoralePure() {
  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-[#1A1514]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#C9A96E]/20">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-6 flex items-center justify-between">
          <div className="text-2xl tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#C9A96E' }}>
            Eventia Signature
          </div>
          
          <div className="hidden md:flex items-center gap-12" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
            <a href="#collections" className="text-xs uppercase tracking-[0.2em] hover:text-[#C9A96E] transition-colors">Collections</a>
            <a href="#tarifs" className="text-xs uppercase tracking-[0.2em] hover:text-[#C9A96E] transition-colors">Tarifs</a>
            <a href="#approche" className="text-xs uppercase tracking-[0.2em] hover:text-[#C9A96E] transition-colors">Notre approche</a>
            <a href="#contact" className="text-xs uppercase tracking-[0.2em] hover:text-[#C9A96E] transition-colors">Contact</a>
          </div>
          
          <button className="px-6 py-2.5 border border-[#C9A96E] text-[#C9A96E] text-xs uppercase tracking-[0.2em] hover:bg-[#C9A96E] hover:text-white transition-all duration-300" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
            Voir les collections
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 lg:pt-48 lg:pb-40 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-[900px]">
            <h1 className="text-6xl lg:text-8xl xl:text-9xl leading-[0.95] mb-8 tracking-tight" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
              L'invitation qui fait battre les cœurs
            </h1>
            <p className="text-lg lg:text-xl max-w-[600px] mb-12 leading-relaxed" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>
              Des faire-parts digitaux de mariage conçus comme des œuvres cinématiques. 
              Animations sur-mesure, RSVP intégré, expérience inoubliable.
            </p>
            <button className="px-10 py-4 bg-[#C9A96E] text-white text-sm uppercase tracking-[0.2em] hover:bg-[#B89858] transition-all duration-300" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400 }}>
              Découvrir nos invitations
            </button>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent"></div>
      </div>

      {/* Collections Section */}
      <section id="collections" className="py-24 lg:py-40 px-8 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-20">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#C9A96E' }}>
              Nos Collections
            </p>
            <h2 className="text-5xl lg:text-7xl" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
              Cinq univers d'exception
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Collection 1 - Les Voiles */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F9F6F1] via-[#E8DED0] to-[#C9A96E]/30 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-sm uppercase tracking-[0.3em] text-[#1A1514]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
                    Explorer
                  </span>
                </div>
              </div>
              <h3 className="text-3xl lg:text-4xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                Les Voiles
              </h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>
                Légèreté et transparence. Des animations aériennes qui capturent l'instant suspendu avant le grand jour.
              </p>
            </div>

            {/* Collection 2 - Les Seuils */}
            <div className="group cursor-pointer lg:mt-24">
              <div className="aspect-[4/5] mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A96E]/20 via-[#A0907A]/30 to-[#2A1F18]/40 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-sm uppercase tracking-[0.3em] text-white" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
                    Explorer
                  </span>
                </div>
              </div>
              <h3 className="text-3xl lg:text-4xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                Les Seuils
              </h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>
                Le passage d'un monde à l'autre. Dramatique, cinématique, inoubliable.
              </p>
            </div>

            {/* Collection 3 - Les Écrins */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F9F6F1] via-[#C9A96E]/40 to-[#F9F6F1] group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-sm uppercase tracking-[0.3em] text-[#1A1514]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
                    Explorer
                  </span>
                </div>
              </div>
              <h3 className="text-3xl lg:text-4xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                Les Écrins
              </h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>
                Précieux comme un bijou. Chaque détail est pensé, chaque animation est une attention.
              </p>
            </div>

            {/* Collection 4 - L'Union */}
            <div className="group cursor-pointer lg:mt-24">
              <div className="aspect-[4/5] mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2A1F18]/30 via-[#A0907A]/20 to-[#F9F6F1] group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-sm uppercase tracking-[0.3em] text-[#1A1514]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
                    Explorer
                  </span>
                </div>
              </div>
              <h3 className="text-3xl lg:text-4xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                L'Union
              </h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>
                Deux histoires qui n'en font qu'une. Équilibre parfait entre tradition et modernité.
              </p>
            </div>

            {/* Collection 5 - Save the Date */}
            <div className="group cursor-pointer lg:col-span-2 lg:max-w-[calc(50%-2.5rem)]">
              <div className="aspect-[4/5] mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A96E]/50 via-[#F9F6F1] to-[#C9A96E]/30 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-sm uppercase tracking-[0.3em] text-[#1A1514]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
                    Explorer
                  </span>
                </div>
              </div>
              <h3 className="text-3xl lg:text-4xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                Save the Date
              </h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>
                La première annonce. Simple, élégante, mémorable. À partir de 29€.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent"></div>
      </div>

      {/* How It Works Section */}
      <section id="approche" className="py-24 lg:py-40 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 text-center">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#C9A96E' }}>
              Comment ça marche
            </p>
            <h2 className="text-5xl lg:text-7xl" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
              Trois étapes simples
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border border-[#C9A96E] flex items-center justify-center mx-auto mb-8">
                <span className="text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A96E' }}>1</span>
              </div>
              <h3 className="text-2xl lg:text-3xl mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                Choisir
              </h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>
                Explorez nos collections et sélectionnez celle qui vous ressemble. Chaque univers est unique.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border border-[#C9A96E] flex items-center justify-center mx-auto mb-8">
                <span className="text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A96E' }}>2</span>
              </div>
              <h3 className="text-2xl lg:text-3xl mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                Personnaliser
              </h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>
                Nous adaptons les textes, les couleurs et les animations pour refléter votre histoire.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border border-[#C9A96E] flex items-center justify-center mx-auto mb-8">
                <span className="text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A96E' }}>3</span>
              </div>
              <h3 className="text-2xl lg:text-3xl mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                Partager
              </h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>
                Envoyez votre invitation par lien. Vos invités confirment leur présence en un clic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent"></div>
      </div>

      {/* Pricing Section */}
      <section id="tarifs" className="py-24 lg:py-40 px-8 lg:px-16 bg-[#F9F6F1]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 text-center">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#C9A96E' }}>
              Nos Tarifs
            </p>
            <h2 className="text-5xl lg:text-7xl mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
              Une offre pour chaque célébration
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* L'Essentielle */}
            <div className="bg-white p-10 border border-[#C9A96E]/20 hover:border-[#C9A96E] transition-colors duration-300">
              <h3 className="text-3xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                L'Essentielle
              </h3>
              <div className="mb-8">
                <span className="text-5xl" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A96E' }}>179€</span>
              </div>
              <ul className="space-y-4 mb-10" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '14px' }}>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>Invitation digitale animée</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>RSVP intégré</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>Compte à rebours</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>1 révision incluse</span>
                </li>
              </ul>
              <button className="w-full py-3 border border-[#C9A96E] text-[#C9A96E] text-xs uppercase tracking-[0.2em] hover:bg-[#C9A96E] hover:text-white transition-all duration-300" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
                Choisir
              </button>
            </div>

            {/* La Signature */}
            <div className="bg-white p-10 border-2 border-[#C9A96E] relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C9A96E] text-white px-6 py-1.5 text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
                Populaire
              </div>
              <h3 className="text-3xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                La Signature
              </h3>
              <div className="mb-8">
                <span className="text-5xl" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A96E' }}>269€</span>
              </div>
              <ul className="space-y-4 mb-10" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '14px' }}>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>Invitation cinématique premium</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>RSVP avancé + gestion menus</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>Animations GSAP sur-mesure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>Vidéo d'intro personnalisée</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>3 révisions incluses</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-[#C9A96E] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#B89858] transition-all duration-300" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400 }}>
                Choisir
              </button>
            </div>

            {/* L'Exception */}
            <div className="bg-white p-10 border border-[#C9A96E]/20 hover:border-[#C9A96E] transition-colors duration-300">
              <h3 className="text-3xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                L'Exception
              </h3>
              <div className="mb-8">
                <span className="text-5xl" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A96E' }}>549€</span>
              </div>
              <ul className="space-y-4 mb-10" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '14px' }}>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>Expérience totalement sur-mesure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>RSVP complet + logistique invités</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>Développement animation unique</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>Vidéo cinématique professionnelle</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>Support prioritaire illimité</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>Révisions illimitées</span>
                </li>
              </ul>
              <button className="w-full py-3 border border-[#C9A96E] text-[#C9A96E] text-xs uppercase tracking-[0.2em] hover:bg-[#C9A96E] hover:text-white transition-all duration-300" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
                Choisir
              </button>
            </div>
          </div>

          {/* Save the Date pricing */}
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl lg:text-4xl mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
              Save the Date
            </h3>
            <p className="text-sm mb-8" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>
              La première annonce, avant l'invitation complète
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="text-center">
                <div className="text-3xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A96E' }}>29€</div>
                <div className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>Basique</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A96E' }}>59€</div>
                <div className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>Animé</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A96E' }}>89€</div>
                <div className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>Premium</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-40 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 text-center">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#C9A96E' }}>
              Témoignages
            </p>
            <h2 className="text-5xl lg:text-7xl" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
              Ils nous ont fait confiance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20">
            {/* Testimonial 1 */}
            <div>
              <p className="text-xl lg:text-2xl mb-8 leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                "Nos invités nous en parlent encore. L'invitation était tellement belle qu'ils l'ont montrée à leurs proches. 
                C'était exactement le ton qu'on voulait donner à notre mariage."
              </p>
              <div>
                <div className="text-sm font-medium mb-1" style={{ fontFamily: 'Jost, sans-serif' }}>Léa & Thomas</div>
                <div className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>
                  Mariés le 15 juin 2025 · Collection Les Voiles
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div>
              <p className="text-xl lg:text-2xl mb-8 leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                "Ornelle a compris notre vision immédiatement. L'invitation était plus qu'un simple faire-part, 
                c'était une vraie expérience. Le RSVP intégré nous a facilité la vie."
              </p>
              <div>
                <div className="text-sm font-medium mb-1" style={{ fontFamily: 'Jost, sans-serif' }}>Sofia & Marc</div>
                <div className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>
                  Mariés le 3 septembre 2025 · Collection L'Union
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="md:col-span-2 max-w-3xl mx-auto text-center">
              <p className="text-xl lg:text-2xl mb-8 leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                "Nous cherchions quelque chose d'unique, qui nous ressemble vraiment. 
                Eventia Signature a créé une invitation qui a dépassé toutes nos attentes. 
                C'était le premier souvenir de notre mariage, et il était parfait."
              </p>
              <div>
                <div className="text-sm font-medium mb-1" style={{ fontFamily: 'Jost, sans-serif' }}>Camille & Alexandre</div>
                <div className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>
                  Mariés le 20 avril 2025 · Collection Les Écrins
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent"></div>
      </div>

      {/* Contact CTA Section */}
      <section id="contact" className="py-24 lg:py-40 px-8 lg:px-16">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="text-5xl lg:text-7xl mb-8" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
            Créons ensemble l'invitation de vos rêves
          </h2>
          <p className="text-lg lg:text-xl mb-12 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>
            Chaque projet commence par une conversation. 
            Partagez-nous votre vision, et nous la transformerons en une expérience inoubliable.
          </p>
          <button className="px-12 py-4 bg-[#C9A96E] text-white text-sm uppercase tracking-[0.2em] hover:bg-[#B89858] transition-all duration-300" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400 }}>
            Prendre rendez-vous
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 lg:px-16 border-t border-[#C9A96E]/20">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#C9A96E' }}>
              Eventia Signature
            </div>
            
            <div className="flex gap-8" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
              <a href="#collections" className="text-xs uppercase tracking-[0.2em] hover:text-[#C9A96E] transition-colors">Collections</a>
              <a href="#tarifs" className="text-xs uppercase tracking-[0.2em] hover:text-[#C9A96E] transition-colors">Tarifs</a>
              <a href="#approche" className="text-xs uppercase tracking-[0.2em] hover:text-[#C9A96E] transition-colors">Notre approche</a>
              <a href="#contact" className="text-xs uppercase tracking-[0.2em] hover:text-[#C9A96E] transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-12 text-center text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#A0907A' }}>
            © 2026 Eventia Signature · Fondé par Kabéya Ornelle · Fait avec intention
          </div>
        </div>
      </footer>
    </div>
  );
}
