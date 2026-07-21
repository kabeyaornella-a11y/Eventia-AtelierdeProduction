export function MaisonCinematique() {
  return (
    <div className="min-h-screen w-full bg-[#F5F0E8] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F0E8]/90 backdrop-blur-md border-b border-[#C9A96E]/20">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl text-[#2A1F18]" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 600 }}>
            Eventia Signature
          </div>
          <div className="hidden md:flex items-center gap-8" style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px", letterSpacing: "0.5px" }}>
            <a href="#collections" className="text-[#2A1F18] hover:text-[#C9A96E] transition-colors">Collections</a>
            <a href="#tarifs" className="text-[#2A1F18] hover:text-[#C9A96E] transition-colors">Tarifs</a>
            <a href="#approche" className="text-[#2A1F18] hover:text-[#C9A96E] transition-colors">Notre approche</a>
            <a href="#contact" className="text-[#2A1F18] hover:text-[#C9A96E] transition-colors">Contact</a>
          </div>
          <button 
            className="px-6 py-2.5 bg-[#C9A96E] text-white transition-all hover:bg-[#B89860]"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase" }}
          >
            Voir les collections
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          {/* Stylized placeholder image with gold gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C9A96E]/20 via-[#F5F0E8] to-[#A0907A]/30"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#C9A96E]/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#A0907A]/20 to-transparent rounded-full blur-3xl"></div>
          
          {/* Decorative geometric shape */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#C9A96E]/20"
            style={{ 
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              transform: "translate(-50%, -50%) rotate(45deg)"
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
          <div 
            className="text-[#2A1F18] mb-4 opacity-80"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "18px", letterSpacing: "3px", textTransform: "uppercase" }}
          >
            Vos invitations de mariage
          </div>
          <h1 
            className="text-[#2A1F18] mb-8 leading-[0.9]"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontStyle: "italic", 
              fontWeight: 600,
              fontSize: "clamp(4rem, 12vw, 10rem)"
            }}
          >
            Signature
          </h1>
          <p 
            className="text-[#2A1F18]/70 max-w-[600px] mx-auto mb-12 leading-relaxed"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "18px", lineHeight: "1.8" }}
          >
            Des faire-parts digitaux qui racontent votre histoire avec l'élégance et l'émotion qu'elle mérite. Une expérience cinématique pour vos invités.
          </p>
          <button 
            className="px-12 py-4 bg-[#2A1F18] text-[#F9F6F1] transition-all hover:bg-[#3A2F28] hover:scale-105"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" }}
          >
            Découvrir nos invitations
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#C9A96E] to-transparent"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]"></div>
        </div>
      </section>

      {/* Divider line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent"></div>

      {/* Collections Section */}
      <section id="collections" className="py-32 bg-[#F5F0E8]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <div 
              className="text-[#C9A96E] mb-4"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase" }}
            >
              Nos Collections
            </div>
            <h2 
              className="text-[#2A1F18] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 600 }}
            >
              Cinq univers d'exception
            </h2>
            <p 
              className="text-[#2A1F18]/70 max-w-[700px] mx-auto"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "17px", lineHeight: "1.8" }}
            >
              Chaque collection capture une esthétique, une émotion, un moment unique de votre histoire.
            </p>
          </div>

          {/* Horizontal scrollable collections */}
          <div className="overflow-x-auto pb-8 -mx-6 px-6" style={{ scrollbarWidth: "thin", scrollbarColor: "#C9A96E #F5F0E8" }}>
            <div className="flex gap-8 min-w-max">
              {[
                { name: "Les Voiles", tagline: "Légèreté éthérée", gradient: "from-[#C9A96E]/30 to-[#F9F6F1]" },
                { name: "Les Seuils", tagline: "Passages intemporels", gradient: "from-[#A0907A]/40 to-[#F5F0E8]" },
                { name: "Les Écrins", tagline: "Luxe raffiné", gradient: "from-[#C9A96E]/40 via-[#A0907A]/20 to-[#F9F6F1]" },
                { name: "L'Union", tagline: "Harmonie parfaite", gradient: "from-[#2A1F18]/20 to-[#C9A96E]/30" },
                { name: "Save the Date", tagline: "Premier chapitre", gradient: "from-[#F9F6F1] to-[#C9A96E]/20" }
              ].map((collection, i) => (
                <div 
                  key={i} 
                  className="group cursor-pointer"
                  style={{ width: "380px", flexShrink: 0 }}
                >
                  {/* Video placeholder with gradient */}
                  <div 
                    className={`relative h-[520px] bg-gradient-to-br ${collection.gradient} mb-6 overflow-hidden transition-transform group-hover:scale-[1.02]`}
                    style={{ clipPath: i === 2 ? "polygon(0 0, 100% 0, 100% 95%, 0 100%)" : undefined }}
                  >
                    {/* Decorative frame */}
                    <div className="absolute inset-8 border border-[#C9A96E]/30 group-hover:border-[#C9A96E]/60 transition-colors"></div>
                    
                    {/* Collection number */}
                    <div 
                      className="absolute top-6 right-6 text-[#C9A96E]/40"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "80px", fontStyle: "italic", lineHeight: 1 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Center ornament */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-20 h-20 border border-[#C9A96E]/40 rotate-45 group-hover:rotate-[60deg] transition-transform duration-700"></div>
                    </div>
                  </div>

                  <h3 
                    className="text-[#2A1F18] mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "32px", fontWeight: 600 }}
                  >
                    {collection.name}
                  </h3>
                  <p 
                    className="text-[#2A1F18]/60"
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px", letterSpacing: "1px" }}
                  >
                    {collection.tagline}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Dark section with diagonal cut */}
      <section 
        id="approche" 
        className="relative py-32 bg-[#2A1F18] text-[#F9F6F1]"
        style={{ clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0 95%)" }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-24">
            <div 
              className="text-[#C9A96E] mb-4"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase" }}
            >
              Notre Approche
            </div>
            <h2 
              className="text-[#F9F6F1] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 600 }}
            >
              Trois étapes vers l'excellence
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              { 
                step: "01", 
                title: "Choisir", 
                desc: "Explorez nos collections et sélectionnez l'univers qui résonne avec votre histoire."
              },
              { 
                step: "02", 
                title: "Personnaliser", 
                desc: "Notre équipe sculpte votre invitation : textes, vidéos, animations, musique."
              },
              { 
                step: "03", 
                title: "Partager", 
                desc: "Envoyez un lien unique. Vos invités vivent une expérience cinématique inoubliable."
              }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div 
                  className="text-[#C9A96E]/20 mb-6 group-hover:text-[#C9A96E]/40 transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "120px", fontStyle: "italic", lineHeight: 1 }}
                >
                  {item.step}
                </div>
                <h3 
                  className="text-[#F9F6F1] mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "36px", fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-[#F9F6F1]/70 leading-relaxed"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "16px", lineHeight: "1.8" }}
                >
                  {item.desc}
                </p>

                {/* Decorative line */}
                <div className="absolute -top-8 left-0 w-16 h-px bg-[#C9A96E]/40 group-hover:w-24 transition-all"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="tarifs" className="py-32 bg-[#F5F0E8]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <div 
              className="text-[#C9A96E] mb-4"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase" }}
            >
              Nos Offres
            </div>
            <h2 
              className="text-[#2A1F18] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 600 }}
            >
              Des formules pour chaque vision
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "L'Essentielle",
                price: "179€",
                features: [
                  "Template personnalisable",
                  "Animations GSAP fluides",
                  "Formulaire RSVP intégré",
                  "Compte à rebours élégant",
                  "Support par email"
                ],
                highlight: false
              },
              {
                name: "La Signature",
                price: "269€",
                features: [
                  "Tout de L'Essentielle",
                  "Vidéo d'introduction (15s)",
                  "Musique d'ambiance",
                  "Animations avancées",
                  "Galerie photos",
                  "Support prioritaire"
                ],
                highlight: true
              },
              {
                name: "L'Exception",
                price: "549€",
                features: [
                  "Tout de La Signature",
                  "Vidéo cinématique (30-45s)",
                  "Design 100% sur-mesure",
                  "Effets 3D et parallaxe",
                  "Carte interactive",
                  "Révisions illimitées",
                  "Hotline dédiée"
                ],
                highlight: false
              }
            ].map((offer, i) => (
              <div 
                key={i}
                className={`relative p-8 bg-white border-2 transition-all hover:scale-[1.02] ${
                  offer.highlight 
                    ? "border-[#C9A96E] shadow-2xl md:-translate-y-4" 
                    : "border-[#C9A96E]/20 hover:border-[#C9A96E]/40"
                }`}
              >
                {offer.highlight && (
                  <div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-[#C9A96E] text-white"
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}
                  >
                    Populaire
                  </div>
                )}

                <h3 
                  className="text-[#2A1F18] mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "32px", fontWeight: 600 }}
                >
                  {offer.name}
                </h3>
                <div 
                  className="text-[#C9A96E] mb-8"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "56px", fontWeight: 600 }}
                >
                  {offer.price}
                </div>

                <ul className="space-y-4 mb-8">
                  {offer.features.map((feature, fi) => (
                    <li 
                      key={fi} 
                      className="flex items-start gap-3 text-[#2A1F18]/80"
                      style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px", lineHeight: "1.6" }}
                    >
                      <span className="text-[#C9A96E] mt-1">✦</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-3.5 transition-all ${
                    offer.highlight
                      ? "bg-[#2A1F18] text-[#F9F6F1] hover:bg-[#3A2F28]"
                      : "bg-[#C9A96E] text-white hover:bg-[#B89860]"
                  }`}
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}
                >
                  Choisir cette offre
                </button>
              </div>
            ))}
          </div>

          {/* Save the Date pricing */}
          <div className="max-w-[900px] mx-auto bg-gradient-to-br from-[#C9A96E]/10 to-[#A0907A]/10 p-12 border border-[#C9A96E]/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h3 
                  className="text-[#2A1F18] mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "36px", fontWeight: 600 }}
                >
                  Save the Date
                </h3>
                <p 
                  className="text-[#2A1F18]/70 mb-4"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "16px", lineHeight: "1.7" }}
                >
                  Annoncez votre date avec style. Trois formules élégantes pour créer l'anticipation.
                </p>
                <div 
                  className="flex items-center gap-6 text-[#C9A96E]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 600 }}
                >
                  <span>29€</span>
                  <span className="text-[#2A1F18]/30">•</span>
                  <span>59€</span>
                  <span className="text-[#2A1F18]/30">•</span>
                  <span>89€</span>
                </div>
              </div>
              <button 
                className="px-10 py-3.5 bg-[#2A1F18] text-[#F9F6F1] transition-all hover:bg-[#3A2F28] whitespace-nowrap"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}
              >
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Dark section */}
      <section className="py-32 bg-[#2A1F18] text-[#F9F6F1]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20">
            <div 
              className="text-[#C9A96E] mb-4"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase" }}
            >
              Témoignages
            </div>
            <h2 
              className="text-[#F9F6F1] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 600 }}
            >
              Leurs histoires
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                quote: "L'invitation Eventia a donné le ton parfait pour notre mariage. Nos invités nous en parlent encore des mois après. Une expérience visuelle et émotionnelle exceptionnelle.",
                author: "Léa & Thomas",
                wedding: "Mariage · Juin 2025 · Provence",
                collection: "Collection Les Écrins"
              },
              {
                quote: "Le niveau de personnalisation et l'accompagnement d'Ornelle ont dépassé nos attentes. Chaque détail reflétait notre histoire. Un investissement qui en valait chaque centime.",
                author: "Yasmine & Alexandre",
                wedding: "Mariage · Septembre 2025 · Château de Versailles",
                collection: "Collection L'Union"
              }
            ].map((testimonial, i) => (
              <div key={i} className="relative p-10 bg-[#F9F6F1]/5 border border-[#C9A96E]/20 hover:border-[#C9A96E]/40 transition-colors">
                {/* Quote mark */}
                <div 
                  className="text-[#C9A96E]/30 mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "80px", lineHeight: 1, height: "60px" }}
                >
                  "
                </div>

                <p 
                  className="text-[#F9F6F1]/90 mb-8 leading-relaxed"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "17px", lineHeight: "1.8" }}
                >
                  {testimonial.quote}
                </p>

                <div className="border-t border-[#C9A96E]/20 pt-6">
                  <div 
                    className="text-[#F9F6F1] mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "24px", fontWeight: 600 }}
                  >
                    {testimonial.author}
                  </div>
                  <div 
                    className="text-[#F9F6F1]/60 mb-1"
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px" }}
                  >
                    {testimonial.wedding}
                  </div>
                  <div 
                    className="text-[#C9A96E]"
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", letterSpacing: "1px" }}
                  >
                    {testimonial.collection}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-40 bg-[#F5F0E8] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#C9A96E]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#A0907A]/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
          <h2 
            className="text-[#2A1F18] mb-8 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 600 }}
          >
            Racontez votre histoire avec élégance
          </h2>
          <p 
            className="text-[#2A1F18]/70 max-w-[650px] mx-auto mb-12 leading-relaxed"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "18px", lineHeight: "1.8" }}
          >
            Chaque mariage est unique. Créons ensemble l'invitation qui fera battre le cœur de vos invités avant même le jour J.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              className="px-12 py-4 bg-[#2A1F18] text-[#F9F6F1] transition-all hover:bg-[#3A2F28] hover:scale-105"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" }}
            >
              Démarrer mon projet
            </button>
            <button 
              className="px-12 py-4 border-2 border-[#C9A96E] text-[#2A1F18] transition-all hover:bg-[#C9A96E] hover:text-white"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" }}
            >
              Prendre rendez-vous
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#2A1F18] text-[#F9F6F1] py-16 border-t border-[#C9A96E]/20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div 
                className="text-3xl mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 600, color: "#C9A96E" }}
              >
                Eventia Signature
              </div>
              <p 
                className="text-[#F9F6F1]/60 mb-6 max-w-[400px]"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px", lineHeight: "1.7" }}
              >
                Maison française de faire-parts digitaux de mariage haut de gamme. Fondée par Ornelle (Kabéya Ornella).
              </p>
              <div 
                className="text-[#F9F6F1]/80"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px" }}
              >
                eventiasignature.com
              </div>
            </div>

            <div>
              <h4 
                className="text-[#C9A96E] mb-4"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}
              >
                Collections
              </h4>
              <ul className="space-y-3" style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px" }}>
                <li><a href="#" className="text-[#F9F6F1]/70 hover:text-[#C9A96E] transition-colors">Les Voiles</a></li>
                <li><a href="#" className="text-[#F9F6F1]/70 hover:text-[#C9A96E] transition-colors">Les Seuils</a></li>
                <li><a href="#" className="text-[#F9F6F1]/70 hover:text-[#C9A96E] transition-colors">Les Écrins</a></li>
                <li><a href="#" className="text-[#F9F6F1]/70 hover:text-[#C9A96E] transition-colors">L'Union</a></li>
                <li><a href="#" className="text-[#F9F6F1]/70 hover:text-[#C9A96E] transition-colors">Save the Date</a></li>
              </ul>
            </div>

            <div>
              <h4 
                className="text-[#C9A96E] mb-4"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}
              >
                Liens
              </h4>
              <ul className="space-y-3" style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px" }}>
                <li><a href="#" className="text-[#F9F6F1]/70 hover:text-[#C9A96E] transition-colors">À propos</a></li>
                <li><a href="#" className="text-[#F9F6F1]/70 hover:text-[#C9A96E] transition-colors">Portfolio</a></li>
                <li><a href="#" className="text-[#F9F6F1]/70 hover:text-[#C9A96E] transition-colors">Blog</a></li>
                <li><a href="#" className="text-[#F9F6F1]/70 hover:text-[#C9A96E] transition-colors">Contact</a></li>
                <li><a href="#" className="text-[#F9F6F1]/70 hover:text-[#C9A96E] transition-colors">CGV</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#C9A96E]/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div 
              className="text-[#F9F6F1]/50"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px" }}
            >
              © 2026 Eventia Signature. Tous droits réservés.
            </div>
            <div className="flex gap-6">
              <a 
                href="#" 
                className="text-[#F9F6F1]/50 hover:text-[#C9A96E] transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px" }}
              >
                Instagram
              </a>
              <a 
                href="#" 
                className="text-[#F9F6F1]/50 hover:text-[#C9A96E] transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px" }}
              >
                Pinterest
              </a>
              <a 
                href="#" 
                className="text-[#F9F6F1]/50 hover:text-[#C9A96E] transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px" }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
