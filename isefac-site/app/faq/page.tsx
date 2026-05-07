"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Montserrat } from 'next/font/google'
import { ChevronDown, HelpCircle, Search } from 'lucide-react'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export default function FAQ() {
  const [scrolled, setScrolled] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const faqs = [
    {
      categorie: "Inscription",
      questions: [
        {
          q: "Comment m'inscrire à l'ISEFAC Business School ?",
          r: "L'inscription se fait en 3 étapes : 1) Remplissez le formulaire en ligne ou déposez votre dossier au campus, 2) Passez un entretien de motivation, 3) Validez votre inscription après acceptation. Réponse sous 48h. Contactez-nous au +241 74 80 49 37."
        },
        {
          q: "Quels sont les documents requis pour l'inscription ?",
          r: "Vous devez fournir : Copie de votre diplôme le plus élevé, CV, Lettre de motivation, 2 photos d'identité, Copie de pièce d'identité, Relevés de notes. Pour l'alternance : CV + Lettre de motivation entreprise."
        },
        {
          q: "Y a-t-il des frais d'inscription ?",
          r: "Les frais d'inscription varient selon le niveau : CFP/Technicien dès 350 000 FCFA/an, BTS/DUT dès 650 000 FCFA/an, Bachelor/Licence dès 950 000 FCFA/an, Master/MBA dès 1 200 000 FCFA/an. Paiement en plusieurs fois possible."
        },
        {
          q: "Proposez-vous des bourses ou places gratuites ?",
          r: "Oui, chaque année nous offrons des places gratuites en partenariat avec l'ANBS. Les critères : excellence académique, motivation, situation sociale. Postulez dès maintenant, les places sont limitées."
        }
      ]
    },
    {
      categorie: "Formations",
      questions: [
        {
          q: "Quels diplômes proposez-vous ?",
          r: "Nous proposons : CFP, Technicien, DTS, DUT, BTS, Bachelor, Licence Pro, Master, MBA et DBA. Domaines : Management, Banque & Finance, RH, Droit, Logistique, Marketing, Communication, Commerce International, Comptabilité, Informatique de gestion."
        },
        {
          q: "Vos diplômes sont-ils reconnus par l'État ?",
          r: "Oui, toutes nos formations sont homologuées et reconnues par l'État gabonais. Nos diplômes vous permettent de poursuivre vos études ou d'intégrer le marché du travail au Gabon et à l'international."
        },
        {
          q: "Quelle est la durée des formations ?",
          r: "CFP : 6-9 mois, Technicien : 1 an, BTS/DUT : 2 ans, Bachelor/Licence : 3 ans, Master/MBA : 2 ans après Licence, DBA : 3 ans après Master. Formations en alternance ou initial."
        },
        {
          q: "Proposez-vous des cours du soir ou à distance ?",
          r: "Oui, nous avons des formations en cours du soir pour les professionnels (18h-21h). Des modules e-learning sont disponibles pour certaines formations. Contactez-nous pour connaître les modalités."
        }
      ]
    },
    {
      categorie: "Alternance & Insertion",
      questions: [
        {
          q: "Comment fonctionne l'alternance à l'ISEFAC ?",
          r: "L'alternance c'est 3 jours en entreprise / 2 jours à l'école par semaine. Vous êtes salarié, rémunéré, et vous obtenez un diplôme + expérience pro. Nous vous accompagnons dans la recherche d'entreprise avec nos 300 partenaires."
        },
        {
          q: "Aidez-vous à trouver une entreprise pour l'alternance ?",
          r: "Oui, notre service Relations Entreprises vous accompagne : coaching CV, préparation entretien, mise en relation avec nos 300 entreprises partenaires. 92% de nos étudiants trouvent leur alternance."
        },
        {
          q: "Quel est le taux d'insertion après le diplôme ?",
          r: "92% de nos diplômés trouvent un emploi dans les 6 mois. 40% sont embauchés par leur entreprise d'alternance. Notre réseau de 15 000 alumni facilite l'insertion professionnelle."
        }
      ]
    },
    {
      categorie: "Vie Étudiante",
      questions: [
        {
          q: "Où sont situés vos campus ?",
          r: "Nous avons 2 campus à Libreville : 1) Campus Owendo - Quartier AWOUNGOU, Terminus ITO. 2) Campus Espace PME - Quartier AWENDJE. Voir la carte sur la page Contact."
        },
        {
          q: "Quels sont les horaires de cours ?",
          r: "Formation initiale : 8h00 - 17h00. Cours du soir : 18h00 - 21h00. Alternance : 3j entreprise / 2j école. Samedi : 9h00 - 13h00 pour certains modules."
        },
        {
          q: "Y a-t-il une vie associative à l'ISEFAC ?",
          r: "Oui ! Bureau des étudiants, clubs (marketing, finance, droit), événements, conférences, voyages d'études. Nous organisons des moments de convivialité pour créer du lien entre étudiants."
        }
      ]
    },
    {
      categorie: "International",
      questions: [
        {
          q: "Avez-vous des partenariats internationaux ?",
          r: "Oui, nous avons des partenariats avec des universités françaises, camerounaises et tunisiennes en délocalisation de diplômes. Possibilité de double diplôme et d'échanges."
        },
        {
          q: "Proposez-vous le programme Erasmus ?",
          r: "Nous développons des partenariats Erasmus+. Des mobilités étudiantes sont possibles en Europe. Contactez le service international pour connaître les destinations disponibles."
        }
      ]
    }
  ]

  const filteredFaqs = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      faq => 
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.r.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0)

  return (
    <main className={`min-h-screen ${montserrat.className}`}>
      {/* HEADER IDENTIQUE */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
 ? 'bg-[#1e2a5e] shadow-xl py-4'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Image
            src="/logo-isefac.jpeg"
            alt="ISEFAC"
            width={70}
            height={70}
            className="bg-white p-2 rounded-lg object-contain"
          />
          <nav className="hidden md:flex space-x-8 text-white font-medium drop-shadow-lg">
            <Link href="/" className="hover:text-blue-200">Accueil</Link>
            <Link href="/a-propos" className="hover:text-blue-200">A propos</Link>
            <Link href="/formations" className="hover:text-blue-200">Formations</Link>
            <Link href="/contact" className="hover:text-blue-200">Contact</Link>
            <Link href="/espace-etudiant" className="hover:text-blue-200">Espace étudiant</Link>
            <Link href="/faq" className="text-orange-400 hover:text-orange-300">FAQ</Link>
          </nav>
        </div>
      </header>

      {/* Hero FAQ */}
      <section className="relative bg-[#1e2a4a] text-white pt-32 pb-20 px-6 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80"
          alt="FAQ ISEFAC"
          fill
          className="object-cover opacity-15"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e2a4a]/80 to-[#1e2a4a]/95" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl">
            QUESTIONS FRÉQUENTES
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto font-medium">
            Trouvez rapidement les réponses à vos questions
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-8"></div>
        </div>
      </section>

      {/* Barre de recherche */}
      <section className="py-12 px-6 bg-white border-b">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 text-lg font-medium shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordéon */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length === 0? (
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">Aucune question trouvée pour "{searchTerm}"</p>
            </div>
          ) : (
            filteredFaqs.map((categorie, catIndex) => (
              <div key={catIndex} className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                  {categorie.categorie}
                </h2>
                
                <div className="space-y-4">
                  {categorie.questions.map((faq, faqIndex) => {
                    const globalIndex = catIndex * 100 + faqIndex
                    const isOpen = openIndex === globalIndex
                    
                    return (
                      <div
                        key={faqIndex}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition"
                        >
                          <span className="text-lg md:text-xl font-bold text-gray-900 pr-4">
                            {faq.q}
                          </span>
                          <ChevronDown
                            className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        <div
                          className={`transition-all duration-300 ease-in-out ${
                            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          } overflow-hidden`}
                        >
                          <div className="px-6 md:px-8 pb-6 pt-2">
                            <div className="border-t border-gray-200 pt-4">
                              <p className="text-gray-700 text-lg leading-relaxed">
                                {faq.r}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#1e2a5e] to-[#162042]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Notre équipe est là pour vous aider
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-xl transition hover:scale-105"
          >
            Contactez-nous
          </Link>
        </div>
      </section>
    </main>
  )
}